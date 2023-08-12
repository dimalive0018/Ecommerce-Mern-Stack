const Product = require('../Models/product.model');

module.exports = {
    findProducts: async (category, photo, order) => {
        return await Product.find({}).populate(category).select(photo).sort(order);
    },
    findProduct: async (slug, category, photo) => {
        return await Product.findOne({ slug }).populate(category).select(photo);
    },
    findPhoto: async (id, photo) => {
        return await Product.findById(id).select(photo);
    },
    findAndUpdateProduct: async (id, req) => {
        return await Product.findByIdAndUpdate(id, req, { new: true, runValidators: true });
    },
    findAndDeleteProduct: async (id, photo) => {
        return await Product.findByIdAndDelete(id).select(photo);
    },
    findAndFilter: async (req) => {
        return await Product.find(req);
    },
    searchProducts: async (req, photo) => {
        return await Product.find(req).select(photo);
    },
    similarProducts: async (req, photo, category, number) => {
        return await Product.find(req).select(photo).populate(category).limit(number);
    },
    productsByCategory: async (req, category) => {
        return await Product.find(req).populate(category);
    }
}