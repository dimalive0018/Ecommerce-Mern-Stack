const { default: slugify } = require('slugify');
const Category = require('../Models/category.model');

module.exports = {
    allCategories: async () => {
        return await Category.find({});
    },
    findCategory: async (slug) => {
        return await Category.findOne({ slug })
    },
    registrationCategoryControl: async (name) => {
        return await Category.findOne({ name });
    },
    updateCategory: async (id, name) => {
        return await Category.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true, runValidators: true });
    },
    deleteCategory: async (id) => {
        return await Category.findByIdAndDelete(id);
    }
}