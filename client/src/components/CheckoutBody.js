import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/User';
import {CartContext} from '../contexts/Cart';
import '../Styles/BannerV4.css';
import axios from 'axios';
import {API_URL} from '../config/apiConfig';
import {
    withRouter
} from 'react-router-dom';


function CheckoutBody(props) {
    
    const [tinh, setTinh] = useState([])
    const [huyen, setHuyen] = useState([])
    const { 
        userInfo
    } = useContext(UserContext);
    const { cartId } = useContext(CartContext)
    const [nameInput, setNameInput] = useState("")
    const [_id, set_Id] = useState("")
    const [userAvt, setUserAvt] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [phoneInput, setPhoneInput] = useState("")
    const [provinceId, setProvinceId] = useState("")
    const [userTinh, setUserTinh] = useState(null)
    const [userHuyen, setUserHuyen] = useState(null)
    const [addressInput, setAddressInput] = useState(null)
    const [cartList, setCartList] = useState([])
    const subTotal = localStorage.getItem('total');
    const [shipping, setShipping] = useState(0)
    const [confirm, setConfirm] = useState(false)
    const [orderPaymentMethod, setOrderPaymentMethod] = useState("")
    const [orderAddressConfirm, setOrderAddressConfirm] = useState("")
   

    useEffect(()=>{
        if (userInfo) {
            setUserAvt(userInfo.avatar)
            set_Id(userInfo.userId)
            setNameInput(`${userInfo.fistName} ${userInfo.lastName}`)
            setEmailInput(userInfo.email)
            setPhoneInput(userInfo.phone)
            setAddressInput(userInfo.address)
            if (userInfo.province !== "") {
                axios.get(`${API_URL}/api/vietnam`)
                    .then(res => {
                        setTinh(res.data.provinces)
                        setHuyen(res.data.districts)
                        res.data.provinces.filter((item) => {
                            if (userInfo.province === item.name) {
                               setProvinceId(item.id)
                            }
                            return null
                        })
                    }
                )  
                setUserTinh(userInfo.province)
            } else {
                axios.get(`${API_URL}/api/vietnam`)
                    .then(res => {
                        setTinh(res.data.provinces)
                        setHuyen(res.data.districts)
                    }
                )   
            }
            if (userInfo.district !== "") {
                setUserHuyen(userInfo.district)
            }
        }
        setCartList((JSON.parse(localStorage.getItem('cart'))));
    },[userInfo])  

    const [methodPayment, setMethodPayMent] = useState(0)

   


    const placeAnOrder = () => {
        if (userHuyen===undefined||phoneInput==null){
            alert("vui lòng chọn nhập đủ thông tin!");
            return;
        }else{
            let addressStr = addressInput + ', ' + userTinh + ', ' + userHuyen 
            const data = {
                status:1,
                payment:methodPayment,
                note:addressStr,
                shipping:(Number(shipping)===0?"FREE SHIP":"FAST SHIPPING")
            }
            setOrderPaymentMethod((methodPayment)?"Thanh toán chuyển khoản.":"Thanh toán tiền mặt.")
            setOrderAddressConfirm(addressStr);
            axios.patch(`${API_URL}/api/cart/${cartId}`,data,{ 
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                 }
            })
            .then(res=>{
                setConfirm(true);
            })
        }
    }

    return(
        <div className="CheckoutBody">
            {
                confirm &&
                <div className="billing-detail confirmPage">
                    <p style={{fontSize: '18px', color: 'green', marginBottom: '30px'}}>Cảm ơn bạn đã mua sản phẩm.</p> 
                    <div className="billing-detail-title">Thông Tin Đơn Hàng</div>
                    <div> 
                        <div className="billing-detail-list comfirm-list">
                            { cartList &&
                                cartList.map((item, index)=>{
                                    return (
                                        <div 
                                            key={index}
                                            className="billing-detail-item"
                                        >
                                            <div
                                                style={{width: '300px'}}
                                            >
                                                <img src={item.images[0].path} alt="" width="60px" height="60px"></img>
                                            </div>
                                            <div className="billing-detail-mobile">
                                                <div className="billing-detail-name">{item.name}</div>
                                                <div className="billing-detail-count">
                                                    <p>x</p>
                                                    {item.count}
                                                </div>
                                                <div className="billing-detail-price">{(item.price * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                                            </div>
                                        </div>
                                    )
                                }) 
                            }
                            <div className="billing-detail-item flex">
                                <div className="billing-confirm-left">Thành Tiền</div>
                                <div className="billing-detail-mobile">
                                    <div className="billing-detail-name"></div>
                                    <div className="billing-detail-count" style={{color: '#111'}}></div>
                                    {subTotal &&
                                        <div className="billing-detail-price billing-confirm-right">{subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                                    }
                                </div>
                            </div>
                            <div 
                                className="billing-detail-item flex"
                                style={{justifyContent: 'space-between'}}
                            >
                                <div className="billing-confirm-left">Địa Chỉ</div><div className="billing-detail-mobile">
                                    <div className="billing-detail-name"></div>
                                    <div className="billing-detail-count" style={{color: '#111'}}></div>
                                    <div className="billing-detail-price billing-confirm-right orderAddressConfirm" style={{textTransform: 'capitalize'}}>{orderAddressConfirm} đ</div>
                                </div>
                            </div>
                            <div className="billing-detail-item flex">
                                <div className="billing-confirm-left">Phí vận chuyển</div>
                                <div className="billing-detail-mobile">
                                    <div className="billing-detail-name"></div>
                                    <div className="billing-detail-count" style={{color: '#111'}}></div>
                                    <div className="billing-detail-price billing-confirm-right" style={{textTransform: 'capitalize'}}>{shipping} đ</div>
                                </div>
                            </div>
                            <div className="billing-detail-item flex">
                                <div className="billing-confirm-left">Tổng</div>
                                <div className="billing-detail-mobile">
                                    <div className="billing-detail-name"></div>
                                    <div className="billing-detail-count" style={{color: '#111'}}></div> 
                                    <div className="billing-detail-price billing-confirm-right">{(Number(subTotal) + Number(shipping)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                                </div>
                            </div> 
                            <div className="billing-detail-item flex">
                                <div className="billing-confirm-left">Thanh Toán</div>
                                <div className="billing-detail-mobile">
                                    <div className="billing-detail-name"></div>
                                    <div className="billing-detail-count" style={{color: '#111'}}></div>
                                    <div className="billing-detail-price billing-confirm-right" style={{textTransform: 'capitalize'}}>{orderPaymentMethod}</div>
                                </div>
                            </div>
                            <div className="order-btn btn" style={{marginTop: '30px', marginBottom: '30px'}} onClick={()=>{
                                document.body.style.overflow = 'unset';
                                localStorage.removeItem('total')
                                localStorage.removeItem('cart')
                                localStorage.removeItem('cartId') 
                                props.history.push("/")
                                window.location.reload(false);
                            }}>
                                Hoàn Tất
                            </div>
                        </div>
                    </div>
                </div>
            } 
            <div className="billing-detail">
                <div className="billing-detail-title">THÔNG TIN ĐƠN HÀNG</div>
                <form className="billing-detail-form"> 
                    <table className="billing-detail-table"> 
                        <tbody>
                            <tr>
                                <td>Tên</td>
                                <td>
                                    <input 
                                        type="text"
                                        className="input"
                                        name="name" 
                                        value={nameInput}
                                        onChange={(event)=>{
                                            setNameInput(event.target.value)
                                        }}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Số điện thoại</td>
                                <td>
                                    <input 
                                        type="text"
                                        className="input"
                                        name="phone" 
                                        value={phoneInput}
                                        onChange={(event)=>{
                                            setPhoneInput(event.target.value)
                                        }}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input 
                                        type="text"
                                        className="input"
                                        name="phone" 
                                        value={emailInput}
                                        onChange={(event)=>{
                                            setEmailInput(event.target.value)
                                        }}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>Tỉnh</td>
                                <td>
                                    <select 
                                        className="input"
                                        value={userTinh || ''}
                                        onChange={(event)=>{
                                            setProvinceId(event.target.selectedIndex)
                                            setUserTinh(event.target.value)
                                        }}
                                    >
                                        <option disabled defaultValue>select a province</option>
                                        {tinh.map((item, index) => {
                                            return (
                                                <option 
                                                    key={index}
                                                    value={item.name}
                                                >{item.name}</option>
                                            )
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Huyện</td>
                                <td>
                                    <select 
                                        className="input"
                                        value={userHuyen || ''}
                                        onChange={(event)=>{
                                            setUserHuyen(event.target.value)
                                        }}
                                    >
                                        <option disabled defaultValue>select a district</option>
                                        {huyen.map((item, index) => {
                                            if (item.idProvince === provinceId) {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={item.name}
                                                        >{item.name}</option>
                                                )
                                            }
                                            return null
                                        })}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Địa chỉ</td>
                                <td>
                                    <input 
                                        type="text"
                                        className="input"
                                        name="address" 
                                        value={addressInput || ''}
                                        onChange={(event)=>{
                                            setAddressInput(event.target.value)
                                        }}
                                    ></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div> 
            <div className="billing-detail">
                <div className="billing-detail-title">CHI TIẾT ĐƠN HÀNG</div>
                <div className="billing-detail-form"> 
                    <div className="billing-detail-list">
                        { cartList &&
                            cartList.map((item, index)=>{
                                return (
                                    <div 
                                        key={index}
                                        className="billing-detail-item"
                                    >
                                        <img src={item.images[0].path} alt={item.name} width="60px" height="60px"></img>
                                        <div className="billing-detail-mobile">
                                            <div className="billing-detail-name">{item.name}</div>
                                            <div className="billing-detail-count">
                                                <p>x</p>
                                                {item.count}
                                            </div>
                                            <div className="billing-detail-price">{(item.price * item.count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                                        </div>
                                    </div>
                                )
                            }) 
                        }
                        <div className="billing-detail-item flex">
                            <div style={{width:'30%', height: '60px', lineHeight: '60px', fontSize: '18px'}}>Thành Tiền</div>
                            <div className="billing-detail-mobile">
                                <div className="billing-detail-name"></div>
                                <div className="billing-detail-count" style={{color: '#111'}}></div>
                                { subTotal &&
                                    <div className="billing-detail-price" style={{color:'black',fontSize:"18px"}}>{subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                                }
                            </div>
                        </div>
                        <div 
                            className="billing-detail-item flex"
                            style={{justifyContent: 'space-between'}}
                        >
                            <div style={{width:'30%', height: '60px', lineHeight: '60px', fontSize: '18px'}}>Vận Chuyển</div>
                            <div className="billing-detail-shipping">
                                <select onChange={(event)=>{
                                    setShipping(event.target.value)
                                }}>
                                    <option value="0">FREESHIP - 0đ</option>
                                    <option value="30000">FAST SHIPPING - 30.000đ</option>
                                </select>
                            </div>
                        </div>
                        <div 
                            className="billing-detail-item flex"
                            style={{justifyContent: 'space-between'}}
                        >
                            <div style={{width:'30%', height: '60px', lineHeight: '60px', fontSize: '18px'}}>Hình Thức</div>
                            <div className="billing-detail-shipping">
                                <select onChange={(event)=>{
                                    setMethodPayMent(event.target.value)
                                }}>
                                    <option value="0">Thanh toán tiền mặt.</option>
                                    <option value="1">Thanh toán chuyển khoản.</option>
                                </select>
                            </div>
                        </div>
                        <div className="billing-detail-item flex">
                            <div style={{width:'30%', height: '60px', lineHeight: '60px', fontSize: '18px'}}>Tổng</div>
                            <div className="billing-detail-mobile">
                                <div className="billing-detail-name"></div>
                                <div className="billing-detail-count" style={{color: '#111'}}></div>
                                <div className="billing-detail-price" style={{color:'black',fontSize:"20px"}}>{(Number(subTotal) + Number(shipping)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</div>
                            </div>
                        </div>
                        <div className="order-btn btn" onClick={placeAnOrder}>
                                XÁC NHẬN THANH TOÁN
                        </div>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default withRouter(CheckoutBody)