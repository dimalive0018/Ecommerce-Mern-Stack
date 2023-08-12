import React from 'react';
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';
import api from '../api';

export default function Paybutton({ cartProducts, totalPrice, totalProducts }) {
    const [auth] = useAuth();
    const handleCheckout = async () => {
        if (cartProducts.length < 1) {
            return toast.error("Cart is empty");
        };
        const filteredCartProducts = cartProducts.map(product => {
            return {
                name: product.name,
                _id: product._id,
                price: product.price
            }
        });
        try {
            const { data } = await api.post(
                `${import.meta.env.VITE_APP_API_CHECKOUT_STRIPE}`,
                {
                    filteredCartProducts,
                    auth,
                    totalPrice,
                    totalProducts
                }
            );
            if (data.url) {
                window.location.href = data.url;
                localStorage.removeItem('cart');
            } else {
                toast.error("Something went wrong with the checkout process");
            };
        } catch (error) {
            console.error(error.message);
        }
    }; return (
        <div>
            <button disabled={!auth?.user || auth.user.role === 'admin'} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mb-auto' onClick={handleCheckout}>Check out</button>
        </div>
    )
}