const mongoose = require('mongoose');
const Category = require('../Models/category.model');
const { registrationCategoryControl, updateCategory, allCategories, findCategory, deleteCategory } = require('../Data/category.data');
const { default: slugify } = require('slugify');

module.exports = {
    getCategories: async (req, res, next) => {
        try {
            const categories = await allCategories();
            if (!categories) {
                return res.send({
                    status: 404,
                    message: 'No categories found'
                });
            }
            res.send({
                status: 200,
                categories
            });
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    getCategory: async (req, res, next) => {
        try {
            const { slug } = req.params;
            const category = await findCategory(slug);
            if (!category) {
                return res.send({
                    status: 404,
                    message: 'Category not found'
                });
            }
            res.send({
                status: 200,
                message: 'Operation completed successfully',
                category
            });
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    },
    createCategory: async (req, res, next) => {
        try {
            const { name } = req.body;
            const registeredCategory = await registrationCategoryControl(name);
            if (registeredCategory) {
                return res.send({
                    status: 409,
                    message: 'Existing category'
                });
            };
            const category = await new Category({ name, slug: slugify(name) }).save();
            res.send({
                status: 201,
                message: 'category created successfully',
                category
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
    updateCategory: async (req, res, next) => {
        try {
            const { name } = req.body;
            const { id } = req.params;
            const category = await updateCategory(id, name);
            res.send({
                status: 200,
                message: 'category updated successfully',
                category
            });
        } catch (error) {
            console.error(error.message);
            if (error instanceof mongoose.Error.ValidationError) {
                return res.send({
                    status: 422,
                    message: error.message
                });
            };
        }
    },
    deleteCategory: async (req, res, nexy) => {
        try {
            const { id } = req.params;
            const category = await deleteCategory(id);
            res.send({
                status: 200,
                message: 'category deleted successfully',
                category
            });
        } catch (error) {
            console.error(error.message);
            next(error);
        }
    }
}