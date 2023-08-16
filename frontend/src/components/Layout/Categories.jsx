import React from 'react'
import useCategory from '../../hooks/Categories';
import 'flowbite';
import 'flowbite-react';
import { NavLink } from 'react-router-dom';

export default function CategoriesMenu() {
    const categories = useCategory();
    return (
        <div className='bg-[#FFFAFA] flex flex-col items-center text-center'>
            <button id="dropdownDelayButton" data-dropdown-toggle="dropdownDelay" data-dropdown-delay="500" data-dropdown-trigger="hover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 h-8" type="button">
                Categories
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
            </button>
            <div id="dropdownDelay" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDelayButton">
                    {categories.map((category) => (
                        <li key={category._id}>
                            <NavLink to={`/categories/${category.slug}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{category.name}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
