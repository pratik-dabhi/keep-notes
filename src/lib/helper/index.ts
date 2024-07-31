import crypto from 'crypto-js';

const hasUserAuthenticated  = () => {

}

const setItem = (key: string, value:string) => {
    return localStorage.setItem(key,value);
}

const getItem = (key : string) => {
    return localStorage.getItem(key);
}

const removeItem = (key : string) => {
    return localStorage.removeItem(key);
}

const stringify = (data : unknown) => {
    return JSON.stringify(data);
}

const parse = (data : string) => {
    return JSON.parse(data);
}

let counter = 0;

const uniqueKeyGenerator = (): string => {
  const uniqueKey = `${Date.now()}-${counter}`;
  counter += 1;
  return uniqueKey;
};

const encrypt = (value: string): string => {
    try {
      const encrypted = crypto.AES.encrypt(value, import.meta.env.VITE_APP_KEY).toString();
      return encrypted;
    } catch (error) {
      console.error("Encryption error:", error);
      throw error;
    }
  };
  
const decrypt = (encryptedValue: string): string => {
    try {
      const bytes = crypto.AES.decrypt(encryptedValue, import.meta.env.VITE_APP_KEY);
      const decrypted = bytes.toString(crypto.enc.Utf8);
      return decrypted;
    } catch (error) {
      console.error("Decryption error:", error);
      throw error;
    }
  };
  


export { hasUserAuthenticated, setItem, getItem, stringify, removeItem, parse , uniqueKeyGenerator , encrypt , decrypt};

