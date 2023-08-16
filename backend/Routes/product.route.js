const express = require('express');
const uploadSetting = require('../Multer/upload.setting');
const { signIn, admin } = require('../Middlewares/auth.middleware');
const { createProduct, getProducts, getProduct, getPhoto, deleteProduct, updateProduct, productFilter, productsSearch, similarProducts, getProductsByCategory } = require('../Controllers/product.controller');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const upload = uploadSetting;

router.post(process.env.CREATE_PRODUCT, signIn, admin, upload.single('photo'), createProduct);

router.get(process.env.GET_PRODUCTS, getProducts);

router.get(process.env.GET_PRODUCT, getProduct);

router.delete(process.env.DELETE_PRODUCT, signIn, admin, deleteProduct);

router.put(process.env.UPDATE_PRODUCT, signIn, admin, upload.single('photo'), updateProduct)

router.get(process.env.GET_PHOTO, getPhoto);

router.post(process.env.PRODUCT_FILTER, productFilter);

router.get(process.env.SEARCH, productsSearch);

router.get(process.env.SIMILAR_PRODUCTS, similarProducts);

router.get(process.env.PRODUCTS_CATEGORY, getProductsByCategory);

module.exports = router;