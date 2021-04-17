import React, { useEffect, useState } from "react";
import "../App.css";
import Footer from "../components/Layouts/Footer.js"
import BannerV1 from '../components/Banner/BannerV1.js'
import Header from '../components/Header/Header.js'
import ShopBody from "../components/Shop/ShopBody";
import axios from 'axios'
import { withRouter } from "react-router-dom";
import {API_URL} from "../config/apiConfig"

function Shop(props) {

    const [products, setProducts] = useState([]);
    let sex = props.location.pathname.split('/')[1]
    let cate = props.location.pathname.split('/')[2] 

    useEffect(() => {
        window.scrollTo(0,0);
        document.body.style.overflow = 'unset';
        if (sex === "shop") { 
            axios.get(`${API_URL}/api/product`)
            .then(res => {   
                const virtualData = [];
                for(let i in res.data.data) { 
                    if(cate){
                        if (res.data.data[i].trademark.name.toLowerCase()===cate.replace('-',' ')) {
                            virtualData.push(res.data.data[i])
                        }
                    }
                    else{
                        virtualData.push(res.data.data[i])
                    }
                }
                setProducts(virtualData)
            })
        } else {
            sex.toLowerCase() === "men" ? sex = "nam" : sex = "nữ"
            axios.get(`${API_URL}/api/product`)
                .then(res => {
                    const virtualData = [];
                    for(let i in res.data.data) { 
                        if(cate){
                            if (res.data.data[i].gender.toLowerCase() === sex && res.data.data[i].trademark.name.toLowerCase()===cate.replace('-',' ')) {
                                virtualData.push(res.data.data[i])
                            }
                        }
                        else{
                            if (res.data.data[i].gender.toLowerCase() === sex) {
                                virtualData.push(res.data.data[i])
                            }
                        }
                    }
                    setProducts(virtualData);
                }
            )
        }
    },[sex, cate]) 
    
    return (
        <div className="Men">
            <Header/>
            <BannerV1 />
            <ShopBody
                products={products}
                sex = {sex}
                cate = {cate}
            />
            <Footer/>
        </div>
    )
}
export default withRouter(Shop);
