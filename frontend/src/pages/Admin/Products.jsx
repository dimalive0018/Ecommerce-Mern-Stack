import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { Select } from 'antd';
import api from '../../api';
import { Spinner } from '../../components/Spinner';

const { Option } = Select;

export default function Products() {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState('');
    const [open, setOpen] = useState(false);
    const [slug, setSlug] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [photo, setPhoto] = useState('');
    const [idUp, setIdUp] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [offset, setOffset] = useState(8);
    const allProducts = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_PRODUCTS}`);
            if (data.status === 404) {
                return toast.error(data.message);
            };
            if (data.status === 200) {
                setProducts(data.products);
                setTotalProducts(data.totalProducts);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const product = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_GET_PRODUCT}${slug}`);
            const dataProduct = data.product;
            setName(dataProduct?.name);
            setDescription(dataProduct?.description);
            setPrice(dataProduct?.price);
            setCategory(dataProduct?.category._id);
            setIdUp(dataProduct?._id);
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const allCategories = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_GET_CATEGORIES}`);
            if (data.status === 200) {
                setCategories(data.categories);
            };
            if (data.status === 404) {
                toast.error(data.message);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const deleteProduct = async (e, id, name) => {
        e.preventDefault();
        try {
            const { data } = await api.delete(`${import.meta.env.VITE_APP_API_DELETE_PRODUCT}${id}`)
            if (data.status === 200) {
                toast.success(`${name} ${data.message}`);
                setSpinner(true);
                setTimeout(() => {
                    allProducts();
                    setSpinner(false);
                }, 1000);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const product = new FormData();
            const productData = { name, description, price, category };
            for (const [key, value] of Object.entries(productData)) {
                product.append(key, value);
            };
            if (photo instanceof File) {
                product.append('photo', photo);
            }
            const { data } = await api.put(`${import.meta.env.VITE_APP_API_UPDATE_PRODUCT}${idUp}`, product);
            if (data.status === 201) {
                allProducts();
                setOpen(false);
                toast.success(`${data.product.name} ${data.message}`);
            };
            if (data.status === 422) {
                toast.error(data.message);
            };
            if (data.status === 400) {
                toast.error(data.message);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const editButton = async (productSlug) => {
        setSlug(productSlug);
        if (slug.length > 0) {
            setOpen(true);
        };
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
            allProducts();
            setSpinner(false);
        }, 1000);
        setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
        }, 1500);
    }, []);
    useEffect(() => {
        allCategories();
        product();
    }, [slug]);
    return (
        <>
            {spinner === true && (
                <Spinner />
            )}
            {spinner === false && (
                <div className='bg-white w-full md:w-1/2 h-auto my-5'>
                    <h3 className='text-center text-2xl font-bold mt-5 mb-4'>Total products: {totalProducts}</h3>
                    <div className='w-full overflow-x-auto'>
                        <table className='table-auto border-collapse w-full'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='px-4 py-2'>Product Name</th>
                                    <th className='px-4 py-2 max-md:hidden'>Category</th>
                                    <th className='px-4 py-2 max-md:hidden'>Image</th>
                                    <th className='px-4 py-2'>Price</th>
                                    <th className='px-4 py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='text-center'>
                                {products.slice(0, offset).map((product) => (
                                    <tr key={product._id}>
                                        <td className='border px-4 py-2 max-[340px]:text-xs'>
                                            <NavLink to={`/product/${product.slug}`}>
                                                {product.name}
                                            </NavLink>
                                        </td>
                                        <td className='border px-4 py-2 max-md:hidden'>{product?.category?.name}</td>
                                        <td className='border px-4 py-2 max-md:hidden'>
                                            <img
                                                className='w-20 h-20 object-cover rounded-full m-auto'
                                                src={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`}
                                                alt='Product photo'
                                            />
                                        </td>
                                        <td className='border px-4 py-2 max-[340px]:text-xs'>{parseFloat(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</td>
                                        <td className='border px-4 py-2'>
                                            <button onClick={() => { editButton(product.slug) }} className='m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded'>
                                                Edit
                                            </button>
                                            <button onClick={(e) => deleteProduct(e, product._id, product.name)} className='m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        title="Update Product"
                        open={open}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="cancel" onClick={handleCancel} cancelButtonProps={{
                                style: {
                                    color: '#1890ff',
                                },
                                ':hover': {
                                    color: '#40a9ff',
                                },
                            }}>
                                Annulla
                            </Button>,
                        ]}
                    >
                        <div className='w-[50%] h-auto mt-5 p-5 rounded-lg text-center flex items-center justify-center m-auto'>
                            <div className='flex flex-col space-y-4'>
                                <Select
                                    className='border border-gray-300 rounded-md'
                                    placeholder="Select a category"
                                    size='large'
                                    onChange={(value) => setCategory(value)}
                                    value={category}
                                >
                                    {categories.map(c => (
                                        <Option key={c._id} value={c._id}>{c.name}</Option>
                                    ))}
                                </Select>
                                <div className='flex items-center space-x-2'>
                                    <label className='bg-gray-100 px-4 py-2 rounded-md cursor-pointer'>
                                        {photo ? photo.name : 'Upload photo'}
                                        <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                    </label>
                                    {photo && (
                                        <img className='w-16 h-16 object-cover rounded-md' src={URL.createObjectURL(photo)} alt='Product photo' />
                                    )}
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    <input className='border border-gray-300 rounded-md px-4 py-2' type='text' value={name} required placeholder='Product name' onChange={(e) => setName(e.target.value)} />
                                    <textarea className='border border-gray-300 rounded-md px-4 py-2' type='text' value={description} required placeholder='Product description' onChange={(e) => setDescription(e.target.value)} />
                                    <input className='border border-gray-300 rounded-md px-4 py-2' type='number' value={price} required placeholder='Product price' onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md' onClick={updateProduct}>Update Product</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}
        </>
    )
}