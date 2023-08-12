const mongoose = require('mongoose');
const User = require('../Models/user.model');
const { registrationControl, findUser, secretUserControl, updateProfile, findProfile, allUserOrders, updateOrder, findAndDeleteOrder } = require('../Data/auth.data');
const { passwordCrypter, passwordDecryptor } = require('../Utils/auth.utils');
const jsonWebToken = require('jsonwebtoken');

module.exports = {
    userRegistration: async (req, res, next) => {
        try {
            const { email, phone, password } = req.body;
            const registeredUser = await registrationControl(email, phone);
            if (registeredUser) {
                let registeredField = '';
                if (registeredUser.phone === phone) {
                    registeredField = 'Phone';
                };
                if (registeredUser.email === email) {
                    registeredField = 'Email';
                    if (registeredUser.phone === phone) {
                        registeredField = 'Email and phone';
                    };
                };
                return res.send({
                    status: 409,
                    message: `${registeredField} already registered`
                });
            };
            const user = new User({ ...req.body });
            await user.validate();
            const encryptPasswords = await passwordCrypter(password);
            user.password = encryptPasswords;
            await user.save();
            res.send({
                status: 201,
                message: 'User successfully registered',
                user
            });
        } catch (error) {
            console.error(error.message);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.send({
                    status: 422,
                    message: error.message
                });
            };
            next(error);
        };
    },
    userLogin: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await findUser(email);
            if (!user) {
                return res.send({
                    status: 404,
                    message: 'Invalid email'
                })
            };
            const decryptPassword = await passwordDecryptor(password, user.password);
            if (!decryptPassword) {
                return res.send({
                    status: 404,
                    message: 'Invalid password'
                })
            };
            const token = jsonWebToken.sign(
                { _id: user.id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '2d' }
            );
            res.send({
                status: 200,
                message: 'Sign in completed',
                user: {
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                    role: user.role
                },
                token
            });
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { email, secretQuestion, secretAnswer, newPassword } = req.body;
            const userCheck = await secretUserControl(email, secretQuestion, secretAnswer);
            if (!userCheck) {
                return res.send({
                    status: 400,
                    message: `Wrong email and secret answer`
                });
            } else if (userCheck) {
                if (userCheck.email !== email) {
                    return res.send({
                        status: 400,
                        message: `Wrong email`
                    });
                };
                if (userCheck.secretQuestion !== secretQuestion) {
                    return res.send({
                        status: 400,
                        message: `Wrong secret question`
                    });
                };
                if (userCheck.secretAnswer !== secretAnswer) {
                    return res.send({
                        status: 400,
                        message: `Wrong secret answer`
                    });
                };
                const tempUser = new User({ newPassword });
                await tempUser.validate();
                const encryptPasswords = await passwordCrypter(newPassword);
                userCheck.password = encryptPasswords;
                await userCheck.save();
                res.send({
                    status: 200,
                    message: `Password reset successfully`
                });
            };
        } catch (error) {
            console.error(error.message);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.send({
                    status: 422,
                    message: error.message
                });
            };
            next(error);
        }
    },
    updateProfile: async (req, res, next) => {
        try {
            const { name, surname, email, password, phone, address, secretQuestion, secretAnswer } = req.body;
            const user = await findProfile(req.user._id);
            if (password) {
                const checkPassword = new User({ password });
                await checkPassword.validate();
            };
            const encryptPassword = password ? await passwordCrypter(password) : user.password;
            const reqUpdate = {
                name: name || user.name,
                surname: surname || user.surname,
                email: email || user.email,
                password: encryptPassword,
                phone: phone || user.phone,
                address: address || user.address,
                secretQuestion: secretQuestion || user.secretQuestion,
                secretAnswer: secretAnswer || user.secretAnswer
            };
            const updateUser = await updateProfile(req.user._id, reqUpdate);
            res.send({
                status: 200,
                message: 'Profile updated successfully',
                updateUser
            })
        } catch (error) {
            console.error(error.message);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.send({
                    status: 422,
                    message: error.message
                });
            };
            next(error);
        }
    },
    getOrders: async (req, res, next) => {
        try {
            const orders = await allUserOrders({ user: req.user._id });
            res.json(orders);
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    allOrders: async (req, res, next) => {
        try {
            const orders = await allUserOrders({});
            res.json(orders);
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    orderStatus: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const orders = await updateOrder(id, status);
            res.json(orders);
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    deleteOrder: async (req, res, next) => {
        try {
            const { id } = req.params;
            const order = await findAndDeleteOrder(id);
            res.json(order);
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    }
}