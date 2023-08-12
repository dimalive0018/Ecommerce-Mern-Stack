const jsonWebToken = require('jsonwebtoken');
const { checkingUser } = require('../Data/auth.data');

module.exports = {
    signIn: async (req, res, next) => {
        try {
            const tokenDecryptor = jsonWebToken
                .verify(
                    req.headers.authorization,
                    process.env.JWT_SECRET_KEY
                )
            req.user = tokenDecryptor;
            next();
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },
    admin: async (req, res, next) => {
        try {
            const checkUser = await checkingUser(req.user._id);
            if (checkUser.role !== 'admin') {
                return res.sens({
                    status: 401,
                    message: 'Unauthorized Access'
                });
            } else {
                next();
            }
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    }
};