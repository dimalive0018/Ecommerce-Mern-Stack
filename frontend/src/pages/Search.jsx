import React, { useEffect, useState } from 'react'
import { useSearch } from '../context/Search'
import { useCart } from '../context/Cart';
import { useNavigate } from 'react-router-dom';
import { SeoHelmet } from '../components/SeoHelmet';
import { Spinner } from '../components/Spinner';

export default function () {
    const [value, setValue] = useSearch();
    const [cart, setCart] = useCart();
    const [spinner, setSpinner] = useState(false);
    const navigate = useNavigate();
    const [offset, setOffset] = useState(6);
    const handleScroll = (e) => {
        if (
            window.innerHeight + e.target.documentElement.scrollTop + 1 >=
            e.target.documentElement.scrollHeight
        ) {
            setOffset((prevOffset) => prevOffset + 6);
        }
    };
    useEffect(() => {
        setSpinner(true);
        setTimeout(() => {
            setSpinner(false);
        }, 500);
        setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
        }, 2000);
    }, [])
    return (
        <>
            <SeoHelmet title={`N1 - E-commerce - Search ${value?.results?.length}`} description={`N1 - E-commerce for smartphone, tablet and laptop - Search results of ${value?.results?.length}`} />
            <div className="flex flex-col items-center p-5">
                <h2 className="text-4xl font-bold mb-5">Search results</h2>
                <h3 className="text-2xl font-semibold mb-10">{value?.results?.length < 1 ? 'Results not found' : `${value?.results?.length} results found`}</h3>
                {spinner === true && (
                    <Spinner />
                )}
                {spinner === false && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
                        {value.results.slice(0, offset).map((product) => (
                            <div className="bg-white rounded-lg shadow-md p-4 m-5" key={product._id}>
                                <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                                <img className="rounded-md mb-2 w-60 h-60" src={`${import.meta.env.VITE_APP_API_PHOTO}${product._id}`} alt='Product photo'></img>
                                <p className="text-gray-700 mb-2">{product.description.substring(0, 25)}...</p>
                                <p className="text-gray-700 mb-2">Price: {parseFloat(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'EUR' })}</p>
                                <div className="flex justify-between">
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded max-[340px]:text-xs" onClick={() => navigate(`/product/${product.slug}`)}>Dettagli</button>
                                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded max-[340px]:text-xs" onClick={() => { setCart([...cart, product]); toast.success('Prodotto aggiunto al carrello con successo'); localStorage.setItem('cart', JSON.stringify([...cart, product])) }}>Aggiungi al carrello</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}