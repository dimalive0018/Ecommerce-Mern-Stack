import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Select } from 'antd';
import api from '../../api';
import { Spinner } from '../../components/Spinner';
const { Option } = Select;

export default function CreateProduct() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('');
    const [spinner, setSpinner] = useState(false);
    const allCategories = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_GET_CATEGORIES}`);
            if (data.status === 200) {
                return setCategories(data.categories);
            };
            if (data.status === 404) {
                return toast.error(data.message);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    useEffect(() => {
        allCategories();
    }, []);
    const createProduct = async (e) => {
        e.preventDefault();
        try {
            const product = new FormData();
            const productData = { name, description, price, category, photo };
            for (const [key, value] of Object.entries(productData)) {
                product.append(key, value);
            };
            const { data } = await api.post(`${import.meta.env.VITE_APP_API_CREATE_PRODUCT}`, product);
            setSpinner(true);
            setTimeout(() => {
                if (data.status === 201) {
                    toast.success(`${data.product.name} ${data.message}`);
                    setName('');
                    setDescription('');
                    setPrice('');
                    setPhoto('');
                };
                setSpinner(false);
            }, 500);
            if (data.status === 422) {
                return toast.error(data.message);
            };
            if (data.status === 400) {
                return toast.error(data.message);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    }
    return (
        <>
            {spinner === true && (
                <Spinner />
            )}
            {spinner === false && (
                <div className='bg-white w-full md:w-[50%] h-auto my-5'>
                    <h3 className='text-center text-2xl font-bold mt-5 mb-4'>Create Product</h3>
                    <div className='flex flex-col items-center w-full'>
                        <Select
                            placeholder="Select a category"
                            size='large'
                            onChange={(value) => setCategory(value)}
                            className='w-4/5 md:w-[50%] mb-4'
                        >
                            {categories.map(c => (
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}
                        </Select>
                        <div className='mb-4'>
                            <label className='px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 cursor-pointer'>
                                {photo ? photo.name : 'Upload photo'}
                                <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                            </label>
                        </div>
                        <div className='mb-4'>
                            {photo && (
                                <div>
                                    <img src={URL.createObjectURL(photo)} alt='product photo' className='rounded-lg h-[200px] object-cover' />
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col items-center mb-4 w-full'>
                            <input type='text' value={name} required placeholder='Product name' onChange={(e) => setName(e.target.value)} className='w-4/5 mb-2 p-2 border border-gray-200 rounded-lg' />
                            <textarea type='text' value={description} required placeholder='Product description' onChange={(e) => setDescription(e.target.value)} className='w-4/5 mb-2 p-2 border border-gray-200 rounded-lg' />
                            <input type='number' value={price} required placeholder='Product price' onChange={(e) => setPrice(e.target.value)} className='w-4/5 mb-2 p-2 border border-gray-200 rounded-lg' />
                        </div>
                        <button onClick={createProduct} className='px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'>Create Product</button>
                    </div>
                </div>
            )}
        </>
    )
}