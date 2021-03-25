import React from 'react';
import '../../App.css';



export default function ProductReview(props) {

    return(
        <div className="ProductReview" ref={props.bRef} id={props.id}>
            <div className="productreview-container">
                <div className="productreview-tab flex-center">
                    <div 
                        className={props.tabId === 0 ? "productreview-title search-tab-active" : "productreview-title"}
                        onClick={()=>{props.setTab(0)}}>
                        thông tin sản phẩm
                    </div>
                    <div 
                        className={props.tabId === 1 ? "productreview-title search-tab-active" : "productreview-title"}
                        onClick={()=>{props.setTab(1)}}>
                         bình luận
                       
                    </div>
                </div>
                <div className="productreview-content">
                    {
                        props.tabId === 0 && 
                        <div className="productreview-text"> 
                            {props.product.description}
                        </div>
                    }
                    {
                        props.tabId === 1 && 
                        <div className="productreview-list"> 
                           
                            <div className="productreview-review">
                              <div>Đang cập nhật</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="product-info-line"></div>
        </div>
    )
}
