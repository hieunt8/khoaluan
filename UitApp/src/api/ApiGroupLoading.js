import * as link from './ApiLink';
import callApi from './ApiCaller';
import ratchetTree from '../components/menu/RatchetTrees';
import randomKey from './RandomKey'
import { RSA } from 'react-native-rsa-native';


const Realm = require('realm');
import DEFAULT_KEY from './Config'
import { userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema } from '../models/Realm'
// import { Group } from 'react-native';
const realm = new Realm({ schema: [userSchema, GroupSchema, listuserSchema, listgroupInfoSchema, listgroupSchema], encryptionKey: DEFAULT_KEY });
const user = realm.objects('user');

_GetAsync = (groupName) => {
  try {
    const allGroup = realm.objects('group');
    let group = allGroup.filtered(`groupName = "${groupName}"`);
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", allGroup);
    if (group[0])
      return group[0];
    else {
      return null;
    }

  } catch (error) {
    console.log("_GetAsync ApiGroupLoading.js", error)
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
_CreateGroupDatabase = (groupData, tree) => {
  try {
    realm.write(() => {
      let newgroup = realm.create('group', {
        groupName: groupData.groupName,
        listMssv: [groupData.senderName],
        infolistMssv: [],
        version: 1,
        shareKey: randomKey(32),
        treeInfo: tree,
      });
      newgroup.listMssv.push(groupData.userAddRemove);
      newgroup.infolistMssv.push(groupData.senderInfo);
      newgroup.infolistMssv.push(groupData.useraddRemoveInfo);
      return newgroup;
    });
  }
  catch (error) {
    console.log("_CreateGroupDatabase ApiGroupLoading.js", error)
  }
};

_updateGroup = (data, isExist, group) => {
  let check = isExist;
  let currentGroup = group;

  for (let groupData of data) {
    switch (groupData.Status) {
      case "ADD":
        if (check) {
          let tree = new ratchetTree();
          // console.log("_updateGroupuser call", user[0].mssv , " + check true");
          // console.log("current group",currentGroup)
          tree = tree.deserialize(currentGroup.treeInfo);
          tree.addNode(groupData.useraddRemoveInfo, Math.ceil(Math.log2(currentGroup.listMssv.length + 1)), JSON.parse(groupData.keyPair));
          _SaveGroupDatabase(groupData.userAddRemove, groupData.useraddRemoveInfo, currentGroup, tree.serialize(), );
        }
        else {
          // console.log("_updateGroup user call", user[0].mssv, "+ check false ");
          check = true;
          let tree = new ratchetTree();
          tree = tree.deserialize(groupData.treeInfo);
          tree.addNode(groupData.useraddRemoveInfo, Math.ceil(Math.log2(2)), JSON.parse(groupData.keyPair));
          currentGroup = _CreateGroupDatabase(groupData, tree.serialize());
        }
        break;
      case "UPDATE":
        break;
      case "REMOVE":
        break;
    }
  }
};

_checkGroup = async (data) => {
  for (let groupServer of data) {
    let groupLocal = _GetAsync(groupServer.groupName);
    if (groupLocal) {
      if (groupLocal.version < groupServer.version) {
        callApi(link.getdataGroup, 'POST', { data: { version: groupLocal.version, groupName: groupServer.groupName } }).then(res => {
          // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@");
          // console.log("_checkGroup user call exist", user[0].mssv);
          // console.log("_checkGroup Exist groupLocal.version: ", groupLocal.version, "+ groupServer.version", groupServer.version);
          // console.log("_checkGroup data", res.data);
          _updateGroup(res.data, true, groupLocal);
        })
      }
    }
    else {
      callApi(link.getspecialdataGroup, 'POST', { data: { version: 1, groupName: groupServer.groupName } }).then(res => {
        // console.log("_checkGroup user call", user[0].mssv);
        // console.log("_checkGroup groupLocal.version: ", "none", "+ groupServer.groupName", groupServer.version);
        // console.log("data none group", res.data);
        _updateGroup(res.data, false, null);
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

export default function groupLoading(mssv) {
  callApi(link.getlistGroup, 'POST', { data: { mssv: mssv } }).then(res => {
    let data = res.data;
    _saveListGroup(data);
    const allGroup = realm.objects('group');
    // console.log("allGroup", allGroup);
    _checkGroup(data);
    // return data
  })
}; 