import React, { useEffect } from "react";
import { useContext, createContext, useState } from "react";
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        let existingCart = localStorage.getItem('cart')
        if (existingCart) { setCart(JSON.parse(existingCart)) }
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}
//custom Hook
const useCart = () => useContext(CartContext)
export { useCart, CartProvider }