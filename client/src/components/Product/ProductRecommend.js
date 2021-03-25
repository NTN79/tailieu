import React, { useEffect, useState } from 'react';
import '../../App.css';
import Product from '../Product/Product.js';
import axios from 'axios';
import {API_URL} from '../../config/apiConfig';


export default function ProductRecommend(props) {

    const [products, setProducts] = useState([]);
    let productInfo = [];
    if (props.product) {
        productInfo = props.product;
    }

    useEffect(() => {
        axios.get(`${API_URL}/api/product`)
        .then(res => {
                setProducts(res.data.data);
        })
    },[])

    const recommendProducts = [];
    products.filter((item) => {
        if (item.productId !== productInfo.productId) {
            if (item.gender === productInfo.gender) { 
                if (productInfo.price >= item.price ) {
                    recommendProducts.push(item)
                } else {
                    recommendProducts.push(item)
                }
            }
        }
        return null;
    })

    let recommendProducts2 = recommendProducts.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    })

    return(
        <div className="ProductRecommend">
            <div className="newsletter-container flex-center">
                <div className="newsletter-title">Sản phẩm Khác</div>
                <div className="RecommendProduct">
                    {recommendProducts2.slice(0,5).map(function(item, index) {
                        return (
                            <Product 
                                key={index}
                                product={item}
                            />
                        )
                    })}
                </div>
            </div>
            <div className="product-info-line"></div>
        </div>
    )
}
