import React from 'react';
import '../../App.css';



export default function ProductReview(props) {
    const product = props.product;
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
                            <div className="product-detail-content">
                                <div className="product-detail-label">THƯƠNG HIỆU</div>
                                <div className="product-detail-text">{product.trademark.name}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">TÊN SẢN PHẨM</div>
                                <div className="product-detail-text">{product.name}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">CODE</div>
                                <div className="product-detail-text">{product.code}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">GIỚI TÍNH</div>
                                <div className="product-detail-text">{product.gender}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">XUẤT XỨ</div>
                                <div className="product-detail-text">{product.detail.madeIn}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">MÁY</div>
                                <div className="product-detail-text">{product.detail.machine}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">ĐƯỜNG KÍNH MẶT</div>
                                <div className="product-detail-text">{product.detail.size} mm</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">BỀ DÀY MẶT</div>
                                <div className="product-detail-text">{product.detail.thickness} mm</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">DÂY ĐEO</div>
                                <div className="product-detail-text">{product.detail.strap}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">MÀU MẶT SỐ</div>
                                <div className="product-detail-text">{product.detail.color}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">CHỐNG NƯỚC</div>
                                <div className="product-detail-text">{product.detail.waterproof}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">CHỨC NĂNG	</div>
                                <div className="product-detail-text">{product.detail.function}</div>
                            </div>
                            <div className="product-detail-content">
                                <div className="product-detail-label">BẢO HÀNH	</div>
                                <div className="product-detail-text">{product.detail.guarantee} tháng</div>
                            </div>
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
