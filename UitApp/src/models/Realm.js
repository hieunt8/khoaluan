const Realm = require('realm');

export const userSchema = {
  name: 'user',
  primaryKey: 'mssv',
  properties: {
    mssv: 'string',
    name: 'string',
    publicKey: { type: 'string', default: "" },
    privateKey: { type: 'string', default: "" },
  }
};

export const listuserSchema = {
  name: 'listUser',
  // primaryKey: 'mssv',
  properties: {
    __v: 'int',
    _id: 'string',
    mssv: 'string',
    name: 'string',
    publicKey: { type: 'string', default: "" },
  }
};


export const GroupSchema = {
  name: 'group',
  primaryKey: 'groupName',
  properties: {
    groupName: 'string',
    listMssv: 'string[]',
    version: 'int',
    shareKey: { type: 'string', default: "" },
    Updated: { type: 'bool', default: false },
    infolistMssv: {type: 'list',objectType:'listUser'},
    treeInfo: { type: 'string', default: "" },
    treeLocalInfo: { type: 'string', default: "" },
  }
};


export const GroupShareKey = {
  name: 'group',
  primaryKey: 'groupName',
  properties: {
    groupName: 'string',
    version: 'int',
    shareKey: { type: 'string', default: "" },
  }
};

export const listgroupInfoSchema = {
  name: 'listgroupInfo',
  primaryKey: 'groupName',
  properties: {
    _id: 'string',
    groupName: 'string',
    listMssv: 'string[]',
    version: 'int',
  }
};

export const listgroupSchema = {
  name: 'listGroup',
  properties: {
    info: {type: 'list',objectType:'listgroupInfo'},
  }
};