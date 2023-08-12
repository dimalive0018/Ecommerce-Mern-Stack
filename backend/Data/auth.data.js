const Order = require('../Models/order.model');
const User = require('../Models/user.model');

module.exports = {
    registrationControl: async (email, phone) => {
        return await User.findOne({ $or: [{ email }, { phone }] });
    },
    findUser: async (email) => {
        return await User.findOne({ email });
    },
    secretUserControl: async (email, secretQuestion, secretAnswer) => {
        return await User.findOne({ $or: [{ email }, { secretQuestion }, { secretAnswer }] });
    },
    checkingUser: async (req) => {
        return await User.findById(req);
    },
    findProfile: async (id) => {
        return await User.findById(id);
    },
    updateProfile: async (id, req) => {
        return await User.findByIdAndUpdate(id, req, { new: true, runValidators: true });
    },
    allUserOrders: async (id) => {
        return await Order.find(id).populate('products', '-photo').populate('user', 'name').sort({ createdAt: '-1' })
    },
    updateOrder: async (id, status) => {
        return await Order.findByIdAndUpdate(id, { status }, { new: true });
    },
    findAndDeleteOrder: async (id) => {
        return await Order.findByIdAndDelete(id);
    }
}