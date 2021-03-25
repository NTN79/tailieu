import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes , faCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import {
    withRouter
} from 'react-router-dom'
import {API_URL} from '../../config/apiConfig';
import { UserContext } from '../../contexts/User';
import {CartContext} from '../../contexts/Cart'
import AccountInfo from './AccountInfo';

function Account(props) {
    
    const { 
        setUserInfoFunc 
    } = useContext(UserContext);
    const{
        cartItems
    }= useContext(CartContext)
    const [check, setCheck] = useState(false);
    const [tabID, setTabID] = useState(0);
    const [arrSuccess, setArrSuccess] = useState([]);
    const [arrErr, setArrErr] = useState([]);
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);

    const handleOnChange = (event) => {
        setUser({...user , [event.target.name]: event.target.value})
    }
    const createCartUser = ()=>{
        var cartTemp =[];
        cartItems.forEach(item=>{
            let cart = {
                productId:item.productId,
                quantity:item.count,
                price:item.price
            }
            cartTemp.push(cart);
        });
        axios.post(`${API_URL}/api/cart`,{
            cartTemp: cartTemp
        },{
            headers: {"authorization" : `Bearer ${localStorage.getItem('token')}`}
        }).then(res=>{
            localStorage.removeItem('cart');
            localStorage.removeItem('total');   
        })
    }
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        if (tabID === 0) {
            await axios.post(`${API_URL}/api/user/login`, {
                email: user.loginEmail,
                password: user.loginPassword
            })
            .then(res => {
                setArrSuccess(arrSuccess=>[...arrSuccess,res.data.message])
                setTimeout(()=> {
                    window.location.reload(false);
                    document.body.style.overflow = 'unset';
                }, 1500);
                localStorage.setItem('token', res.data.token);
                if (cartItems.length>0) {
                    createCartUser();
                }
                localStorage.setItem('user-id', res.data.data.userId);
            })
            .catch(err => {
                console.log(err.response)
                setArrErr(arrErr=>[...arrErr,((err.response.data!==undefined)?err.response.data.message:"lỗi đăng nhập...!")]);
            })
        } else {
            let str = user.registerName.split(" ");
            const lastName = str[str.length-1].trim();
            const fistName = user.registerName.replace(lastName,"").trim();
            // console.log(lastName ," ",fistName,"end")
            axios.post(`${API_URL}/api/user/`, {
                fistName: fistName,
                lastName: lastName,
                phone: user.registerPhone,
                email: user.registerEmail,
                password: user.registerPassword
            })
            .then(res => {
                setArrSuccess(arrSuccess=>[...arrSuccess, res.message])
                setTimeout(()=> {
                    window.location.reload(false);
                    document.body.style.overflow = 'unset';
                }, 1000)
            })
            .catch(err => {
                setArrErr(arrErr=>[...arrErr, err.response.data.message]);
            })
        }
    }
    useEffect(()=> {
        if(localStorage.getItem('token')!=null){
            axios.get(`${API_URL}/api/user/profile`, { 
                headers: {"authorization" : `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res => {
                setUserInfoFunc(res.data.data);
                setLogin(true);
            })
            .catch(err => {
                console.log(err);
            })
        }
    },[]) 
    let uniqueErr, uniqueSuccess = [];
    if (arrErr.length > 0) {
        uniqueErr = arrErr.filter(function(item, pos) {
            return arrErr.indexOf(item) === pos;
        })
    }
    if (arrSuccess.length > 0) {
        uniqueSuccess = arrSuccess.filter(function(item, pos) {
            return arrSuccess.indexOf(item) === pos;
        })
    }
    return(
        <div className={props.accountOpen === false ? 'Account displayNone' : 'Account'}>
            <div className="account-container">
                <div className="search-header flex">
                    <div className="search-title">Tài Khoản</div>
                    <div
                        className="search-close"
                        onClick={props.clickToClose}
                        >
                        <FontAwesomeIcon 
                            icon={faTimes}
                            className="icon"
                            />
                    </div>
                </div >
                
                {login === true && 
                    <AccountInfo/>
                }
                
                {login === false && 
                <div className={props.accountOpen === false ? '' : 'fadeIn'}>
                    <div 
                        className='search-tab login-tab flex'>
                        <div 
                            className={tabID === 0 ? 'search-tab-cate search-tab-active' : 'search-tab-cate'}
                            onClick={() => {setTabID(0);setArrErr([]);setArrSuccess([])}}
                            >
                            ĐĂNG NHẬP
                        </div>
                        <div 
                            className={tabID === 1 ? 'search-tab-cate search-tab-active' : 'search-tab-cate'}
                            onClick={() => {setTabID(1);setArrErr([]);setArrSuccess([])}}
                            >
                            ĐĂNG KÝ
                        </div>
                    </div>
                    <div className="login-err flex-center flex-col">
                        { uniqueErr && 
                            <div>
                                {
                                    uniqueErr.map((item, index) => {
                                        return(
                                            <div key={index}>
                                                <FontAwesomeIcon icon={faTimes} style={{ marginRight: '10px', color: 'red'}}/>
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        { uniqueSuccess && 
                            <div >
                                {
                                    uniqueSuccess.map((item, index) => {
                                        return(
                                            <div key={index} className="login-success">
                                                <FontAwesomeIcon icon={faCheck} style={{ marginRight: '10px', color: 'green'}}/>
                                                {item}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    { tabID === 0 &&
                        <div className="search-form login-form fadeToRight">
                            <form className="flex-col" onSubmit={handleOnSubmit}>
                                <input type="email" placeholder="Email" name="loginEmail" onChange={handleOnChange}/>
                                <input type="password" placeholder="Mật Khẩu" name="loginPassword" onChange={handleOnChange}/>
                                <div className="remember-login flex noselect" 
                                    onClick={() => { 
                                        if (check) {
                                            setCheck(false)
                                        } else { 
                                            setCheck(true) 
                                        }
                                    }}
                                >
                                    <div className="check-box"></div>
                                    {check && 
                                        <div className="check-box-active flex-center" onClick={()=> setCheck(false)}>
                                            <FontAwesomeIcon className="check-box-active" icon={faCheck}></FontAwesomeIcon>
                                        </div>
                                    }
                                    <p>ghi nhớ đăng nhập</p>
                                </div>
                                <button type="submit" onClick={handleOnSubmit} className="btn">ĐĂNG NHẬP</button>
                                <label>Quên mật khẩu?</label>
                            </form>
                        </div>
                    }
                    { tabID === 1 && 
                        <div className="search-form login-form fadeToLeft">
                            <form className="flex-col" onSubmit={handleOnSubmit}>
                                <input type="text" placeholder="Họ Tên" name="registerName" onChange={handleOnChange}/>
                                <input type="text" placeholder="Số Điện Thoại" name="registerPhone" onChange={handleOnChange}/>
                                <input type="email" placeholder="Email" name="registerEmail" onChange={handleOnChange}/>
                                <input type="password" placeholder="Mật Khẩu" name="registerPassword" onChange={handleOnChange}/>
                                <button className="btn">ĐĂNG KÝ</button>
                            </form>
                        </div>
                    }
                </div>
                }
            </div>
        </div>
    )
}

export default withRouter(Account);