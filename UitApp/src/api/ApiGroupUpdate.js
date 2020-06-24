import * as link from './ApiLink';
import callApi from './ApiCaller';
import ratchetTree from '../components/menu/RatchetTrees';
import randomKey from './RandomKey'
import { RSA } from 'react-native-rsa-native';
var CryptoJS = require("crypto-js");



const Realm = require('realm');
import DEFAULT_KEY from './Config'
import { userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema } from '../models/Realm'
import { copyBundledRealmFiles } from 'realm';
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

_requestUpdate = (packet, group) => {
  
  callApi(link.requestUpdate, 'POST', { data: { mssv: mssv } }).then(res => {
    if (res) {
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
    // console.log(pSEnc)
    packet.push({
      mssv: coPath[i].mssv,
      pSEncx: pSEnc
    })
  }
  console.log(packet);
  _requestUpdate(packet, group);
  return packet;
}

export default function groupUpdate(groupName) {
  let group = _getGroupDatabase(groupName);
  if (group) {
    let tree = new ratchetTree();
    tree = tree.deserialize(group.treeInfo);
    let path = tree.getPath(user[0].mssv);
    // console.log("direct path: ", path[0].length);
    let Secret = _generatorSecret(path[0]);
    _encryptSecret(Secret, path[2], group);
    let clone = Object.assign(Object.create(Object.getPrototypeOf(tree)), tree);
    // console.log("flow root to node", path[1]);
    // console.log("co path", path[2]);
  }
}; 