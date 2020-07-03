import * as link from './ApiLink';
import callApi from './ApiCaller';
import ratchetTree from '../components/menu/RatchetTrees';
import randomKey from './RandomKey'
import { RSA, RSAKeychain } from 'react-native-rsa-native';
var CryptoJS = require("crypto-js");
import { generateRSAKey, encryptRSAKey, decryptRSAKey } from './ApiRSA'

const Realm = require('realm');
import DEFAULT_KEY from './Config'
import {
  userSchema,
  GroupSchema,
  listuserSchema,
  listgroupInfoSchema,
  listgroupSchema,
  listDirectPathInfoSchema,
  DirectPathSchema
} from '../models/Realm'
import { ifError } from 'assert';
const realm = new Realm({
  schema: [
    userSchema,
    GroupSchema,
    listuserSchema,
    listgroupInfoSchema,
    listgroupSchema,
    listDirectPathInfoSchema,
    DirectPathSchema
  ],
  encryptionKey: DEFAULT_KEY
});
const user = realm.objects('user');

_getGroupDatabase2 = (groupName) => {
  try {
    const allGroup = realm.objects('group');
    let group = allGroup.filtered(`groupName = "${groupName}"`);
    if (group[0])
      return group[0];
    else {
      return null;
    }

  } catch (error) {
    console.log("_getGroupDatabase2 ApiGroupRemove.js", error)
  }
};
_hashNode = (mes) => {
  return CryptoJS.HmacMD5(mes, "Node-uit-@@@123").toString();
}
_hashPath = (mes) => {
  return CryptoJS.HmacMD5(mes, "Path-uit-@@@123").toString();
}
_hashShareKey = (mes) => {
  return CryptoJS.HmacMD5(mes, "ShareKey-uit-@@@123").toString();
}

_SaveGroupDatabase5 = (tree, groupName, shareKey, Data, info) => {
  try {
    realm.write(() => {
      let newgroup = realm.create(
        'group', {
        groupName: groupName,
        treeInfo: tree,
        shareKey: shareKey,
        Updated: true
      },
        'modified'
      );
      newgroup.version = newgroup.version + 1;
      newgroup.listMssv = newgroup.listMssv.filter(item => item !== info.nodeRemove);
      newgroup.infolistMssv = newgroup.infolistMssv.filter(item => item.mssv !== info.nodeRemove);
    });
  } catch (erro) {
    console.log("_SaveGroupDatabase5 ApiGroupRemove.js", erro)
  }
}

_SaveGroupDatabase4 = (tree, group, shareKey, Data, info) => {
  try {
    realm.write(() => {
      let newlistDirectPath = realm.create('listDirectPath', {
        groupName: group.groupName,
        listNodePath: [],
        listNodePathKey: [],
      },
        'modified'
      );
      for (let i in Data) {
        newlistDirectPath.listNodePath.push(Data[i].nameNode);
        newlistDirectPath.listNodePathKey.push(Data[i]);
      }
    });
  }
  catch (error) {
    console.log("_SaveGroupDatabase4 ApiGroupRemove.js 2", error)
  }
}

_updateDataBase2 = async (Secret, group, path, info) => {
  let tree = new ratchetTree();
  tree = tree.deserialize(group.treeInfo);
  let Data = [];
  let directPath = path[0];
  for (let i in Secret) {
    let nodeSecret = CryptoJS.HmacMD5(Secret[i].pathSecret, "Node-uit-@@@123").toString();
    let keys = await generateRSAKey(nodeSecret, 512);
    Data.push({
      nameNode: directPath[i].mssv,
      groupName: group.groupName,
      pathSecret: Secret[i].pathSecret,
      nodeSecret: nodeSecret,
      publicKey: keys.public,
      privateKey: keys.private
    })
  }
  tree.updateNode(path[1], Data);
  tree.removeNode(path[4], info.nodeRemove)
  let shareKey = _hashShareKey(Data[0].nodeSecret);
  let newtreeSer = tree.serialize();
  _SaveGroupDatabase4(newtreeSer, group, shareKey, Data, info);
  _SaveGroupDatabase5(newtreeSer, group.groupName, shareKey, Data, info);
}

_requestUpdate2 = (Secret, packet, group, path, lishcoPathNode, info) => {
  let data = {
    groupName: group.groupName,
    Status: "REMOVE",
    version: group.version + 1,
    senderMssv: user[0].mssv,
    lishcoPathNode: lishcoPathNode,
    userAddRemove: info.nodeRemove,
    userAddRemoveSibiling: info.sibiling,
    packetUpdate: JSON.stringify(packet),
  };

  console.log(data);
  callApi(link.creategroup, 'POST', { data: data }).then(res => {
    if (res) {
      console.log(res.data);
      if (res.data === "ACCEPTED") {
        _updateDataBase2(Secret, group, path, info);
      }
    }
    else {
      consohle.log("ApiGroupRemove.js network error");
    }
  })
}

