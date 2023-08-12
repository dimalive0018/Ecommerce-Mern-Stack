import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';
import api from '../../api';
import { Spinner } from '../../components/Spinner';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();
    const [spinner, setSpinner] = useState(false);
    const getOrders = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_GET_ORDERS}`);
            setOrders(data);
        } catch (error) {
            console.error(error.message);
        }
    };
    const deleteOrder = async (id) => {
        try {
            setSpinner(true);
            const { data } = await api.delete(`${import.meta.env.VITE_APP_API_DELETE_ORDER}${id}`);
            setTimeout(() => {
                toast.success('Order deleted successfully');
                setSpinner(false);
                const newOrders = orders.filter(order => order._id !== id);
                setOrders(newOrders);
            }, 500);
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            getOrders();
            setSpinner(false);
        }, 500);
    }, []);
    return (
        <>
            {spinner === true && (
                <Spinner />
            )}
            {spinner === false && (
                <div className='my-5'>
                    <h3 className='text-center text-2xl font-bold mb-4'>Orders</h3>
                    <div>
                        {orders?.map((order, index) => {
                            return (
                                <div className='mb-4' key={index}>
                                    <div className='flex flex-col items-center justify-center'>
                                        <button disabled={order.status !== 'Not processed'} className='m-2 px-4 py-1 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50' onClick={() => deleteOrder(order._id)}>Delete</button>
                                        <p>Id order: {order._id}</p>
                                    </div>
                                    <table className='w-full text-left border-collapse table-auto'>
                                        <thead>
                                            <tr className='bg-gray-100'>
                                                <th className='px-2 py-2 border-b border-gray-200 text-xs md:text-base max-[340px]:hidden'>#</th>
                                                <th className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>Status</th>
                                                <th className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>Data</th>
                                                <th className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>Payment</th>
                                                <th className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>Quantity</th>
                                                <th className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='px-2 py-2 border-b border-gray-200 text-xs md:text-base max-[340px]:hidden'>{index + 1}</td>
                                                <td className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>{order.status}</td>
                                                <td className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>{moment(order.createdAt).fromNow()}</td>
                                                <td className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>{order.payment}</td>
                                                <td className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>{order?.products?.length}</td>
                                                <td className='px-2 py-2 border-b border-gray-200 text-xs md:text-base'>{auth.user.address.substring(0, 100)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='flex flex-wrap mt-4'>
                                        {order.products.map((product, index) => (
                                            <div className='w-full md:w-auto flex items-center p-2' key={index}>
                                                <img
                                                    className='w-10 h-10 rounded-full mr-2'
                                                    src={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`}
                                                    alt='Product photo'
                                                />
                                                <div>
                                                    <h4 className='font-bold text-xs md:text-base'>{product.name}</h4>
                                                    <h5 className='text-xs md:text-base'>{product.description.substring(0, 50)}...</h5>
                                                    <h5 className='text-xs md:text-base'>{parseFloat(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</h5>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}