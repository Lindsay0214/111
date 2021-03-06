import React, { useState, useEffect, useMemo } from 'react';
import CartItem from 'component/other/cart/CartItem';
import axios from 'commons/axios';
import { formatPrice } from 'commons/helper'; 

const AddCartItem = () => {
    const [carts, setCarts] = useState([]);
    useEffect(() => {
        const user = global.auth.getUser() || {};    //依userid給購物車數據
        axios.get(`/carts?userId=${user.email}`).then(res => setCarts(res.data));
    }, []);

    const totalPrice = useMemo(() => {
        const totalPrice = carts
          .map(cart => cart.mount * parseInt(cart.price))
          .reduce((a, value) => a + value, 0);
        return formatPrice(totalPrice);
      }, [carts]);

    const updateCart = cart => {
        const newCarts = [...carts];
        const _index = newCarts.findIndex(c => c.id === cart.id);
        newCarts.splice(_index, 1, cart);
        setCarts(newCarts);
    };

    const deleteCart = cart => {
        const _carts = carts.filter(c => c.id !== cart.id);
        setCarts(_carts);
    };

    return(
        <div className="cart-page">
            <p className="title has-text-centered">Cart</p>
            <div className="cart-list">
                {
                    carts.map(cart => (
                    <CartItem
                        key={cart.id}
                        cart={cart}
                        updateCart={updateCart}
                        deleteCart={deleteCart}
                        />
                        ))}
            </div>
            <div className="cart-total">
                Total:
                <span className="total-price">{totalPrice}</span>
            </div>
        </div>
    )
    };

export default AddCartItem;

