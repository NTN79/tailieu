import React, { useEffect, useRef, useState } from "react";
import "../App.css";
// import Newsletter from "../components/Layouts/Newsletter.js"
import Footer from "../components/Layouts/Footer.js"
import ProductBody from "../components/Product/ProductBody.js";
import Header from "../components/Header/Header";
import ProductReview from "../components/Product/ProductReview.js";
import ProductRecommend from "../components/Product/ProductRecommend.js";
import axios from 'axios';
import {API_URL} from '../config/apiConfig';

export default function ProductDetail(props) {

    const [product, setProduct] = useState(null);
    const [tabId, setTabId] = useState(0);
    const bRef = useRef(null);
    useEffect(() => {
        window.scrollTo(0,0);
        document.body.style.overflow = 'unset';
        axios.get(`${API_URL}/api/product/` + props.match.params.id)
            .then(res => {
                setProduct(res.data.data);
            }
        )
    },[props.match.params.id]);
    const handleClick = () => {
        smoothScroll.scrollTo('review');
        setTabId(1)
    }
    var smoothScroll = {
        
        timer: null,
    
        stop: function () {
            clearTimeout(this.timer);
        },
    
        scrollTo: function (id, callback) {
            var settings = {
                duration: 1000,
                easing: {
                    outQuint: function (x, t, b, c, d) {
                        return c*((t=t/d-1)*t*t*t*t + 1) + b;
                    }
                }
            };
            var percentage;
            var startTime;
            var node = document.getElementById(id);
            var nodeTop = node.offsetTop;
            var nodeHeight = node.offsetHeight;
            var body = document.body;
            var html = document.documentElement;
            var height = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            var windowHeight = window.innerHeight
            var offset = window.pageYOffset;
            var delta = nodeTop - offset;
            var bottomScrollableY = height - windowHeight;
            var targetY = (bottomScrollableY < delta) ?
                (bottomScrollableY - (height - nodeTop - nodeHeight + offset)):
                delta - 30;
    
            startTime = Date.now();
            percentage = 0;
    
            if (this.timer) {
                clearInterval(this.timer);
            }
    
            function step () {
                var yScroll;
                var elapsed = Date.now() - startTime;
    
                if (elapsed > settings.duration) {
                    clearTimeout(this.timer);
                }
    
                percentage = elapsed / settings.duration;
    
                if (percentage > 1) {
                    clearTimeout(this.timer);
    
                    if (callback) {
                        callback();
                    }
                } else {
                    yScroll = settings.easing.outQuint(0, elapsed, offset, targetY, settings.duration);
                    window.scrollTo(0, yScroll);
                    this.timer = setTimeout(step, 10);     
                }
            }
    
            this.timer = setTimeout(step, 10);
        }
    };
    const setTab = (tab) => {
        setTabId(tab)
    }
    // console.log(product);
    return (
        <div className="ProductDetail">
            <Header/>  
                {
                    product !==null && <ProductBody 
                     product={product}
                     scrollOnLick={handleClick}
                     /> 
                }
                { 
                    product !==null &&
                    <ProductReview
                        product={product}
                        bRef={bRef}
                        tabId={tabId}
                        setTab={setTab}
                        id={"review"}/>
                }
                { 
                    product !==null &&
                    <ProductRecommend
                        product={product}
                    /> 
                }
            <Footer/>
        </div>
    )
}