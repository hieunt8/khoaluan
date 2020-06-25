import * as link from './ApiLink';
import callApi from './ApiCaller';
import ratchetTree from '../components/menu/RatchetTrees';
import randomKey from './RandomKey'
import { RSA, RSAKeychain } from 'react-native-rsa-native';
var CryptoJS = require("crypto-js");


const Realm = require('realm');
import DEFAULT_KEY from './Config'
import { userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema } from '../models/Realm'
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema], encryptionKey: DEFAULT_KEY });
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

_SaveGroupDatabase = (tree, treeLocalInfo, group) => {
  let currentGroup = group;
  try {
    realm.write(() => {
      currentGroup.infolistMssv.push(info);
      currentGroup.treeInfo = tree;
    });
  } catch (erro) {
    console.log("_SaveGroupDatabase ApiGroupLoading.js", erro)
  }
  // return currentGroup;
}

_updateDataBase = (Secret, group, coPath) => {
  let tree = new ratchetTree();
  let treeLocalInfo = new ratchetTree();
  tree = tree.deserialize(group.treeInfo);
  treeLocalInfo = treeLocalInfo.deserialize(group.treeInfo);
  tree.updateNode(coPath, Secret, false);
  treeLocalInfo.updateNode(coPath, Secret, true);
  _SaveGroupDatabase(tree.serialize(), treeLocalInfo.serialize(), group);
}

_requestUpdate = (Secret, packet, group, coPath) => {
  let data = {
    groupName: group.groupName,
    Status: "UPDATE",
    version: group.version + 1,
    senderMssv: user[0].mssv,
    packetUpdate: JSON.stringify(packet),

  };
  callApi(link.requestUpdate, 'POST', { data: data }).then(res => {
    if (res) {
      if (res.data === "ACCEPTED") {
        _updateDataBase(Secret, group, coPath);
      }
    }
    else {
      console.log("ApiGroupUpdate.js network error");
    }
  })
}

_encryptSecret = async (Secret, coPath, group) => {
  let packet = [];
  for (let i in coPath) {
    let pSEnc = await RSA.encrypt(Secret[i].pathSecret, coPath[i].publicKey)
    packet.push({
      mssv: coPath[i].mssv,
      pSEncx: pSEnc
    })
  }
  // console.log(packet);
  // _requestUpdate(Secret,packet,group, coPath);
  return packet;
}

export default function groupUpdate(groupName) {
  let group = _getGroupDatabase(groupName);
  if (group) {
    let tree = new ratchetTree();
    tree = tree.deserialize(group.treeInfo);

    // let path = tree.getPath(user[0].mssv);
    // let Secret = _generatorSecret(path[0]);
    // _encryptSecret(Secret, path[2], group);
  }
}; 