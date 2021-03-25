import React, { useEffect } from "react";
import "../App.css";
import BannerV1 from "../components/Banner/BannerV1";
import CheckoutBody from "../components/CheckoutBody";
import Header from "../components/Header/Header";
import Footer from "../components/Layouts/Footer";

function Checkout() {
    useEffect(()=>{
        window.scrollTo(0,0);
        document.body.style.overflow = 'unset';
    },[])

    return (
        <div className="Contact">
            <Header/>
            <BannerV1
                bannerImage={""} collectionTitle={"Thanh Toán"}
            />
            <CheckoutBody/>
            {/* <Newsletter/> */}
            <Footer/>
        </div>
    )
}
export default Checkout;
