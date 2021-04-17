import React, { useEffect, useState } from 'react'
import '../../../App.css'
import '../../../Styles/Dashboard.css'
import { faEnvelope, faFileInvoice, faHome, faInbox, faNewspaper, faShoppingBag, faTshirt, faUser } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'
import { API_URL } from '../../../config/apiConfig'

function Dashboard(props) {
   
    const [userInfo, setUserInfo] = useState(null)

    useEffect(()=>{
        if (localStorage.getItem('token')) {
            Axios.get(`${API_URL}/api/user/admin`, { 
                headers: {"authorization" : `Bearer ${localStorage.getItem('token')}`}
            })
            .then(res => {
                if (res.data.roleConnect === 'ADMIN') {
                    setUserInfo(res.data.data);
                } else {
                    localStorage.setItem("errLogin", "cần sử dụng tài khoản admin...!")
                    props.history.push('/admin') 
                }
            })
            .catch(err => { 
                console.log(err.response)
            })
        } else {
            props.history.push('/admin')
        }
    },[]) 

  
    return (
        <div className="Dashboard flex">
            admin page.
           
        </div>
    )
}
export default withRouter(Dashboard)