import React, { useContext, useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Account.css';
import {API_URL} from '../../config/apiConfig';
import {
   withRouter
} from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import {CartContext} from '../../contexts/Cart';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import FormData from 'form-data';
import tempAvatar from '../../assets/users.jpg';

function AccountInfo(props) {
   const [tinh, setTinh] = useState([])
   const [huyen, setHuyen] = useState([])
   const {
      userInfo,
      setUserInfoFunc
   } = useContext(UserContext);
   const { 
      getTotal,
      openCartUser,
      setCartItems,
      setOpenCartUser,
      setCartId
  } = useContext(CartContext);
   const [tabId, setTabId] = useState(1);
   const [toast, setToast] = useState(false);
   const [toastErr,setToastErr]= useState(false);
   const [messageError,setMessageError]= useState("");
   const [userName, setUserName] = useState("");
   const [userEmail, setUserEmail] = useState("");
   const [userBirthday, setUserBirthday] = useState("");
   const [userPhone, setUserPhone] = useState("");
   const [userGender, setUserGender] = useState("");
   const [userAvt, setUserAvt] = useState("");
   const [fileAvatar, setFileAvatar] = useState("");
   const [provinceId, setProvinceId] = useState("");
   const [userTinh, setUserTinh] = useState("");
   const [userHuyen, setUserHuyen] = useState("");
   const [userAddress, setUserAddress] = useState("");
   const [userPassword, setUserPassword] = useState("");
   const [userNewPassword, setUserNewPassword] = useState("");
   const [userRenewPassword, setUserRenewPassword] = useState("");
   const [orderList, setOrderList] = useState([]);
   
   useEffect(() => {
      if (userInfo) {
         // console.log(userInfo);
         // console.log(orderList);
         let tempBirthday = new Date(userInfo.birthday);
         setUserName(`${userInfo.fistName} ${userInfo.lastName}`);
         setUserBirthday(`${tempBirthday.getFullYear()}-${((tempBirthday.getMonth() + 1) < 10 ? '0' + (tempBirthday.getMonth() + 1) : tempBirthday.getMonth() + 1)}-${(tempBirthday.getDate() < 10 ? '0' + tempBirthday.getDate() : tempBirthday.getDate())}`);
         setUserEmail(userInfo.email);
         setUserPhone(userInfo.phone);
         setUserAvt((userInfo.avatar) ? userInfo.avatar : tempAvatar);
         setUserAddress(userInfo.address);
         setUserGender(userInfo.gender);
         axios.get(`${API_URL}/api/cart/all`,{
            headers: {
                     'authorization': `Bearer ${localStorage.getItem('token')}`,
                  }
         })
            .then(res => {
               if (res.data.data.length>0) {
                  const orderList2 = []
                  for (let i in res.data.data) {
                     if (res.data.data[i].userId === userInfo.userId&&res.data.data[i].status !== 0) {
                        orderList2.push(res.data.data[i]);
                        setOrderList(orderList2);
                     }
                  }
               }
            });
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
      if(!openCartUser){
         setOpenCartUser(true);
         axios.get(`${API_URL}/api/cart`,{
            headers: {
                     'authorization': `Bearer ${localStorage.getItem('token')}`,
                  }
         })
            .then(res => {
               if (res.data.data.userId === userInfo.userId) {
                  let cartTemp = [];
                  let listCartId = res.data.data.listCartId;
                  if(res.data.itemLength>0){
                     res.data.items.forEach( x=>{
                          axios.get(`${API_URL}/api/product/${x.productId}`)
                           .then( product=>{
                              let temp =product.data.data;
                              let count = x.quantity;
                              cartTemp.push({...temp,count,listCartId});
                              localStorage.setItem('cart', JSON.stringify(cartTemp));
                              getTotal(cartTemp);
                           })
                     });   
                     setTimeout(() => {
                        setCartItems(JSON.parse(localStorage.getItem('cart')));
                     }, 500);
                  }
                  setCartId(listCartId);
                  localStorage.setItem('cartId',listCartId);
               }
            });
      }
   }, [userInfo])
   const submitImage =async (event)=>{
      event.preventDefault();
      let formImage = new FormData();
      formImage.append('avatar',fileAvatar);
      axios.post(`${API_URL}/api/user/avatar`,formImage,{
         headers: {
                  'authorization': `Bearer ${localStorage.getItem('token')}`,
                  'content-type': 'multipart/form-data'
               }
      })
      .then(res => {
         console.log(res);
         setUserInfoFunc(res.data.data);
      })
      .catch(err => {
         console.log(err.message);
         setToastErr(true);
         setTimeout(() => {
            setToastErr(false)
         }, 2000);
      })
      setToast(true)
      setTimeout(() => {
         setToast(false)
      }, 2000)
   }
   const submitInfo = (event) => {
      event.preventDefault();
      let str = userName.trim().split(" ");
      const lastName = str[str.length - 1].trim();
      const fistName = userName.replace(lastName, "").trim();
      let formDataInf = {
         "fistName":fistName,
         "lastName":lastName,
         "birthday":userBirthday,
         "email": userEmail,
         "phone": userPhone,
         "gender": userGender,
         "province": userTinh,
         "district": userHuyen,
         "address": userAddress
      }
      axios.patch(`${API_URL}/api/user/profile`,formDataInf,{
         headers: {
                  'authorization': `Bearer ${localStorage.getItem('token')}`
               }
      })
      .then(res => {
         localStorage.removeItem('token')
         localStorage.setItem('token', res.data.token);
      })
      .catch(err => {
            console.log(err.message);
            setToastErr(true);
            setTimeout(() => {
               setToastErr(false)
            }, 2000);
      })
     
      setToast(true)
      setTimeout(() => {
         setToast(false)
      }, 2000)
   }
   
   const submitUpdatePass=(event)=>{
      event.preventDefault();
      if (userNewPassword.trim()===""||userPassword.trim()==="") {
         setMessageError("vui l??ng nh???p th??ng tin...!");
         setToastErr(true);
         setTimeout(() => {
            setMessageError("");
            setToastErr(false);
         }, 2000);
         return;
      }
      else if (userNewPassword.length<8) {
         setMessageError("m???t Kh???u tr??n 8 k?? t???...!");
         setToastErr(true);
         setTimeout(() => {
            setMessageError("");
            setToastErr(false);
         }, 2000);
         return;
      }
      else if (userRenewPassword!==userNewPassword) {
         setMessageError("m???t Kh???u nh???p l???i kh??ng ????ng...!");
         setToastErr(true);
         setTimeout(() => {
            setMessageError("");
            setToastErr(false);
         }, 2000);
         return;
      }
      else{
         let data={
            "newPass":userNewPassword,
            "oldPass":userPassword
         }
         axios.put(`${API_URL}/api/user/password`,data,{
            headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
         })
         .then(res => {
            setToast(true)
            setMessageError("C???p nh???t th??nh c??ng, vui l??ng ????ng nh???p l???i.")
            setTimeout(() => {
               setToast(false);
               setMessageError("");
               setUserInfoFunc({});
               localStorage.removeItem('user-id');
               localStorage.removeItem('token');
               sessionStorage.removeItem('chat-id');
               window.location.reload();
               localStorage.removeItem('total');
               localStorage.removeItem('cart');
            }, 2000)
         }).catch(err => {
            setMessageError(err.response.data.error);
            setToastErr(true);
            setTimeout(() => {
               setMessageError("");
               setToastErr(false);
            }, 2000);
            return;
         })
      }
   }
   const logOut = () => {
      console.log("click logout");
      axios.post(`${API_URL}/api/user/logout`,{},{
         headers: { "authorization": `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
         setUserInfoFunc({});
         setOpenCartUser(false);
         localStorage.clear();
         window.location.reload();
      }).catch(err => {
         console.log(err);
      })
   }
   return (
      <div className='AccountInfo'>
         <div className="accountinfo-container flex">
            <div className={toast ? "toast toast-show" : "toast"} style={{ top: '20px' }}>
               <FontAwesomeIcon icon={faCheckCircle} className="icon" style={{ marginRight: '3px' }}/>
                  {messageError?messageError:"C???p nh???t th??ng tin th??nh c??ng!"}
            </div>
            <div className={toastErr ? "toast-error toast-show" : "toast"} style={{ top: '20px' }}>
               <FontAwesomeIcon icon={faTimesCircle} className="icon" style={{ marginRight: '3px' }}/>
                  {messageError?messageError:"C???p nh???t th??ng tin th???t b???i!"}
            </div>
            <div className="accountinfo-menu">
               <form onSubmit={submitImage} encType="multipart/form-data" >
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-right create-box-right">
                              <div className="flex" style={{ overflowY: 'hidden', flexWrap: 'wrap' }}>
                                 <div className="accountinfo-avt flex">
                                    <img
                                    className="accountinfo-avt-img"
                                       src={userAvt}
                                       alt=""
                                       width="100px"
                                       height="100px"
                                    ></img>
                                 </div>
                              </div>
                              <input
                                 onChange={(event) => {
                                    const files = event.target.files[0];
                                    setFileAvatar(files);
                                    setUserAvt(URL.createObjectURL(files));
                                 }}
                                 type="file"
                                 name="newsImg"
                                 className="noborder"
                                 style={{ height: '30px' }}
                              ></input>
                              <button className="btn btn-upload">L??u Thay ?????i</button>
                           </div>
                        </div>
                     </form>
               <div className="accountinfo-menu-list">
                  <div
                     className={tabId === 1 ? "accountinfo-active accountinfo-menu-item flex" : "accountinfo-menu-item flex"}
                     onClick={() => setTabId(1)}>My account</div>
                  <div
                     className={tabId === 2 ? "accountinfo-active accountinfo-menu-item flex" : "accountinfo-menu-item flex"}
                     onClick={() => setTabId(2)}>Orders</div>
                  <div
                     className={tabId === 3 ? "accountinfo-active accountinfo-menu-item flex" : "accountinfo-menu-item flex"}
                     onClick={() => setTabId(3)}
                  >?????i M???t Kh???u</div>
                  <div
                     className={tabId === 4 ? "accountinfo-active accountinfo-menu-item flex" : "accountinfo-menu-item flex"}
                     onClick={()=>logOut()}
                  >Log out</div>
               </div>
            </div>
            {
               tabId === 1 &&
               <div className="accountinfo-main">
                  <div className="accountinfo-title">
                     <p>Th??ng Tin T??i Kho???n</p>
                     <p>Qu???n l?? v?? c???p nh???t th??ng tin t??i kho???n.</p>
                  </div>
                  <div className="accountinfo-body flex">
                     <form onSubmit={submitInfo} >
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">T??n</div>
                           <div className="dashboard-right create-box-right">
                              <input
                                 type="text" name="Name"
                                 className="input"
                                 value={userName}
                                 onChange={(event) => {
                                    setUserName(event.target.value)
                                 }}
                              ></input>
                           </div>
                        </div>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">Gi???i T??nh</div>
                           <div className="dashboard-right create-box-right">
                              <input
                                 type="radio" name="gender"
                                 value="Nam"
                                 id="rdoNam"
                                 className="radio-gender"
                                 checked={(userGender === "Nam" || userGender === "nam")}
                                 onChange={(event) => {
                                    setUserGender(event.target.value)
                                 }}
                              ></input>
                              <label>Nam</label>
                              <input
                                 type="radio" name="gender"
                                 value="N???"
                                 id="rdoNu"
                                 className="radio-gender"
                                 checked={(userGender === "N???" || userGender === "n???")}
                                 onChange={(event) => {
                                    setUserGender(event.target.value)
                                 }}
                              ></input>
                              <label>N???</label>
                           </div>
                        </div>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">Ng??y Sinh</div>
                           <div className="dashboard-right create-box-right">
                              <input
                                 type="date" name="title"
                                 className="input"
                                 value={userBirthday}
                                 onChange={(event) => {
                                    setUserBirthday(event.target.value)
                                 }}
                              ></input>
                           </div>
                        </div>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">Email</div>
                           <div className="dashboard-right create-box-right">
                              <input
                                 type="text"
                                 className="input"
                                 value={userEmail}
                                 onChange={(event) => {
                                    setUserEmail(event.target.value)
                                 }}
                              ></input>
                           </div>
                        </div>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">S??? ??i???n Tho???i</div>
                           <div className="dashboard-right create-box-right">
                              <input
                                 type="text"
                                 value={userPhone}
                                 className="input"
                                 onChange={(event) => {
                                    setUserPhone(event.target.value)
                                 }}
                              ></input>
                           </div>
                        </div>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">T???nh/Th??nh Ph???</div>
                           <div className="dashboard-right create-box-right">
                              <select
                                 className="input"
                                 value={userTinh||""}
                                 onChange={(event) => {
                                    setProvinceId(event.target.selectedIndex);
                                    setUserTinh(event.target.value);
                                 }}
                              >
                                 <option defaultValue disabled>ch???n huy???n</option>
                                 {tinh.map((item, index) => {
                                    return (
                                       <option
                                          key={index}
                                          value={item.name}
                                       >{item.name}</option>
                                    )
                                 })}
                              </select>
                           </div>
                        </div>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">Huy???n/Qu???n</div>
                           <div className="dashboard-right create-box-right">
                              <select
                                 className="input"
                                 value={userHuyen || ""}
                                 onChange={(event) => {
                                    setUserHuyen(event.target.value)
                                 }}
                              >
                                 <option defaultValue disabled>ch???n huy???n</option>
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
                           </div>
                        </div>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">?????a Ch???</div>
                           <div className="dashboard-right create-box-right">
                              <input
                                 type="text"
                                 className="input"
                                 name="address"
                                 value={userAddress || ''}
                                 onChange={(event) => {
                                    setUserAddress(event.target.value)
                                 }}
                              ></input>
                           </div>
                        </div>
                        <div className="accountinfo-btn-row">
                           <button className="accountinfo-btn btn">C???p Nh???t Th??ng Tin</button>
                        </div>
                     </form>
                  </div>
               </div>
            }
            {
               tabId === 2 &&
               <div className="accountinfo-main">
                  <div className="accountinfo-title">
                     <p>Th??ng Tin ????n H??ng</p>
                     <p>danh s??ch c??c ????n h??ng.</p>
                  </div>
                  <div className="dashboard-table-orderlist">
                        <table className="dashboard-table" style={{tableLayout: 'fixed', width:"90%"}}>
                           <tbody>
                              <tr className="dashboard-order"> 
                                 <th className="table-new-title table-order-title"> 
                                    M?? ????n H??ng
                                 </th> 
                                 <th className="table-new-title table-order-title"> 
                                    Ng??y ?????t
                                 </th> 
                                 <th className="table-new-title table-order-title"> 
                                    Thanh To??n
                                 </th> 
                                 <th className="table-new-title table-order-title"> 
                                    Tr???ng Th??i
                                 </th> 
                                 <th className="table-new-title table-order-title"> 
                                    T???ng Ti???n
                                 </th> 
                              </tr>
                              {
                                 orderList.reverse().map((item, index) => {
                                    const date = new Date(item.createdAt)
                                    const day = date.getDate();
                                    const month = date.getMonth() + 1;
                                    const year = date.getFullYear();
                                    var totalItem = 0;
                                    const status =["gi??? h??ng", "??ang x??? l??", "??ang v???n chuy???n", "???? thanh to??n", "ho??n th??nh"];
                                    const payment = ["ti???n m???t","chuy???n kho???n" ];
                                    for (let i in item.detailCarts) {
                                          totalItem += item.detailCarts[i].quantity* item.detailCarts[i].Price
                                    }
                                    return (
                                          <tr key={index} className="mobile-table"> 
                                             <td> 
                                                <p >{item.listCartId}</p>
                                             </td>
                                             <td>
                                                <p>{day}-{month}-{year}</p>
                                             </td>
                                             <td>
                                                <p style={{textTransform: 'capitalize'}}>{(item.payment)?payment[item.payment]:"ch??a thanh to??n"}</p>
                                             </td>
                                             <td>
                                                <p >{status[item.status]}</p>
                                             </td>
                                             <td>
                                                <p>{totalItem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ??</p>
                                             </td> 
                                          </tr>
                                    )
                                 })
                              }
                           </tbody>
                        </table>
                     </div>
                  </div>
            }
            {
               tabId === 3 &&
               <div className="accountinfo-main">
                  <div className="accountinfo-title">
                     <p>?????i M???t Kh???u</p>
                     <p>Thay ?????i m???t kh???u b???o m???t.</p>
                  </div>
                  <div className="accountinfo-body flex">
                     <form onSubmit={submitUpdatePass}>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">Nh???p M???t Kh???u</div>
                           <div className="dashboard-right create-box-right">
                              <input
                                 type="password" name="password"
                                 className="input"
                                 placeholder="Nh???p m???t kh???u"
                                 onChange={(event) => {
                                    setUserPassword(event.target.value)
                                 }}
                              ></input>
                           </div>
                        </div>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">M???t Kh???u M???i</div>
                           <div className="dashboard-right create-box-right">
                              <input
                                 type="password" name="newPassword"
                                 className="input"
                                 placeholder="Nh???p m???t kh???u m???i"
                                 onChange={(event) => {
                                    setUserNewPassword(event.target.value)
                                 }}
                              ></input>
                           </div>
                        </div>
                        <div className="create-box-row account-box-row flex">
                           <div className="dashboard-left create-box-left flex">Nh???p L???i M???t Kh???u</div>
                           <div className="dashboard-right create-box-right">
                              <input
                                 type="password" name="rePassword"
                                 className="input"
                                 placeholder="Nh???p l???i m???t kh???u m???i"
                                 onChange={(event) => {
                                    setUserRenewPassword(event.target.value)
                                 }}
                              ></input>
                           </div>
                        </div>
                        <div className="accountinfo-btn-row">
                           <button className="accountinfo-btn btn">X??c Nh???n Thay ?????i</button>
                        </div>
                     </form>
                  </div>
               </div>
            }
         </div>
      </div>
   )
}

export default withRouter(AccountInfo);