import React from 'react';
import '../../App.css';
import {
    withRouter
  } from "react-router-dom"; 
import '../../Styles/BannerV4.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

function BannerV4(props) {

    const location = props.history.location.pathname
    const locationText = location.split('/');
    return(
        <div className="BannerV4">
            <div className="bannerv4-title">
                {locationText[locationText.length-1].toLocaleUpperCase().replace('-',' ')}
            </div> 
            <div className="newsbanner-breadcrumb flex-center">
                <div>Trang Chủ</div>
                {
                    locationText.length>0 &&
                    locationText.map((item,i)=>{
                        return(
                            i>0 && <div style={{textTransform: 'capitalize'}} key={item}>
                                <FontAwesomeIcon icon={faAngleRight} className="cart-icon" style={{margin: '0 10px'}}/>
                                {item.replace('-',' ')}
                            </div>
                        )   
                    })
                }
            </div>
        </div>
    )
}

export default withRouter(BannerV4);