const express = require('express');
const { createCheckoutSession } = require('../Controllers/checkout.controller');
const dotenv = require('dotenv');
const { signIn } = require('../Middlewares/auth.middleware');

dotenv.config();

const router = express.Router();

router.post(process.env.CHECKOUT, signIn, createCheckoutSession);

module.exports = router;