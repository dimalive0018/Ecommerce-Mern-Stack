import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SeoHelmet } from '../components/SeoHelmet';

export default function PageNotFound() {
    const navigate = useNavigate();
    return (
        <>
            <SeoHelmet title={'Not found'} />
            <div className='h-screen w-full flex flex-col justify-center items-center bg-gray-100'>
                <div className='max-w-md w-full p-6 bg-white rounded-lg shadow-md text-center'>
                    <h1 className='text-3xl md:text-4xl xl:text-5xl font-bold text-red-600 mb-4'>Page not found</h1>
                    <h2 className='text-xl md:text-2xl xl:text-3xl font-medium text-gray-600 mb-4'>404</h2>
                    <button
                        className='text-base md:text-lg xl:text-xl text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-2.5 text-center m-2'
                        onClick={() => navigate(-1)}
                    >
                        <p className='m-1 font-semibold'>
                            Go Back
                        </p>
                    </button>
                    <button
                        className='text-base md:text-lg xl:text-xl text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg px-5 py-2.5 text-center m-2'
                        onClick={() => navigate('/')}
                    >
                        <p className='m-1 font-semibold'>
                            Go Home
                        </p>
                    </button>
                </div>
            </div>
        </>
    )
}
