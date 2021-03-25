import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {API_URL} from '../config/apiConfig';
export const CartContext = React.createContext();

export function CartProvider(props) {
    
    const [cartItems, setCartItems] = useState([])
    const [wishListItems, setWishListItems] = useState([])
    const [clickedCart, setClickedCart] = useState(0)
    const [total, setTotal] = useState(0)
    const [openCartUser,setOpenCartUser] = useState(false);
    const [cartId,setCartId]= useState();

    const isExists = (cartItems = [], item = {}) => {
        for (let cartItem of cartItems) {
            if (cartItem.productId === item.productId) {
                return cartItem;
            }
        }
        return false;
    }
    useEffect(()=>{
        if (localStorage.getItem('cart')) {
            setCartItems(JSON.parse(localStorage.getItem('cart')));
        }
        if (localStorage.getItem('wishlist')) {
            setWishListItems(JSON.parse(localStorage.getItem('wishlist')));
        }
        if (localStorage.getItem('cartId')) {
            setCartId(localStorage.getItem('cartId'));
        }
        setTotal(JSON.parse(localStorage.getItem('total')))
    }, [])
    
    const addToWishList = (product = {}) => {
        
        const virtualCart = [...wishListItems] 

        if (wishListItems.length === 0) {
            virtualCart.push({...product})
        } else {
            if (!isExists(wishListItems, product)) {
                virtualCart.push({...product})
            }
        }
        localStorage.setItem('wishlist', JSON.stringify(virtualCart))
        setWishListItems(virtualCart)
    }

//user cart 
    
    const addCartUser =  (item,count)=>{
        if (openCartUser) {
            let cart = {
                productId:item.productId,
                quantity:count,
                price:item.price
            }   
            axios.post(`${API_URL}/api/cart`,{
                cartTemp: [cart]
            },{
                headers: {"authorization" : `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res =>{
                setCartId(res.data.data.listCartId);
            })

        }
    }

    const addToCart = (product = {}, count) => {
        if (count) {
            setClickedCart(clickedCart + count) // scroll on click to cart
            const virtualCart = [...cartItems]
            if (cartItems.length === 0) {
                virtualCart.push({...product, count: count});
            } else {
                if (!isExists(cartItems, product)) {
                    virtualCart.push({...product, count: count});
                } else {
                    for (let i = 0; i < virtualCart.length; i++) {
                        if (virtualCart[i].productId === product.productId) {
                            virtualCart[i].count += count
                            break
                        }
                    }
                }
            }
            setCartItems(virtualCart);
            localStorage.setItem('cart', JSON.stringify(virtualCart))
            getTotal(virtualCart);
        } else {
            setClickedCart(clickedCart + 1) // scroll on click to cart
            const virtualCart = [...cartItems] 
            if (cartItems.length === 0) {
                virtualCart.push({...product, count: 1})
            } else {
                if (!isExists(cartItems, product)) {
                    virtualCart.push({...product, count: 1})
                } else {
                    for (let i = 0; i < virtualCart.length; i++) {
                        if (virtualCart[i]._id === product.productId) {
                            virtualCart[i].count += 1
                            break
                        }
                    }
                }
            }
            localStorage.setItem('cart', JSON.stringify(virtualCart))
            setCartItems(virtualCart)
            getTotal(virtualCart)
        }
        addCartUser(product,count);
    }

    const removeFromCart = async (event) => {
        const id = event.target.id
        const virtualCart = [...cartItems]
        for (let i=0;i<virtualCart.length;i++) {
            if (virtualCart[i].productId === id) {
                virtualCart.splice(i, 1);
                if (openCartUser) {
                    await axios({
                        url:`${API_URL}/api/cart/item`,
                        method:'DELETE',
                        headers:{
                            "authorization" : `Bearer ${localStorage.getItem('token')}`
                        },
                        data:{
                            productId:id,
                            cartId: cartId
                        }
                    })
                }
            }
        }
        localStorage.setItem('cart', JSON.stringify(virtualCart))
        setCartItems(virtualCart)
        getTotal(virtualCart)
    }

    const removeFromWishList = (event) => {
        const id = event.target.id
        const virtualCart = [...wishListItems]
        for (let i=0;i<virtualCart.length;i++) {
            if (virtualCart[i]._id === id) {
                virtualCart.splice(i, 1)
            }
        }
        localStorage.setItem('wishlist', JSON.stringify(virtualCart))
        setWishListItems(virtualCart)
    }

    const minusCount = (event) => {
        const id = event.target.id
        const virtualCart = [...cartItems]
        for (let i=0;i<virtualCart.length;i++) {
            if (virtualCart[i].productId === id) {
                let count = virtualCart[i].count - 1;
                virtualCart[i].count = (count>0)?count:1;
                addCartUser(virtualCart[i],-1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(virtualCart))
        setCartItems(virtualCart)
        getTotal(virtualCart)
    }
    const plusCount = (event) => {
        const id = event.target.id
        const virtualCart = [...cartItems]
        for (let i=0;i<virtualCart.length;i++) {
            if (virtualCart[i].productId === id) {
                virtualCart[i].count += 1;
                addCartUser(virtualCart[i],1);
            }
        }
        localStorage.setItem('cart', JSON.stringify(virtualCart))
        setCartItems(virtualCart)
        getTotal(virtualCart)
    }

    const updateCount = (event) => {
        const id = event.target.id
        const value = event.target.value
        const virtualCart = [...cartItems]
        for (let i=0;i<virtualCart.length;i++) {
            if (virtualCart[i].productId === id) {
                let count = virtualCart[i].count;
                virtualCart[i].count = Number(value);
                addCartUser(virtualCart[i],virtualCart[i].count-count)
            }
        }
        localStorage.setItem('cart', JSON.stringify(virtualCart))
        setCartItems(virtualCart)
        getTotal(virtualCart)
    }

    const getTotal = (arr) => {
        let virtualTotal = 0
        for (let i in arr) {
            virtualTotal += arr[i].count * arr[i].price
        }
        localStorage.setItem('total', JSON.stringify(virtualTotal))
        setTotal(virtualTotal)
    }
    
    return (
        <CartContext.Provider
            value={{
                getTotal:getTotal,
                cartItems: cartItems,
                setCartItems:setCartItems,
                addToCart: addToCart,
                wishListItems: wishListItems,
                addToWishList: addToWishList,
                clickedCart: clickedCart,
                removeFromCart: removeFromCart,
                plusCount: plusCount,
                minusCount: minusCount,
                removeFromWishList: removeFromWishList,
                updateCount: updateCount,
                total: total,
                setOpenCartUser:setOpenCartUser,
                openCartUser:openCartUser,
                setCartId:setCartId,
                cartId:cartId
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}