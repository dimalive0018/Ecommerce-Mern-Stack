import React, { useState, useEffect } from 'react';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';
import Paybutton from '../components/Paybutton';
import { NavLink, useNavigate } from 'react-router-dom';
import { SeoHelmet } from '../components/SeoHelmet';
import { Spinner } from '../components/Spinner'

export default function Cart() {
    const [cart, setCart] = useCart();
    const [auth] = useAuth();
    const [totalCost, setTotalCost] = useState(0);
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();
    const removeProduct = (id) => {
        try {
            let productsCart = [...cart];
            let index = productsCart.findIndex((product) => product._id === id);
            productsCart.splice(index, 1);
            setCart(productsCart);
            localStorage.setItem('cart', JSON.stringify(productsCart));
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 500);
    }, [])
    useEffect(() => {
        const newTotal = cart.reduce((acc, product) => acc + parseFloat(product.price), 0);
        setTotalCost(newTotal);
    }, [cart]);
    return (
        <>
            <SeoHelmet title={`N1 - E-commerce - Cart - ${cart.length}`} description={'N1 - E-commerce for smartphone, tablet and laptop - Shopping cart'} />
            <div className='w-full h-screen p-3 my-5'>
                {spinner === true && (
                    <Spinner />
                )}
                {spinner === false && (
                    <div className='flex flex-col items-center my-5'>
                        <h1 className='text-4xl font-bold mb-2'>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
                        <h2 className='text-2xl font-semibold mb-10'>
                            {auth?.token
                                ? cart?.length >= 2
                                    ? `You have ${cart?.length} products in your cart`
                                    : cart?.length >= 1
                                        ? `You have ${cart?.length} product in your cart`
                                        : 'Your cart is empty'
                                : 'Please sign in for checkout'}
                        </h2>
                        <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-5 my-5'>
                            <div className='col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5'>
                                {cart.map((product, index) => (
                                    <div className='bg-white p-5 rounded-lg shadow-md flex flex-col items-center' key={index}>
                                        <img className='w-full h-[200px] object-cover rounded-md mb-5' src={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`} alt={product.name} />
                                        <h4 className='text-lg font-semibold mb-2 truncate'>
                                            <NavLink to={`/product/${product.slug}`}>
                                                {product.name}
                                            </NavLink>
                                        </h4>
                                        <p className='text-sm text-gray-600 mb-2'>{product.description.substring(0, 25)}...</p>
                                        <p className='text-sm text-gray-600 mb-5'>Price: {parseFloat(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
                                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md' onClick={() => removeProduct(product._id)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                            <div className='bg-white p-5 rounded-lg shadow-md flex flex-col items-center h-72'>
                                <h4 className='text-lg font-semibold mb-5'>Cart Summary</h4>
                                <hr className='mb-5 w-full' />
                                <h4 className='text-lg font-semibold mb-10'>Total: {totalCost.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</h4>
                                <Paybutton cartProducts={cart} totalPrice={totalCost.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })} totalProducts={cart.length} />
                                {auth?.user ? (
                                    null
                                ) : (
                                    <NavLink
                                        onClick={(event) => {
                                            event.preventDefault();
                                            navigate("/sign", { state: "/cart" });
                                        }}
                                    >
                                        Sign in for checkout
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}