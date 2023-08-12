import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Select } from 'antd';
import toast from 'react-hot-toast';
import api from '../../api';
import { Spinner } from '../../components/Spinner';

export default function AdminOrders() {
    const [status] = useState(['Not processed', 'Processing', 'Shipped', 'Delivered']);
    const [orders, setOrders] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const getOrders = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_ALL_ORDERS}`);
            setOrders(data);
        } catch (error) {
            console.error(error.message);
        }
    };
    const handleStatus = async (id, value) => {
        try {
            const response = await api.put(
                `${import.meta.env.VITE_APP_API_CHANGE_STATUS}${id}`,
                { status: value }
            );
            getOrders();
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
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
                <div className="flex flex-col items-center my-5">
                    <h3 className="text-center text-2xl font-bold mt-5 mb-4">User Orders</h3>
                    <div className="w-full overflow-x-auto">
                        {orders?.map((order, index) => {
                            return (
                                <div className="mb-8" key={index}>
                                    <table className="w-full text-left border-collapse table-auto">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-3 font-bold uppercase text-xs md:text-base text-gray-600 border-b border-gray-200 max-[340px]:hidden">#</th>
                                                <th className="py-2 px-3 font-bold uppercase text-xs md:text-base text-gray-600 border-b border-gray-200">User</th>
                                                <th className="py-2 px-3 font-bold uppercase text-xs md:text-base text-gray-600 border-b border-gray-200 max-md:hidden">User id</th>
                                                <th className="py-2 px-3 font-bold uppercase text-xs md:text-base text-gray-600 border-b border-gray-200 max-md:hidden">Address</th>
                                                <th className="py-2 px-3 font-bold uppercase text-xs md:text-base text-gray-600 border-b border-gray-200">Status</th>
                                                <th className="py-2 px-3 font-bold uppercase text-xs md:text-base text-gray-600 border-b border-gray-200 max-md:hidden">Data</th>
                                                <th className="py-2 px-3 font-bold uppercase text-xs md:text-base text-gray-600 border-b border-gray-200">Payment</th>
                                                <th className="py-2 px-3 font-bold uppercase text-xs md:text-base text-gray-600 border-b border-gray-200 max-[340px]:hidden">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="py-2 px-3 border-b border-gray-200 text-xs md:text-base max-[340px]:hidden">{index + 1}</td>
                                                <td className="py-2 px-3 border-b border-gray-200 text-xs md:text-base">{order.user[0].name} {order.user[0].surname}</td>
                                                <td className="py-2 px-3 border-b border-gray-200 text-xs md:text-base max-md:hidden">{order.user[0]._id}</td>
                                                <td className="py-2 px-3 border-b border-gray-200 text-xs md:text-base max-md:hidden">{order.address}</td>
                                                <td className="py-2 px-3 border-b border-gray-200 text-xs md:text-base">
                                                    <Select bordered={false} onChange={(value) => handleStatus(order._id, value)} defaultValue={order.status}>
                                                        {status.map((s, i) => (
                                                            <Option key={i} value={s}>{s}</Option>
                                                        ))}
                                                    </Select>
                                                </td>
                                                <td className="py-2 px-3 border-b border-gray-200 text-xs md:text-base max-md:hidden">{moment(order.createdAt).fromNow()}</td>
                                                <td className="py-2 px-3 border-b border-gray-200 text-xs md:text-base">{order.payment}</td>
                                                <td className="py-2 px-3 border-b border-gray-200 text-xs md:text-base max-[340px]:hidden">{order?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="flex flex-wrap mt-4 items-center justify-center">
                                        {order.products.map((product, index) => (
                                            <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={index}>
                                                <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col items-center">
                                                    <img
                                                        className="w-20 h-20 object-cover rounded-full mb-4"
                                                        src={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`}
                                                        alt="Product photo"
                                                    />
                                                    <h4 className="text-xs md:text-base font-semibold text-center mb-2">{product.name}</h4>
                                                    <p className="text-xs md:text-base text-gray-600 text-center mb-2">{product.description.substring(0, 25)}...</p>
                                                    <p className="text-xs md:text-base font-bold text-center">{parseFloat(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
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