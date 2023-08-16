import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { SeoHelmet } from '../components/SeoHelmet';
import api from '../api';
import { Spinner } from '../components/Spinner';

export default function Product() {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [cart, setCart] = useCart();
    const [spinner, setSpinner] = useState(false);
    const getProduct = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_GET_PRODUCT}${params.slug}`);
            if (data.status === 200) {
                setProduct(data.product);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const similarProducts = async () => {
        try {
            if (!product.category) {
                return;
            }
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_SIMILAR_PRODUCTS}${product._id}/${product.category._id}`);
            if (data.status === 200) {
                setSimilar(data.products);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            getProduct();
            setSpinner(false);
        }, 500);
    }, [params.slug]);
    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            similarProducts();
            setSpinner(false);
        }, 500);
    }, [product._id, product.category]);
    return (
        <>
            <SeoHelmet title={`N1 - E-commerce - ${product.name}`} description={`N1 - E-commerce for smartphone, tablet and laptop - Product sheet of ${product.name}`} image={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`} />
            <div className='w-full h-screen p-5'>
                <h2 className='text-4xl font-bold my-5 text-center'>Product sheet</h2>
                {spinner === true && (
                    <Spinner />
                )}
                {spinner === false && (
                    <div>
                        <div className='flex flex-col md:flex-row justify-around items-center bg-white p-5 rounded-lg shadow-md mb-10 h-autp'>
                            <img className='w-full md:w-64 h-64 object-cover rounded-md mb-5 md:mb-0 md:mr-5' src={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`} alt={product.name} />
                            <div className='flex flex-col items-center md:items-start'>
                                <h3 className='text-2xl font-semibold mb-1'>{product.name}</h3>
                                <h4 className='text-lg text-gray-600 mb-1'>{product.description}</h4>
                                <h4 className='text-lg text-gray-600 mb-1'>Price: {parseFloat(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</h4>
                                <h4 className='text-lg text-gray-600 mb-1'>Category: {product?.category?.name}</h4>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md' onClick={() => { setCart([...cart, product]); toast.success('Product added to cart successfully') }}>Add to cart</button>
                            </div>
                        </div>
                        {
                            similar.length < 1 ? (
                                <h3 className='text-center text-xl font-semibold'>No similar products found</h3>
                            ) : (
                                <>
                                    <h3 className='text-center text-xl font-semibold mb-5'>Similar Products</h3>
                                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                        {similar.map((product) => (
                                            <div key={product._id} className='bg-white p-5 rounded-lg shadow-md mb-10'>
                                                <img className='w-full h-[200px] object-cover rounded-md mb-5' src={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`} alt={product.name} />
                                                <h4 className='text-center text-lg font-semibold mb-2 truncate'>{product.name}</h4>
                                                <p className='text-center text-sm text-gray-600 mb-2'>{product.description.substring(0, 25)}...</p>
                                                <p className='text-center text-sm text-gray-600 mb-2'>Price: {parseFloat(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
                                                <div className='flex justify-center space-x-2'>
                                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-md' onClick={() => navigate(`/product/${product.slug}`)}>More details</button>
                                                    <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-md' onClick={() => { setCart([...cart, product]); toast.success('Product added to cart successfully'); localStorage.setItem('cart', JSON.stringify([...cart, product])) }}>Add to cart</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )
                        }
                    </div>
                )}
            </div>
        </>
    )
}