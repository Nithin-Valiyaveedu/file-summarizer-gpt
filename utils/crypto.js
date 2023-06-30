var CryptoJS = require("crypto-js");

export const storeUserDetails = (userData) => {
  // Encrypt
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
    "cornerstone"
  ).toString();
  localStorage.setItem("userData", ciphertext);
};


export const getUserDetails = () => {
  const ciphertext = localStorage.getItem("userData");
  if (!ciphertext) {
    return false;
  } else {
    var bytes = CryptoJS.AES.decrypt(ciphertext, "cornerstone");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (decryptedData) {
      return decryptedData;
    } else {
      return false;
    }
  }
};

export const getUserTokenFromLocalStorage = () => {
  const ciphertext = localStorage.getItem("userData");
  if (!ciphertext) {
    return false;
  } else {
    var bytes = CryptoJS.AES.decrypt(ciphertext, "cornerstone");
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (decryptedData.authToken) {
      return decryptedData.authToken;
    } else {
      return false;
    }
  }
};

export const removeUserDataFromLS = () => {
  localStorage.removeItem("userData");
};
