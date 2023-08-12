const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        validate: {
            validator:
                async function (id) {
                    return await mongoose.model('product').exists({ _id: id });
                },
            message: 'Product id non valido'
        }
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        validate: {
            validator:
                async function (id) {
                    return await mongoose.model('user').exists({ _id: id });
                },
            message: 'User id non valido'
        }
    }],
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    status: {
        type: String,
        default: 'Not processed',
        enum: ['Not processed', 'Processing', 'Delivered', 'Shipped', 'Cancelled']
    },
    payment: {
        type: String,
    },
}, { timestamps: true });

orderSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        return ret;
    }
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;