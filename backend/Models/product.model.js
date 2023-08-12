const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    name: {
        type: String,
        trim: true,
        validate: {
            validator:
                function (name) {
                    return name.length >= 2;
                },
            message: "Name must be at least 2 characters long"
        }
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        trim: true,
        validate: {
            validator:
                function (description) {
                    return description.length >= 10;
                },
            message: "Description must be at least 10 characters long"
        }
    },
    price: {
        type: String,
        trim: true,
        validate: {
            validator: function (price) {
                return price >= 0.01 && /^\d+\.\d{2}$/.test(price.toString());
            },
            message: "Price must be greater than or equal to 0.01 and have two decimal places"
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        validate: {
            validator: async function (id) {
                if (!id) {
                    return false;
                }
                return await mongoose.model('category').exists({ _id: id });
            },
            message: 'Please select a category'
        }
    },
    photo: {
        data: Buffer,
        contentType: String
    },
}, { timestamps: true })

productSchema.set('toJSON', {
    transform: (dot, rel) => {
        delete rel.__v;
        return rel;
    }
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;