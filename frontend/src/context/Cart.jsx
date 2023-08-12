import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        let cart = localStorage.getItem('cart');
        setCart(JSON.parse(cart));
    }, []);
    useEffect(() => {
        if (!localStorage.getItem('cart')) {
            setCart([]);
        }
    }, []);
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)