_encryptSecret2 = async (Secret, coPath, group, path) => {
  let packet = [];
  let lishcoPathNode = [];
  for (let i in coPath) {
    let pSEnc = null;
    if (!coPath[i].isLeaf) {
      pSEnc = await encryptRSAKey(Secret[i].pathSecret, coPath[i].publicKey);
      pSEnc = pSEnc.cipher;
    } else {
      pSEnc = await RSA.encrypt(Secret[i].pathSecret, coPath[i].publicKey);
    }
    packet.push({
      mssv: coPath[i].mssv,
      isLeaf: coPath[i].isLeaf,
      pSEnc: JSON.stringify(pSEnc)
    });
    lishcoPathNode.push(coPath[i].mssv);
  }
  // console.log("packet:", packet);
  // console.log("mssv:", path[3].mssv);
  // console.log("sibiling: ", path[2][path[2].length - 1]);
  // let sibiling= path[2][path[2].length - 1];
  let info = {
    sibiling: path[2][path[2].length - 1],
    nodeRemove: path[3].mssv
  }
  _requestUpdate2(Secret, packet, group, path, lishcoPathNode, info);
}
_getprivateKeyInfo = (groupName) => {
  try {
    const allGroup = realm.objects('listDirectPath');
    let group = allGroup.filtered(`groupName = "${groupName}"`);
    if (group[0]) {
      return group[0].listNodePathKey;
    }
    else {
      console.log("_rebuildSecret2 not found DirectPath info ApiGroupRemove.js", error)
    }
  } catch (error) {
    console.log("_rebuildSecret2  DirectPath ApiGroupRemove.js", error)
  }
}
_generatorSecret2 = async (directPath) => {
  let newPathSecret = randomKey(32);
  let data = [{
    pathSecret: newPathSecret,
    nodeSecret: _hashNode(newPathSecret),
  }];
  for (let i = 1; i < directPath.length; i++) {
    newPathSecret = _hashPath(newPathSecret);
    data.unshift({
      pathSecret: newPathSecret,
      nodeSecret: _hashNode(newPathSecret),
    });
  }
  return data;
};
_rebuildSecret2 = async (groupData, NodeUpdateInfo, path) => {
  // let privateKey = _getprivateKeyInfo(groupData.groupName);
  // privateKey = publicKey.privateKey;
  let privateKey = path[3].privateKey;
  let pSEnc = JSON.parse(NodeUpdateInfo.pSEnc);
  let pSDec = null;
  if (!NodeUpdateInfo.isLeaf) {
    pSDec = await decryptRSAKey(pSEnc, privateKey);
    pSDec = pSDec.plaintext;
  } else {
    pSDec = await RSA.decrypt(pSEnc, user[0].privateKey);
  }
  let newPathSecret = pSDec;
  let data = [{
    pathSecret: newPathSecret,
    nodeSecret: _hashNode(newPathSecret),
  }];

  for (let i = 1; i < path[0].length; i++) {
    newPathSecret = _hashPath(newPathSecret);
    data.unshift({
      pathSecret: newPathSecret,
      nodeSecret: _hashNode(newPathSecret),
    });
  }
  return data;
};

export default async function groupRemove(groupData, userName, Check) {
  let group = _getGroupDatabase2(groupData.groupName);
  let tree = new ratchetTree();
  tree = tree.deserialize(group.treeInfo);

  if (group) {
    if (Check) {
      // console.log(path);
      let path = tree.getPath(userName);
      let Secret = await _generatorSecret2(path[0]);
      // console.log("Secret",Secret);
      _encryptSecret2(Secret, path[2], group, path);
    }
    else {
      let path = tree.getPath(user[0].mssv);
      const NodeUpdate = path[0].filter(element => groupData.lishcoPathNode.includes(element.mssv));
      let packetUpdate = JSON.parse(groupData.packetUpdate);
      const NodeUpdateInfo = packetUpdate.find(element => element.mssv === NodeUpdate[0].mssv);
      if (NodeUpdate) {
        let path = tree.getPath(NodeUpdate[0].mssv);
        let Secret = await _rebuildSecret2(groupData, NodeUpdateInfo, path);
        // console.log("Secret 2", Secret);
        let shiftData = Secret.shift()
        // console.log("Secret 2 shift",Secret);
        let info = {
          sibiling: groupData.userAddRemoveSibiling,
          nodeRemove: groupData.userAddRemove
        }
        _updateDataBase2(Secret, group, path, info);
      }
    }
  }
}; 