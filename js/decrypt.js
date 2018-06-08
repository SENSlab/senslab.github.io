function decrypt(encryptedData, pass) {
  // Split string by ',' which is included in encrypted data in advance.
  var array_rawData = encryptedData.split(',');

  var salt = CryptoJS.enc.Hex.parse(array_rawData[0]);  // Password Salt
  var iv = CryptoJS.enc.Hex.parse(array_rawData[1]);    // Initial Vector: IV
  var encrypted_data = CryptoJS.enc.Base64.parse(array_rawData[2]); //Encrypted Data

  //Password（Definition of Key Area）
  var secret_passphrase = CryptoJS.enc.Utf8.parse(pass);
  var key128Bits500Iterations =
      CryptoJS.PBKDF2(secret_passphrase, salt, {keySize: 128 / 8, iterations: 500 });

  //Decrypt option
  var options = {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7};

  //Decrypt
  var decrypted = CryptoJS.AES.decrypt({"ciphertext":encrypted_data}, key128Bits500Iterations, options);
  
  return decrypted.toString(CryptoJS.enc.Utf8);
}
