import forge from 'node-forge';




const encryptObjectValues = (obj) => {
    try {
        const publicKeyPem = import.meta.env.VITE_PUBLIC_KEY.replace(/\\n/g, '\n');
        console.log(publicKeyPem)
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
                encryptedObj[key] = forge.util.encode64(encryptedValue);
            }
        }
        return encryptedObj;
    } catch (error) {
        console.error('Error occurred while encrypting object values:', error);
        return null;
    }
};

export { encryptObjectValues };

