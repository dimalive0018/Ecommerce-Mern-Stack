import React from 'react'

export const Spinner = () => {
    return (
        <div className='flex justify-center items-center h-10 md:h-20 xl:h-24 m-10 md:m-12 xl:m-14'>
            <div
                className="inline-block h-8 w-8 md:h-12 md:w-12 xl:h-16 xl:w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-black align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
            </div>
        </div>
    )
}