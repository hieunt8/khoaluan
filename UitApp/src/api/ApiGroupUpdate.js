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

_getGroupDatabase = (groupName) => {
  try {
    const allGroup = realm.objects('group');
    let group = allGroup.filtered(`groupName = "${groupName}"`);
    if (group[0])
      return group[0];
    else {
      return null;
    }

  } catch (error) {
    console.log("_getGroupDatabase ApiGroupUpdate.js", error)
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
_generatorSecret = (directPath) => {
  let newPathSecret = "randomKey(32)";
  let data = [{
    pathSecret: newPathSecret,
    nodeSecret: _hashNode(newPathSecret),
  }];
  for (let i = 1; i < directPath.length; i++) {
    newPathSecret = _hashPath(data[i - 1].pathSecret);
    data.unshift({
      pathSecret: newPathSecret,
      nodeSecret: _hashNode(newPathSecret),
    });
  }
  return data;
};
_SaveGroupDatabase3 = (tree, groupName, shareKey, Data) => {
  // let currentGroup = _getGroupDatabase(groupName);
  // console.log(tree);
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
    });
  } catch (erro) {
    console.log("_SaveGroupDatabase3 ApiGroupUpdate.js", erro)
  }
}

_SaveGroupDatabase2 = (tree, group, shareKey, Data) => {
  try {
    realm.write(() => {
      let newlistDirectPath = realm.create('listDirectPath', {
        groupName: group.groupName,
        listNodePath: [],
        listNodePathKey: [],
      });
      for (let i in Data) {
        newlistDirectPath.listNodePath.push(Data[i].nameNode);
        newlistDirectPath.listNodePathKey.push(Data[i]);
      }
    });
  }
  catch (error) {
    console.log("_SaveGroupDatabase2 ApiGroupUpdate.js 2", error)
  }
}

_updateDataBase = async (Secret, group, path) => {
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
      private: keys.private
    })
  }
  tree.updateNode(path[1], Data);
  let shareKey = _hashShareKey(Data[0].nodeSecret);
  let newtreeSer = tree.serialize();
  _SaveGroupDatabase2(newtreeSer, group, shareKey, Data);
  _SaveGroupDatabase3(newtreeSer, group.groupName, shareKey, Data);
}

_requestUpdate = (Secret, packet, group, path) => {
  let data = {
    groupName: group.groupName,
    Status: "UPDATE",
    version: group.version + 1,
    senderMssv: user[0].mssv,
    packetUpdate: JSON.stringify(packet),

  };
  callApi(link.creategroup, 'POST', { data: data }).then(res => {
    if (res) {
      console.log(res.data);
      if (res.data === "ACCEPTED") {
        _updateDataBase(Secret, group, path);
      }
    }
    else {
      console.log("ApiGroupUpdate.js network error");
    }
  })
}

_encryptSecret = async (Secret, coPath, group, path) => {
  let packet = [];
  for (let i in coPath) {
    let pSEnc = await RSA.encrypt(Secret[i].pathSecret, coPath[i].publicKey)
    packet.push({
      mssv: coPath[i].mssv,
      pSEncx: pSEnc
    })
  }
  // console.log(packet);
  _requestUpdate(Secret, packet, group, path);
  // return packet;
}

// aaaaaaaaaaa = async () => {
//   let MattsRSAkey = generateRSAKey("aaaaaaaaaaaaaaaaaaaaaaaaaaaa", 512);
//   var PlainText = "Matt, I need you to help me with my Starcraft strategy.";
//   console.log(MattsRSAkey);
//   var EncryptionResult = encryptRSAKey(PlainText, MattsRSAkey.public);
//   console.log(EncryptionResult);
//   var DecryptionResult = decryptRSAKey(EncryptionResult.cipher, MattsRSAkey.private);
//   console.log(DecryptionResult);
// }
export default function groupUpdate(groupName) {
  let group = _getGroupDatabase(groupName);
  if (group) {
    let tree = new ratchetTree();
    tree = tree.deserialize(group.treeInfo);
    let path = tree.getPath(user[0].mssv);
    let Secret = _generatorSecret(path[0]);
    _encryptSecret(Secret, path[2], group, path);
  }
}; 