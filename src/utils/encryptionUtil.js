
import JSEncrypt from 'jsencrypt';

// Assuming you have the correct PEM-formatted public key
const publicKey = import.meta.env.VITE_PUBLIC_KEY;

const encryptObjectValues = (obj) => {
    try {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        const encryptedObj = {};
        for (const key in obj) {
            const value = obj[key];
            const encryptedValue = encrypt.encrypt(value); // JSEncrypt defaults to base64 encoding
            encryptedObj[key] = encryptedValue;
        }
        return encryptedObj;
    } catch (error) {
        console.error('Error occurred while encrypting object values:', error);
        return null;
    }
};

export { encryptObjectValues };

