var aesjs = require('aes-js');

const convertStringToByteArray = (str) => {
  String.prototype.encodeHex = function () {
    var bytes = [];
    for (var i = 0; i < this.length; ++i) {
      bytes.push(this.charCodeAt(i));
    }
    return bytes;
  };

  var byteArray = str.encodeHex();
  return byteArray
}
//// 128-bit, 192-bit and 256-bit keys
export const AesEnc = (plainText, key) => {
  key = convertStringToByteArray(key);
  plainText = JSON.stringify(plainText);
  var plaintextBytes = aesjs.utils.utf8.toBytes(plainText);
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(10));
  var ciphertextBytes = aesCtr.encrypt(plaintextBytes);
  var cipherText = aesjs.utils.hex.fromBytes(ciphertextBytes);
  return cipherText;
}

export const AesDec = (cipherText, key) => {
  key = convertStringToByteArray(key);
  var ciphertextBytes = aesjs.utils.hex.toBytes(cipherText);
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(10));
  var plaintextBytes = aesCtr.decrypt(ciphertextBytes);
  var plainText = aesjs.utils.utf8.fromBytes(plaintextBytes);
  return JSON.parse(plainText);
}
