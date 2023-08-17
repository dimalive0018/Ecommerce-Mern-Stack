import React from 'react';
import LogoImage from './Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import toast from 'react-hot-toast';
import CategoriesMenu from './Categories';
import CartBadge from './Cart';
import { useSearch } from '../../context/Search';
import api from '../../api';
import { Navbar } from 'flowbite-react';
import 'flowbite';
import 'flowbite-react';

export default function Header() {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [values, setValues] = useSearch();
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
    const signout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        });
        localStorage.removeItem('auth');
        toast.success('Sign out completed');
        setTimeout(() => {
            navigate('/sign');
        }, 500);
    }
    return (
        <Navbar
            fluid
            rounded
            className='bg-[#FFFAFA]'
        >
            <LogoImage />
            <Navbar.Toggle />
            <Navbar.Collapse>
                <ul className="flex flex-col items-center justify-center p-1 md:p-0 font-medium border border-gray-100 rounded-lg md:flex-row md:mt-0 md:border-0 md:bg-[#FFFAFA] dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li className='m-3 w-full md:h-0 md:w-0'>
                        <div className="relative mt-3 w-full md:hidden">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="sr-only">Search</span>
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <form onSubmit={searchProducts}>
                                <input value={values.key} onChange={(e) => setValues({ ...values, key: e.target.value })} type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                            </form>
                        </div>
                    </li>
                    <li className='m-3'>
                        <CategoriesMenu />
                    </li>
                    {
                        !auth.user ? (
                            <>
                                <li className='m-3'>
                                    <NavLink className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' to={'/sign'}>
                                        Sign In
                                    </NavLink>
                                </li>
                            </>
                        ) :
                            auth.user.role === 'admin' ?
                                (
                                    <>
                                        <li className='m-3'>
                                            <NavLink className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' to={'/dashboard/user'}>
                                                User dashboard
                                            </NavLink>
                                        </li>
                                        <li className='m-3'>
                                            <NavLink className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' to={'/dashboard/admin'}>
                                                Admin dashboard
                                            </NavLink>
                                        </li>
                                        <li className='m-3'>
                                            <NavLink className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' onClick={signout}>
                                                Sign Out
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className='m-3'>
                                            <NavLink className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' to={'/dashboard/user'}>
                                                User dashboard
                                            </NavLink>
                                        </li>
                                        <li className='m-3'>
                                            <NavLink className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' onClick={signout}>
                                                Sign Out
                                            </NavLink>
                                        </li>
                                    </>
                                )
                    }
                    <li className='m-3'>
                        <CartBadge />
                    </li>
                    <li className='m-3 max-sm:m-0'>
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="sr-only">Search</span>
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <form onSubmit={searchProducts}>
                                <input value={values.key} onChange={(e) => setValues({ ...values, key: e.target.value })} type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
                            </form>
                        </div>
                    </li>
                </ul>
            </Navbar.Collapse>
        </Navbar>
    )
}