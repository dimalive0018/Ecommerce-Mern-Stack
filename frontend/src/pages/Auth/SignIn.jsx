import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import api from '../../api';

export default function SigninForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const submit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post(`${import.meta.env.VITE_APP_API_SIGNIN}`, {
                email,
                password,
            });
            if (data.status === 404) {
                return toast.error(data.message);
            } else if (data.status === 200) {
                toast.success(data.message);
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
                });
                localStorage.setItem('auth', JSON.stringify(data))
                setTimeout(() => {
                    navigate(state || '/');
                }, 2000);
            }
        } catch (error) {
            toast.error(error);
            console.error(error);
        }
    };
    return (
        <form onSubmit={submit} className="w-auto md:w-96 h-auto lg:mt-[15%] bg-[#FFFAFA] rounded shadow-md p-10 flex flex-col justify-center items-center">
            <input
                type="email"
                title="Example@example.com"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value.toLowerCase())}
                name="email"
                placeholder="E-mail"
                className="block box-border mb-3 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
            />
            <input
                type="password"
                title="Password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                placeholder="Password"
                className="block box-border mb-3 py-1 w-full h-8 border-b border-gray-400 font-medium text-sm md:text-base xl:text-lg transition duration-200 ease-in-out"
            />
            <input
                type="submit"
                name="signin_submit"
                value="Sign in"
                className="mt-[1.5rem] w-[7.5rem] h-[2rem] rounded text-sm md:text-base xl:text-lg border-solid border-2 hover:text-[#8BC6EC] active:scale-95 font-medium uppercase transition duration-[100ms] ease-in-out cursor-pointer hover:opacity-[80%] hover:shadow-md active:opacity-[100%] active:shadow-sm"
            />
            <Link className='mt-[1.5rem] w-auto h-auto' to={'/forgotpassword'}><h3 className='font-light text-xs md:text-sm xl:text-base'>Forgot Password</h3></Link>
        </form>
    );
};