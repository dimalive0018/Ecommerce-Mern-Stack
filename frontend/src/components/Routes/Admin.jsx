import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/Auth'
import NotAuthorized from '../../pages/NotAuthorized';
import { Outlet } from 'react-router-dom';
import api from '../../api';

export default function PrivateRouteAdmin() {
    const [auth, setAuth] = useAuth();
    const [authOk, setAuthOk] = useState(false);

    useEffect(() => {
        const checkingAuth = async () => {
            const { data } = await api.get(`${import.meta.env.VITE_APP_API_CHECK_ADMIN}`)
            if (data.status === 200) {
                setAuthOk(true)
            } else {
                setAuthOk(false)
            }
        }
        if (auth?.token) checkingAuth()
    }, [auth?.token])
    return authOk ? <Outlet /> : <NotAuthorized />
}