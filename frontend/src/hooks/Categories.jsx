import { useEffect, useState } from 'react';
import api from '../api';

export default function useCategory() {
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_GET_CATEGORIES}`);
            if (data.status === 404) {
                return console.error(data.message);
            };
            if (data.status === 200) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        getCategories();
    }, [])
    return categories;
}