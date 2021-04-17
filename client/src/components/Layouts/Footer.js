import React from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faFacebookF, faTwitter, faInstagram, faPinterest, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom'


export default function Footer() {

    const handleClick = () => {
        window.scrollTo(0,0)
    }

    return(
        <div className="Footer">
            <div className="footer-container">
                <div className="footer-left">
                    <p className="cr">©2021 ABC Shop</p>
                    <Link to="/" onClick={handleClick}>Trang Chủ</Link>
                    <a href="/shop" onClick={handleClick}>Cửa Hàng</a>
                    <Link to="/contact" onClick={handleClick}>Về Chúng Tôi</Link>
                </div>
                <div className="footer-right">
                    <FontAwesomeIcon icon={faTwitter} className="cart-icon-footer"/>
                    <FontAwesomeIcon icon={faFacebookF} className="cart-icon-footer"/>
                    <FontAwesomeIcon icon={faInstagram} className="cart-icon-footer"/>
                    <FontAwesomeIcon icon={faPinterest} className="cart-icon-footer"/>
                    <FontAwesomeIcon icon={faGoogle} className="cart-icon-footer"/>
                </div>
            </div>
        </div>
    )
}
