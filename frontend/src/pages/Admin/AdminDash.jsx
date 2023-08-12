import React, { useState } from 'react'
import { useAuth } from '../../context/Auth'
import CreateCategory from './CreateCategory';
import CreateProduct from './CreateProduct';
import Products from './Products';
import AdminOrders from './Orders';
import { SeoHelmet } from '../../components/SeoHelmet';

export default function AdminDash() {
    const [auth] = useAuth();
    const [dashType, setDashType] = useState('');
    return (
        <>
            <SeoHelmet title={`N1 - E-commerce - Admin dashboard`} description={`N1 - E-commerce for smartphone, tablet and laptop - Admin dashboard`} />
            <div className='w-full h-screen'>
                <div className='flex flex-col m-5'>
                    <div className='flex flex-col md:flex-row justify-around items-center text-center m-2'>
                        <h4 className='text-lg m-2'>User: {auth?.user?.name} {auth?.user?.surname}</h4>
                        <h4 className='text-lg m-2'>Email: {auth?.user?.email}</h4>
                    </div>
                    <div class="w-full text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white flex flex-col justify-start items-center">
                        <h2 className='text-2xl m-2 border-b border-gray-200 pb-2'>Admin Panel</h2>
                        <div className='flex flex-col md:flex-row justify-around w-full border-t border-gray-200 pt-2'>
                            <button onClick={() => setDashType('Create Category')} className='m-2 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'>
                                Create category
                            </button>
                            <button onClick={() => setDashType('Create Product')} className='m-2 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'>
                                Create product
                            </button>
                            <button onClick={() => setDashType('Products')} className='m-2 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'>
                                Products
                            </button>
                            <button onClick={() => setDashType('Orders')} className='m-2 px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'>
                                Orders
                            </button>
                        </div>
                        {dashType === 'Create Category' && (
                            <CreateCategory />
                        )}
                        {dashType === 'Create Product' && (
                            <CreateProduct />
                        )}
                        {dashType === 'Products' && (
                            <Products />
                        )}
                        {dashType === 'Orders' && (
                            <AdminOrders />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}