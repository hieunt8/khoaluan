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
    infolistMssv: {type: 'list',objectType:'listUser'},
    version: 'int',
    shareKey: { type: 'string', default: "" },
  }
};

export const TreeSchema = {
  name: 'tree',
  primaryKey: 'groupName',
  properties: {
    groupName: 'string',
    treeinfo: 'string',
  }
};