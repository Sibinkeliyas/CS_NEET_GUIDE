import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import forge from "node-forge";

export const decodeJwt = (token: string) => {
  try {
    const authToken = token.split(" ")[1];
    return jwtDecode(authToken);
  } catch (error) {
    throw error;
  }
};

export const generateJwt = async (tokenData: any) => {
  const jwtData = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: "3d",
  });
  return jwtData
  
};

export const customFetch = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const setLocalStorage = (key: string, value: string | null) => {
  if (value) localStorage.setItem(key, value);
  else localStorage.removeItem(key);
};

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const encrypt = (data: any, password: string) => {
  const iv = forge.random.getBytesSync(16);
  const md = forge.md.sha256.create();
  md.update(password);
  const key = md.digest().bytes(); // Use bytes() to get the key in byte format

  const cipher = forge.cipher.createCipher("AES-CTR", key);
  cipher.start({ iv: iv });
  cipher.update(forge.util.createBuffer(data));
  cipher.finish();
  const encrypted = cipher.output.toHex();

  console.log("Encrypted: " + encrypted);

  return {
    iv: forge.util.bytesToHex(iv),
    encrypted: encrypted,
  };
};


export const decrypt = (encrypted: string, ivHex: string, password: string) => {
  try {
    // Convert IV from hex to bytes
    const iv = forge.util.hexToBytes(ivHex);
    // Derive the key from the password using SHA-256
    const md = forge.md.sha256.create();
    md.update(password);
    const key = md.digest().bytes();
    // Create and initialize the decipher
    const decipher = forge.cipher.createDecipher('AES-CTR', key);
    decipher.start({ iv: iv });
    // Convert encrypted data from hex to bytes and update the decipher
    decipher.update(forge.util.createBuffer(forge.util.hexToBytes(encrypted)));
    decipher.finish();
    // Get the decrypted data
    const decrypted = decipher.output.toString();
    return decrypted;
  } catch (error) {
    return null;
  }
};
