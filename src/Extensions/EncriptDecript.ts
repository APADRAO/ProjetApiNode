import sjcl from 'sjcl';

const secretKey = 'abrakadabra'; // Replace with your own secret key


const encryptando = (password: string): string => {
 
  const encrypted = sjcl.encrypt(secretKey, password);
  console.log(encrypted);
  return encrypted.toString();
};

const decryptando = (encryptedPassword: string): string => {
    const decryptedPassword = sjcl.decrypt(secretKey, encryptedPassword);
    return decryptedPassword;
};

export { encryptando, decryptando };