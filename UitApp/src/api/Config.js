export const API_URL = "http://192.168.137.1:10000";
export const DEFAULT_KEY = convertStringToByteArray("PeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H");

function convertStringToByteArray(str) {
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