const Stripe = require('stripe');
const Order = require('../Models/order.model');
const dotenv = require('dotenv');

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

exports.createCheckoutSession = async (req, res, next) => {
    try {
        const line_items = req.body.filteredCartProducts.map(product => {
            return {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: product.name,
                        metadata: {
                            id: product._id
                        }
                    },
                    unit_amount: product.price * 100,
                },
                quantity: 1,
            }
        });
        const session = await stripe.checkout.sessions.create({
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'eur',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 3,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 5,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 800,
                            currency: 'eur',
                        },
                        display_name: 'Next day air',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1,
                            },
                        },
                    },
                },
            ],
            line_items,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });
        const newOrder = new Order({
            products: req.body.filteredCartProducts.map(product => product._id),
            user: req.user._id,
            address: req.body.auth.user.address,
            phone: req.body.auth.user.phone,
            payment: req.body.totalPrice,
            quantity: req.body.totalProducts
        });
        await newOrder.save();
        res.send({
            url: session.url
        });
    } catch (error) {
        console.error(error.message);
        next(error);
    }
}
