const mongoose = require('mongoose');
const Product = require('../Models/product.model');
const slugify = require('slugify');
const fs = require('fs');
const { findProducts, findProduct, findPhoto, findAndDeleteProduct, findAndUpdateProduct, findAndFilter, searchProducts, similarProducts, productsByCategory } = require('../Data/product.data');
const { findCategory } = require('../Data/category.data');

module.exports = {
    createProduct: async (req, res, next) => {
        try {
            const photo = req.file;
            const product = new Product({ ...req.body, slug: slugify(req.body.name) });
            if (!photo) {
                res.send({
                    status: 400,
                    message: 'Insert photo'
                })
            };
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.mimetype;
            await product.save();
            res.send({
                status: 201,
                message: 'created successfully',
                product
            });
        } catch (error) {
            console.error(error.message);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.send({
                    status: 422,
                    message: error.message
                });
            };
            if (error instanceof mongoose.CastError) {
                return res.send({
                    status: 400,
                    message: 'Enter category'
                });
            };
            next(error);
        }
    },
    getProducts: async (req, res, next) => {
        try {
            const products = await findProducts('category', '-photo', { createdAt: -1 });
            if (!products) {
                return res.send({
                    status: 404,
                    message: 'Products not found'
                });
            }
            const totalProducts = await Product.countDocuments({});
            res.send({
                status: 200,
                totalProducts,
                message: 'All products in database',
                products
            })
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    getProduct: async (req, res, next) => {
        try {
            const { slug } = req.params;
            const product = await findProduct(slug, 'category', '-photo');
            res.send({
                status: 200,
                message: 'Product found successfully',
                product
            })
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            await findAndDeleteProduct(id, '-photo');
            res.send({
                status: 200,
                message: 'product deleted successfully'
            })
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const { id } = req.params;
            const photo = req.file;
            const updateData = { ...req.body, slug: slugify(req.body.name) };
            const product = await findAndUpdateProduct(id, updateData);
            if (photo) {
                product.photo.data = fs.readFileSync(photo.path);
                product.photo.contentType = photo.mimetype;
                await product.save();
            };
            res.send({
                status: 201,
                message: 'product updated succefully',
                product
            })
        } catch (error) {
            console.error(error.message);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.send({
                    status: 422,
                    message: error.message
                });
            };
            if (error instanceof mongoose.CastError) {
                return res.send({
                    status: 400,
                    message: 'Enter category'
                });
            };
            next(error);
        }
    },
    getPhoto: async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await findPhoto(id, 'photo');
            res.set('Content-type', product.photo.contentType);
            res.status(200).send(product.photo.data)
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    productFilter: async (req, res, next) => {
        try {
            const { category } = req.body;
            let filters = {};
            if (category.length > 0) filters.category = category;
            const products = await findAndFilter(filters);
            res.send({
                status: 200,
                products
            })
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    productsSearch: async (req, res, next) => {
        try {
            const { key } = req.params;
            const products = await searchProducts({
                $or: [
                    { name: { $regex: key, $options: 'i' } },
                    { description: { $regex: key, $options: 'i' } }
                ]
            }, '-photo');
            if (!products) {
                return res.send({
                    status: 404,
                    message: 'No results found'
                })
            }
            res.json(products)
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    similarProducts: async (req, res, next) => {
        try {
            const { id, category } = req.params;
            const productsSearch = {
                category: category,
                _id: { $ne: id }
            };
            const products = await similarProducts(productsSearch, '-photo', 'category', 3);
            res.send({
                status: 200,
                products
            })
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    getProductsByCategory: async (req, res, next) => {
        try {
            const { slug } = req.params;
            const category = await findCategory(slug);
            const products = await productsByCategory({ category }, 'category');
            if (!products) {
                return res.send({
                    status: 404,
                    message: 'Products not found'
                });
            };
            res.send({
                status: 200,
                category,
                products
            })
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    }
}