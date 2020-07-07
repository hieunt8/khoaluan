import * as link from './ApiLink';
import callApi from './ApiCaller';
import ratchetTree from '../components/menu/RatchetTrees';
import randomKey from './RandomKey'
import { RSA } from 'react-native-rsa-native';
import groupUpdate from './ApiGroupUpdate'
import oldGroupUpdate from './ApiOldUpdateGroup'
import groupRemove from './ApiGroupRemove'
import { AesEnc, AesDec } from './ApiAES'


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
    console.log("_getGroupDatabase ApiGroupLoading.js", error)
  }
};
_SaveGroupDatabase = (mssv, info, group, newtree_serialize) => {
  let currentGroup = group;
  try {
    realm.write(() => {
      currentGroup.listMssv.push(mssv);
      currentGroup.version = currentGroup.version + 1;
      currentGroup.infolistMssv.push(info);
      currentGroup.treeInfo = newtree_serialize;
    });
  } catch (erro) {
    console.log("_SaveGroupDatabase ApiGroupLoading.js", erro)
  }
  return currentGroup;
}
_CreateGroupDatabase = (groupData, tree, shareKey) => {
  try {
    realm.write(() => {
      let newgroup = realm.create('group', {
        groupName: groupData.groupName,
        listMssv: groupData.listMssv.split(","),
        // listMssv: [],
        infolistMssv: [],
        version: groupData.version,
        shareKey: shareKey,
        treeInfo: tree,
      });
      newgroup.listMssv.push(groupData.userAddRemove);
      callApi(link.requestUserInfo, 'POST', { data: { listMssv: groupData.listMssv.split(",") } })
        .then(res => {
          if (res) {
            realm.write(() => {
              for (let i of res.data) {
                newgroup.infolistMssv.push(i);
              }
              newgroup.infolistMssv.push(groupData.useraddRemoveInfo);
              // console.log("newgroup.listMssv", newgroup.listMssv);
              return newgroup;
            })
          }
          else {
            console.log("ApiGroupLoading.js network error");
          }
        })
    });
  }
  catch (error) {
    console.log("_CreateGroupDatabase ApiGroupLoading.js", error)
  }
};

_updateGroup = async (data, isExist, group) => {
  let check = isExist;
  let currentGroup = group;

  for (let groupData of data) {
    switch (groupData.Status) {
      case "ADD":
        if (check) {
          let tree = new ratchetTree();
          tree = tree.deserialize(currentGroup.treeInfo);
          let keyPair = await AesDec(groupData.keyPair, currentGroup.shareKey);
          tree.addNode(groupData.useraddRemoveInfo, Math.ceil(Math.log2(currentGroup.listMssv.length + 1)), JSON.parse(keyPair));
          _SaveGroupDatabase(groupData.userAddRemove, groupData.useraddRemoveInfo, currentGroup, tree.serialize());
        }
        else {
          check = true;
          let tree = new ratchetTree();
          tree = tree.deserialize(groupData.treeInfo);
          let shareKey = await RSA.decrypt(groupData.shareKey, user[0].privateKey);
          let keyPair = await AesDec(groupData.keyPair, shareKey);
          let listMssv = groupData.listMssv.split(",");
          console.log("listMssv", listMssv);
          console.log(" Math.ceil(Math.log2(listMssv + 1)): ", Math.ceil(Math.log2(listMssv.length + 1)));
          tree.addNode(groupData.useraddRemoveInfo, Math.ceil(Math.log2(listMssv.length + 1)), JSON.parse(keyPair));
          currentGroup = _CreateGroupDatabase(groupData, tree.serialize(), shareKey);
        }
        break;
      case "UPDATE":
        groupUpdate(groupData, false);
        break;
      case "OLDUPDATE":
        oldGroupUpdate(groupData, false);
        break;
      case "REMOVE":
        groupRemove(groupData, null, false);
        break;
    }
  }
};

_checkGroup = async (data) => {
  for (let groupServer of data) {
    let groupLocal = _getGroupDatabase(groupServer.groupName);
    // console.log("user", user[0].mssv);
    // console.log("@#4254357654q656", groupLocal);

    if (groupLocal) {
      if (groupLocal.version < groupServer.version) {
        callApi(link.getdataGroup, 'POST', { data: { version: groupLocal.version, groupName: groupServer.groupName } })
          .then(res => {
            if (res) {
              _updateGroup(res.data, true, groupLocal);
            } else {
              console.log("ApiGroupLoading.js network error");
            }
          })
      }
      else if (groupLocal.version === groupServer.version && !groupLocal.Updated) {
        groupUpdate(groupLocal, true);
      }
    }
    else {
      // console.log("1111111111111");
      callApi(link.getspecialdataGroup, 'POST', {
        data: {
          userAddRemove: user[0].mssv,
          groupName: groupServer.groupName,
          Status: "ADD",
        }
      }).then(res => {
        if (res) {
          _updateGroup(res.data, false, null);
        } else {
          console.log("ApiGroupLoading.js network error");
        }
      })
    }
  }
};

_saveListGroup = (data) => {
  try {
    const allGroup = realm.objects('listGroup');
    if (allGroup[0]) {
      try {
        realm.write(() => {
          allGroup[0].info = Object.values(data);
        });
      } catch (erro) {
        console.log("_saveListGroup ApiGroupLoading.js", erro)
      }
    }
    else {
      try {
        realm.write(() => {
          realm.create('listGroup', {
            info: Object.values(data),
          });
        });
      }
      catch (error) {
        console.log("_saveListGroup ApiGroupLoading.js", error)
      }
    }
  } catch (error) {
    console.log("_saveListGroup ApiGroupLoading.js", error)
  }
}

export default async function groupLoading(mssv) {
  callApi(link.getlistGroup, 'POST', { data: { mssv: mssv } }).then(res => {
    if (res) {
      // console.log(res.data);
      _saveListGroup(res.data);
      _checkGroup(res.data);
    }
    else {
      console.log("ApiGroupLoading.js network error");
    }
  })
}; 