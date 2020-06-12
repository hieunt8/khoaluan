const Realm = require('realm');

export const userSchema = {
  name: 'user',
  primaryKey: 'mssv',
  properties: {
    mssv: 'string',
    name: 'string',
    publicKey: {type: 'string', default: ""},
    privateKey: {type: 'string', default: ""},
  }
};

export const listuserSchema = {
  name: 'listUser',
  primaryKey: 'mssv',
  properties: {
    mssv: 'string',
    name: 'string',
    publicKey: {type: 'string', default: ""},
  }
};
