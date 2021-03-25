import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faTimes  } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../contexts/Cart';

export default function CartItem(props) {

    const { cartItems, minusCount, plusCount, removeFromCart, updateCount } = useContext(CartContext)

    return (
        <div className="search-form login-form fadeToRight" style={{width: '100%'}}>
            <div className="cart-list">
                {
                    cartItems.length === 0 && 
                    <div style={{textAlign: 'center', color: '#777'}}>
                        Giỏ hàng rỗng...!
                    </div>
                }
                {
                    cartItems.length > 0 && 
                    <div className="cart-item flex" style={{border: 'none'}}>
                        <div className="cart-product-img flex" style={{alignItems: 'center', justifyContent: 'flex-start'}}>Hình</div>
                        <div className="cart-product-mobile flex">
                            <div className="cart-product-name flex-center" style={{alignItems: 'center', justifyContent: 'flex-start'}}>Tên sản phẩm</div>
                            <div className="cart-product-amount flex-center" style={{alignItems: 'center', justifyContent: 'center'}}>Số Lượng</div>
                            <div className="cart-product-price flex" style={{alignItems: 'center', justifyContent: 'center'}}>Đơn giá</div>
                            <div className="cart-product-totalprice flex" style={{alignItems: 'center', justifyContent: 'center'}}>Thành Tiền</div>
                            <div className="cart-product-delete" style={{visibility: "hidden"}}>
                                <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimes}/>
                            </div>
                        </div>
                    </div>
                }
                {
                    cartItems.map((item, index) => {
                        return (
                            <div className="cart-item flex" key={index}>
                                <div className="cart-product-img">
                                    {
                                        item.images &&
                                        <img src={item.images[0].path} width="80px" height="100%" alt=""></img>
                                    }
                                </div>
                                {item.price &&
                                    <div className="cart-product-mobile flex">
                                        <div className="cart-product-name flex" style={{alignItems: 'center', justifyContent: 'flex-start'}}>{item.name}</div>
                                        <div className="cart-product-amount flex-center">
                                            <div className="count-cart noselect">
                                                <div 
                                                    className="count-cart-item left flex-center"
                                                    id={item.productId}
                                                    onClick={minusCount}
                                                    >
                                                    <FontAwesomeIcon  style={{pointerEvents: 'none'}} icon={faMinus}/>
                                                </div> 
                                                <div className="count-cart-item text flex-center">
                                                    <form style={{width: '100%', margin: '0', height: '30px'}}>
                                                        <input 
                                                            style={{width: '100%', margin: '0', height: '30px'}}
                                                            type="text" 
                                                            value={item.count}
                                                            id={item.productId}
                                                            onChange={updateCount}
                                                        />
                                                    </form>
                                                </div>
                                                <div 
                                                    className="count-cart-item right flex-center"
                                                    id={item.productId}
                                                    onClick={plusCount}
                                                    >
                                                    <FontAwesomeIcon  style={{pointerEvents: 'none'}} icon={faPlus}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart-product-price flex" style={{alignItems: 'center', justifyContent: 'center'}}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                                        <div className="cart-product-totalprice flex" style={{alignItems: 'center', justifyContent: 'center'}}>{(item.price * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                                        <div className="cart-product-delete"
                                        onClick={removeFromCart}
                                        id={item.productId}>
                                        <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimes}/>
                                    </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}