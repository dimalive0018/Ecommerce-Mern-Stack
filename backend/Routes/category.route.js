const express = require('express');
const { signIn, admin } = require('../Middlewares/auth.middleware');
const { createCategory, updateCategory, getCategories, getCategory, deleteCategory } = require('../Controllers/category.controller');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

router.get(process.env.CATEGORIES, getCategories);

router.get(process.env.GET_CATEGORY, getCategory);

router.post(process.env.CREATE_CATEGORY, signIn, admin, createCategory);

router.put(process.env.UPDATE_CATEGORY, signIn, admin, updateCategory);

router.delete(process.env.DELETE_CATEGORY, signIn, admin, deleteCategory);

module.exports = router;