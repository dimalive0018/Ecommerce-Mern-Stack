const bcrypt = require('bcrypt');

module.exports = {
    passwordCrypter: async (p) => {
        try {
            return await bcrypt.hash(p, 10);
        } catch (error) {
            console.log(error);
            next(error);
        }
    },
    passwordDecryptor: async (p, passwordCrypter) => {
        try {
            return await bcrypt.compare(p, passwordCrypter);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};