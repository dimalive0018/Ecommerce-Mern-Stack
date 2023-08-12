const express = require('express');
const { userRegistration, userLogin, forgotPassword, updateProfile, getOrders, allOrders, orderStatus, deleteOrder } = require('../Controllers/auth.controller');
const { signIn, admin } = require('../Middlewares/auth.middleware');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.post(process.env.SIGNUP, userRegistration);

router.post(process.env.SIGNIN, userLogin);

router.post(process.env.FORGOT_PASSWORD, forgotPassword);

router.put(process.env.UPDATE_PROFILE, signIn, updateProfile);

router.get(process.env.ORDERS, signIn, getOrders);

router.get(process.env.ALL_ORDERS, signIn, allOrders);

router.put(process.env.ORDER_STATUS, signIn, orderStatus);

router.delete(process.env.DELETE_ORDER, signIn, deleteOrder);

router.get(process.env.USER_AUTH, signIn, (req, res, next) => {
    res.send({
        status: 200,
        success: true
    });
});

router.get(process.env.ADMIN_AUTH, signIn, admin, (req, res, next) => {
    res.send({
        status: 200,
        success: true
    });
});


module.exports = router;