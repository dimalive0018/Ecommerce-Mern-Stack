import React, { useState } from 'react'
import SigninForm from './Auth/SignIn';
import SignupForm from './Auth/SignUp';
import { SeoHelmet } from '../components/SeoHelmet';

export default function Sign() {
    const [sign, setSign] = useState('in');
    return (
        <>
            <SeoHelmet title={`N1 - E-commerce - Sign in`} description={`N1 - E-commerce for smartphone, tablet and laptop - Sign in`} />
            <div className='h-screen w-full flex flex-col items-center justify-center'>
                <div className='flex mb-4'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => setSign('in')}>SignIn</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSign('up')}>SignUp</button>
                </div>
                <div>
                    {
                        sign === 'in' &&
                        (
                            <SigninForm />
                        )
                    }
                    {
                        sign === 'up' &&
                        (
                            <SignupForm />
                        )
                    }
                </div>
            </div>
        </>
    )
}