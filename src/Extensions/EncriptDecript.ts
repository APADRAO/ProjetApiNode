import sjcl from 'sjcl';

const secretKey = 'abrakadabra'; // Replace with your own secret key


const encryptando = async (password: string): Promise<string> => {
 
  const encrypted = sjcl.encrypt(secretKey, password);
  console.log(encrypted);
  return encrypted.toString();
};

const decryptando = async (encryptedPassword: string): Promise<string> => {
    const decryptedPassword = await sjcl.decrypt(secretKey, encryptedPassword);
    return decryptedPassword;
};

export { encryptando, decryptando };