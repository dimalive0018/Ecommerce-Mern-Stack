import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { SeoHelmet } from '../components/SeoHelmet';
import api from '../api';
import { Spinner } from '../components/Spinner';

export default function Category() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();
    const params = useParams();
    const navigate = useNavigate();
    const [spinner, setSpinner] = useState(false);
    const [offset, setOffset] = useState(6);
    const productsByCategory = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_PRODUCTS_BY_CATEGORY}${params.slug}`)
            if (data.status === 404) {
                return toast.error(data.message);
            };
            if (data.status === 200) {
                setProducts(data.products);
                setCategory(data.category);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const handleScroll = (e) => {
        if (
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight
        ) {
            setOffset((prevOffset) => prevOffset + 6);
        }
    };
    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            productsByCategory();
            setSpinner(false);
        }, 500);
        setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
        }, 3000);
    }, [params.slug])
    return (
        <>
            <SeoHelmet title={`N1 - E-commerce - ${category.name} category`} description={`N1 - E-commerce for smartphone, tablet and laptop - ${category.name} category`} />
            <div className='w-full min-h-screen p-5'>
                <div className='text-center'>
                    <h2 className='text-4xl font-bold mb-5'>Category - {category.name}</h2>
                    <h3 className='text-2xl font-semibold mb-10'>{products.length} results found</h3>
                    {spinner === true && (
                        <Spinner />
                    )}
                    {spinner === false && (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
                            {products.slice(0, offset).map((product) => (
                                <div className='flex flex-col items-center p-5 border rounded-lg shadow-md' key={product._id}>
                                    <h4 className='text-lg font-medium mb-3'>{product.name}</h4>
                                    <img className='w-32 h-32 object-cover rounded-full mb-3' src={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`} alt='Product photo'></img>
                                    <p className='text-sm text-gray-600 mb-3'>{product.description.substring(0, 25)}...</p>
                                    <p className='text-lg font-semibold mb-3'>Price: {parseFloat(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
                                    <div className='flex'>
                                        <button className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md mr-2' onClick={() => navigate(`/product/${product.slug}`)}>More Details</button>
                                        <button className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md' onClick={() => { setCart([...cart, product]); toast.success('Product added to cart successfully'); localStorage.setItem('cart', JSON.stringify([...cart, product])) }}>Add to cart</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}