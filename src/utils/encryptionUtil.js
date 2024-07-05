import forge from 'node-forge';




const encryptObjectValues = (obj) => {
    try {
        // .replace(/\\n/g, '\n');
        const publicKeyPem = import.meta.env.VITE_PUBLIC_KEY;
        console.log(typeof (publicKeyPem))
        const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
        console.log(publicKey);
        const encryptedObj = {};
        for (const key in obj) {
            if (Object.hasOwn(obj, key)) {
                const value = obj[key];
                const encryptedValue = publicKey.encrypt(value, 'RSA-OAEP', {
                    md: forge.md.sha256.create(),
                    mgf1: forge.mgf.mgf1.create(forge.md.sha256.create())
                });

                const encryptedBytes = publicKey.encrypt(forge.util.encodeUtf8(value), 'RSA-OAEP', {
                    md: forge.md.sha256.create(),
                    mgf1: {
                        md: forge.md.sha256.create()
                    }
                });

                encryptedObj[key] = forge.util.encode64(encryptedBytes);
            }
        }
        console.log(encryptedObj)
        return encryptedObj;
    } catch (error) {
        console.error('Error occurred while encrypting object values:', error);
        return null;
    }
};

const decryptObjectValues = (encryptedObj, _privateKey) => {
    try {
        const privateKey = forge.pki.privateKeyFromPem(_privateKey);
        const decryptedObj = {};

        for (const key in encryptedObj) {
            if (Object.hasOwn(encryptedObj, key)) {
                const encryptedValue = encryptedObj[key];
                const encryptedBytes = forge.util.decode64(encryptedValue);

                const decryptedBytes = privateKey.decrypt(encryptedBytes, 'RSA-OAEP', {
                    md: forge.md.sha256.create(),
                    mgf1: forge.mgf.mgf1.create(forge.md.sha256.create())
                });

                decryptedObj[key] = forge.util.decodeUtf8(decryptedBytes);
            }
        }

        return decryptedObj;
    } catch (error) {
        console.error('Error occurred while decrypting object values:', error);
        return null;
    }
};


export { decryptObjectValues, encryptObjectValues };

