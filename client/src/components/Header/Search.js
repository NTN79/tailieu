import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faCheckCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { CartContext } from '../../contexts/Cart';
import {API_URL} from '../../config/apiConfig';

export default function Search(props) {  

    const [products, setProducts] = useState([])
    const [constProducts, setConstProducts] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [toast, setToast] = useState(false)

    useEffect(()=> {
        axios.get(`${API_URL}/api/product`)
            .then(res => {
                setConstProducts(res.data.data)
            }
        )
    }, [])

    useEffect(()=>{
        setProducts(
            constProducts.filter(product=>{
                return (product.name.toLowerCase().includes(searchInput.toLocaleLowerCase()))
            })
        )
    },[searchInput,constProducts])

    const { removeFromWishList, addToCart } = useContext(CartContext)

    const cartClick = (event) => {
        const id = event.target.id
        axios.get(`${API_URL}/api/product/${id}`)
            .then(res => {
                addToCart(res.data.data);
            }
        )
        setToast(true)
        setTimeout(()=>{
            setToast(false)
        }, 2000)
    }

    return(
        <div className={props.searchOpen === false ? 'Search displayNone' : 'Search'}>
            <div className={toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                Sản phẩm được thêm vào giỏ hàng!
            </div>
            <div className="search-header flex">
                <div className="search-title">Tìm kiếm</div>
                <div
                    className="search-close"
                    onClick={props.clickToClose}
                    >
                    <FontAwesomeIcon 
                        icon={faTimes}
                        className="icon"
                        />
                </div>
            </div>
            <div className={props.searchOpen === false ? '' : 'fadeIn'}> 
                <div className="search-form">
                    <form className="flex">
                        <FontAwesomeIcon icon={faSearch} className="icon"/>
                        <input 
                            placeholder="Search" 
                            onChange={e=>{setSearchInput(e.target.value)}}
                            value={searchInput}
                        />
                        <FontAwesomeIcon icon={faTimes} className="icon"/>
                    </form>
                </div>
                { (products.length > 0 && searchInput !== "") && 
                    products.map((item, index) => {
                        return (
                            <div className="cart-item flex" key={index}>
                                <div className="cart-product-img">
                                    <img src={item.images[0].path} width="80px" height="100%" alt=""></img>
                                </div>
                                <div className="cart-product-mobile flex">
                                    <div className="cart-product-name flex" style={{alignItems: 'center', justifyContent: 'flex-start'}}>{item.name}</div>
                                    <div className="cart-product-price wl-mb-price flex" style={{alignItems: 'center', justifyContent: 'flex-start'}}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                                    
                                    <div className="product-info-addtocart wl-mb-addtocart flex-center btn"
                                        onClick={(event)=> {
                                            cartClick(event)
                                            removeFromWishList(event)
                                        }}
                                        id={item._id}
                                    >
                                        <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faCartPlus}/>
                                        <p style={{pointerEvents: 'none'}}>Thêm vào giỏ</p>
                                    </div> 
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    ) 
}
