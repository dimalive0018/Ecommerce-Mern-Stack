import React, { useEffect } from 'react';
import { useCart } from '../../context/Cart';
import { Badge } from 'antd';
import { NavLink } from 'react-router-dom';
import { AiOutlineShopping } from 'react-icons/ai';

export default function CartBadge() {
    const [cart, setCart] = useCart();
    return (
        <div className="bg-[#FFFAFA]">
            <Badge count={cart?.length} showZero>
                <NavLink
                    className="text-sm md:text-base xl:text-lg flex items-center hover:text-blue-300"
                    to={"/cart"}
                >
                    <AiOutlineShopping title="Cart" className="h-7 w-7 active:scale-95" />
                </NavLink>
            </Badge>
        </div>
    );
}
