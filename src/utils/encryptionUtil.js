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

export { encryptObjectValues };

