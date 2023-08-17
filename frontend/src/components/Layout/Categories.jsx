import React from 'react'
import useCategory from '../../hooks/Categories';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'flowbite-react';


export default function CategoriesMenu() {
    const categories = useCategory();
    return (
        <Dropdown
            label="Categories"
        >
            {categories.map((category, index) => (
                <li key={index}>
                    <NavLink to={`/categories/${category.slug}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{category.name}</NavLink>
                </li>
            ))}
        </Dropdown>
    )
}