import * as link from './ApiLink';
import callApi from './ApiCaller';
import randomKey from './RandomKey'
import { RSA } from 'react-native-rsa-native';
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
    console.log("_getGroupDatabase ApiOldGroupUpdate.js", error)
  }
};

_updateDataBase = async (Secret, group) => {
  try {
    realm.write(() => {
      let newgroup = realm.create(
        'group', {
        groupName: groupName,
        shareKey: Secret
      },
        'modified'
      );
      newgroup.version = newgroup.version + 1;
    });
  } catch (erro) {
    console.log("_updateDataBase ApiOldGroupUpdate.js", erro)
  }
}

_requestUpdate = (Secret, packet, group) => {
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
        _updateDataBase(Secret, group);
      }
    }
    else {
      console.log("ApiOldGroupUpdate.js network error");
    }
  })
}

_encryptSecret = async (Secret, group) => {
  let packet = [];
  let coPath = group.infolistMssv;
  for (let i in coPath) {
    pSEnc = await RSA.encrypt(Secret, coPath[i].publicKey);
    packet.push({
      mssv: coPath[i].mssv,
      pSEnc: JSON.stringify(pSEnc)
    });
  }
  _requestUpdate(Secret, packet, group);
}

_getprivateKeyInfo = (groupName) => {
  try {
    const allGroup = realm.objects('listDirectPath');
    let group = allGroup.filtered(`groupName = "${groupName}"`);
    if (group[0]) {
      return group[0].listNodePathKey;
    }
    else {
      console.log("_rebuildSecret not found DirectPath info ApiOldGroupUpdate.js", error)
    }
  } catch (error) {
    console.log("_rebuildSecret  DirectPath ApiOldGroupUpdate.js", error)
  }
}

_rebuildSecret = async (groupData, NodeUpdateInfo, path) => {
  let privateKey = user[0].privateKey;
  let pSEnc = JSON.parse(NodeUpdateInfo.pSEnc);
  pSDec = await RSA.decrypt(pSEnc, user[0].privateKey);
  return pSDec;
};

export default async function oldGroupUpdate(groupData, Check) {
  let group = _getGroupDatabase(groupData.groupName);
  if (group) {
    if (Check) {
      let Secret = randomKey(32);
      _encryptSecret(Secret, group);
    }
    else {
      let packetUpdate = JSON.parse(groupData.packetUpdate);
      const Secret = packetUpdate.find(element => element.mssv === user[0].mssv);
      if (NodeUpdate) {
        let Secret = await _rebuildSecret(groupData, Secret);
        _updateDataBase(Secret, group);
      }
    }
  }
}; 