import * as link from './ApiLink';
import callApi from './ApiCaller';
import randomKey from './RandomKey'
import { RSA } from 'react-native-rsa-native';
const Realm = require('realm');
import { generateRSAKey, encryptRSAKey, decryptRSAKey } from '../api/ApiRSA'
import { ToastAndroid } from 'react-native';
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

_getGroupDatabaseOld = (groupName) => {
  try {
    const allGroup = realm.objects('group');
    let group = allGroup.filtered(`groupName = "${groupName}"`);
    if (group[0])
      return group[0];
    else {
      return null;
    }

  } catch (error) {
    console.log("_getGroupDatabaseOld ApiOldGroupUpdate.js", error)
  }
};

_updateDataBaseOld = async (Secret, group) => {
  try {
    realm.write(() => {
      let newgroup = realm.create(
        'group', {
        groupName: group.groupName,
        shareKey: Secret
      },
        'modified'
      );
      newgroup.version = newgroup.version + 1;
    });
  } catch (erro) {
    console.log("_updateDataBaseOld ApiOldGroupUpdate.js", erro)
  }
}

_requestUpdateOld = async (Secret, packet, group) => {
  let data = {
    groupName: group.groupName,
    Status: "OLDUPDATE",
    version: group.version + 1,
    senderMssv: user[0].mssv,
    packetUpdate: JSON.stringify(packet),
  };
  callApi(link.creategroup, 'POST', { data: data }).then(res => {
    if (res) {
      if (res.data === "ACCEPTED") {
        console.log(res.data);
        _updateDataBaseOld(Secret, group);
      }
    }
    else {
      console.log("ApiOldGroupUpdate.js network error");
    }
  })
}

_encryptSecretOld = async (Secret, group, t0) => {
  let packet = [];
  let coPath = group.infolistMssv;
  for (let i in coPath) {
    let pSEnc = await encryptRSAKey(Secret, coPath[i].publicKey);
    packet.push({
      mssv: coPath[i].mssv,
      pSEnc: JSON.stringify(pSEnc)
    });
  }
  var t1 = new Date().getTime();
  // let timeTaken = ((t1 - t0) * 0.0001).toFixed(3);
  timeTaken = ((t1 - t0));
  console.log("Update key using Encrypt with Public Key take: ", timeTaken, " millisecond.");
  ToastAndroid.show("Update time: " + timeTaken + " millisecond.", ToastAndroid.LONG);
  await _requestUpdateOld(Secret, packet, group);
}
let timeTaken = '';

_rebuildSecretOld = async (groupData, NodeUpdateInfo, path) => {
  let privateKey = user[0].privateKey;
  let pSEnc = JSON.parse(NodeUpdateInfo.pSEnc);
  pSDec = await decryptRSAKey(pSEnc, user[0].privateKey);
  return pSDec.plaintext;
};

export default async function oldGroupUpdate(groupData, Check) {
  var t0 = new Date().getTime();
  let group = _getGroupDatabaseOld(groupData.groupName);
  if (group) {
    if (Check) {
      let Secret = randomKey(32);
      _encryptSecretOld(Secret, group, t0);
    }
    else {
      let packetUpdate = JSON.parse(groupData.packetUpdate);
      let Secret = packetUpdate.find(element => element.mssv === user[0].mssv);
      Secret = await _rebuildSecretOld(groupData, Secret);
      _updateDataBaseOld(Secret, group);
    }
  }

}; 