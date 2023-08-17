import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Checkbox, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { SeoHelmet } from '../components/SeoHelmet';
import api from '../api';
import { Spinner } from '../components/Spinner';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();
    const [spinner, setSpinner] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [offset, setOffset] = useState(10);
    const allProducts = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_PRODUCTS}`);
            if (data.status === 404) {
                return toast.error(data.message);
            };
            if (data.status === 200) {
                setProducts(data.products);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const allCategories = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_GET_CATEGORIES}`);
            if (data.status === 404) {
                return toast.error(data.message);
            };
            if (data.status === 200) {
                setCategories(data.categories);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const filterCategory = (e, id) => {
        if (e) {
            setCategory([...category, id]);
        } else {
            setCategory(category.filter((category) => category !== id));
        }
    };
    const filterProducts = async () => {
        try {
            const { data } = await api.post(`${import.meta.env.VITE_APP_API_FILTERED_PRODUCTS}`, { category });
            setProducts(data.products);
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const resetFilters = () => {
        setCategory([]);
        form.resetFields(categories.map((category) => `category-${category._id}`));
    };
    const handleScroll = (e) => {
        if (
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight
        ) {
            setOffset((prevOffset) => prevOffset + 10);
        }
    };
    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            allCategories();
            allProducts();
            setSpinner(false);
        }, 3000);
        setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
        }, 5000);
    }, []);
    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            filterProducts();
            setSpinner(false);
        }, 3000);
    }, [category]);
    return (
        <>
            <SeoHelmet title={'N1 - E-commerce - Home'} description={'N1 - E-commerce for smartphone, tablet and laptop - Home'} />
            <div className='w-full h-screen'>
                <div className='w-full h-[50%] flex flex-col justify-evenly items-center text-center bg-blue-300 rounded-2xl text-white'>
                    <h1 className='text-9xl font-extrabold font-sans'>N1</h1>
                    <h2 className='text-xl sm:text-3xl font-bold font-sans'>E-commerce for smartphone, tablet and laptop</h2>
                </div>
                <div className="flex flex-col items-center m-10">
                    {spinner === true && (
                        <Spinner />
                    )}
                    {spinner === false && (
                        <>
                            <div className='flex flex-col md:flex-row items-center justify-around w-full'>
                                <h3 className='text-xl sm:text-3xl font-bold m-5'>All Products</h3>
                                <Form className='flex flex-col items-center m-5' form={form}>
                                    <div className='flex flex-row items-center'>
                                        <div className='mr-10 flex flex-col md:flex-row justify-center'>
                                            {categories.map((category) => (
                                                <Form.Item key={category._id} name={`category-${category._id}`}>
                                                    <Checkbox className='text-sm md:text-base' onChange={(e) => filterCategory(e.target.checked, category._id)}>{category.name}</Checkbox>
                                                </Form.Item>
                                            ))}
                                        </div>
                                    </div>
                                    <button onClick={resetFilters} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Reset filter</button>
                                </Form>
                            </div>
                            <div className='flex flex-wrap justify-center items-center m-2'>
                                {products.slice(0, offset).map((product) => (
                                    <div className="max-w-xs rounded overflow-hidden shadow-lg m-2" key={product._id}>
                                        <img className="w-60 h-60" src={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`} alt="Product photo" />
                                        <div className="px-6 py-4">
                                            <h4 className="font-bold text-xl mb-2">{product.name.substring(0, 30)}</h4>
                                            <p className="text-gray-700 text-sm md:text-base">
                                                {product.description.substring(0, 30)}...
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2">{parseFloat(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</span>
                                        </div>
                                        <div className="px-6 pt-4 pb-2 flex justify-between">
                                            <button onClick={() => navigate(`/product/${product.slug}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded text-xs md:text-base">More details</button>
                                            <button onClick={() => { setCart([...cart, product]); toast.success('Product added to cart successfully'); localStorage.setItem('cart', JSON.stringify([...cart, product])) }} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-1 rounded text-xs md:text-base">Add to cart</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}