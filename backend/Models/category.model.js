const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        validate: {
            validator:
                function (name) {
                    return name.length >= 2;
                },
            message: "Category name must be at least 2 characters long"
        }
    },
    slug: {
        type: String,
        lowercase: true
    }
}, { timestamps: true })

categorySchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;