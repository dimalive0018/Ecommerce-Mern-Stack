import React from 'react';
import { useSearch } from '../../context/Search';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import 'flowbite';
import 'flowbite-react';
import api from '../../api';

export default function Search() {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const searchProducts = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_PRODUCTS_SEARCH}${values.key}`);
            if (data.status === 404) {
                return toast.error(data.message);
            };
            setValues({ ...values, results: data });
            navigate('/search');
        } catch (error) {
            toast.error(error.message);
            console.error(error.message);
        }
    };
    return (
        <form onSubmit={searchProducts}>
            <div class="relative hidden md:block">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="sr-only">Search</span>
                </div>
                <input value={values.key} onChange={(e) => setValues({ ...values, key: e.target.value })} type="text" id="search-navbar" class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
        </form>
    )
}