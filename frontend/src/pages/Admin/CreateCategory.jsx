import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Modal } from 'antd';
import api from '../../api';
import { Spinner } from '../../components/Spinner';

export default function CreateCategory() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [idUpdate, setIdUpdate] = useState(null);
    const [update, setUpdate] = useState("");
    const [spinner, setSpinner] = useState(false);
    const createNewCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`${import.meta.env.VITE_APP_API_CREATE_CATEGORY}`, { name });
            if (data.status === 409) {
                return toast.error(data.message);
            };
            if (data.status === 201) {
                toast.success(`${name} ${data.message}`);
                setSpinner(true);
                setTimeout(() => {
                    allCategories();
                    setSpinner(false);
                }, 500);
            };
            if (data.message === 422) {
                return toast.error(data.message);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.put(
                `${import.meta.env.VITE_APP_API_UPDATE_CATEGORY}${idUpdate}`,
                { name: update }
            );
            if (data.status === 200) {
                setIdUpdate("");
                setUpdate("");
                allCategories();
                setConfirmLoading(true);
                setTimeout(() => {
                    setOpen(false);
                    setConfirmLoading(false);
                    toast.success(`${update} ${data.message}`);
                }, 1000);
            };
            if (data.status === 422) {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    const deleteCategory = async (id) => {
        try {
            const { data } = await api.delete(`${import.meta.env.VITE_APP_API_DELETE_CATEGORY}${id}`)
            if (data.status === 200) {
                toast.success(`${data.category.name} ${data.message}`);
                setSpinner(true);
                setTimeout(() => {
                    allCategories();
                    setSpinner(false);
                }, 500);
            };
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
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
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const editButton = (c) => {
        showModal();
        setUpdate(c.name);
        setIdUpdate(c._id);
    };
    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            allCategories();
            setSpinner(false);
        }, 500);
    }, []);
    return (
        <>
            {spinner === true && (
                <Spinner />
            )}
            {spinner === false && (
                <div className='bg-white w-full md:w-[50%] h-auto my-5'>
                    <h3 className='text-center text-2xl font-bold mt-5 mb-4'>Categories</h3>
                    <form onSubmit={createNewCategory}>
                        <div className='flex flex-col justify-center items-center mb-5'>
                            <input className='m-1 text-center border border-gray-200 rounded-lg p-2' type='text' placeholder='New Category' value={name} onChange={(e) => setName(e.target.value)} />
                            <button className='px-4 py-2 m-1 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'>Create</button>
                        </div>
                    </form>
                    <div className='w-full overflow-x-auto'>
                        <table className='table-auto border-collapse w-full'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='px-4 py-2'>Name</th>
                                    <th className='px-4 py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id}>
                                        <td className='border px-4 py-2 text-center'>
                                            {category.name}
                                        </td>
                                        <td className='border px-4 py-2 text-center'>
                                            <button className='m-2 px-4 py-1 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50' onClick={() => editButton(category)}>Edit</button>
                                            <button className='m-2 px-4 py-1 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50' onClick={() => deleteCategory(category._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        title="Change the category name"
                        open={open}
                        onOk={updateCategory}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        okButtonProps={{
                            style: {
                                backgroundColor: '#1890ff',
                                borderColor: '#1890ff',
                                color: 'white',
                                boxShadow: '0 2px 0 rgba(0, 0, 0, 0.045)',
                                ':hover': {
                                    backgroundColor: '#40a9ff',
                                    borderColor: '#40a9ff',
                                },
                            },
                        }}
                        cancelButtonProps={{
                            style: {
                                color: '#1890ff',
                                ':hover': {
                                    color: '#40a9ff',
                                },
                            },
                        }}
                    >
                        <form onSubmit={updateCategory}>
                            <div className='flex flex-col justify-center items-center m-5'>
                                <input className='m-5 text-center border border-gray-200 rounded-lg p-2' type='text' value={update} onChange={(e) => setUpdate(e.target.value)} />
                            </div>
                        </form>
                    </Modal>
                </div>
            )}
        </>
    )
}