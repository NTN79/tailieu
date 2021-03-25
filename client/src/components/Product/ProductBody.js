import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faAngleRight, faCartPlus, faChevronLeft, faChevronRight, faHeart, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import { CartContext } from '../../contexts/Cart';

export default function ProductBody(props) {
    // function slugify(str){
    //         str = str.replace(/^\s+|\s+$/g, ''); // trim
    //         str = str.toLowerCase();

    //         // remove accents, swap ñ for n, etc
    //         var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    //         var to   = "aaaaaeeeeeiiiiooooouuuunc------";
    //         for (var i=0, l=from.length ; i<l ; i++) {
    //             str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    //         }

    //         str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    //             .replace(/\s+/g, '-') // collapse whitespace and replace by -
    //             .replace(/-+/g, '-'); // collapse dashes

    //         return str;    // Trim - from end of text
    // }
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 70;
        const y = ((e.pageY - top) / height) * 70;
        setZoom(`${x}% ${y}%`);
    };

    const [imgIndex, setImgIndex] = useState(0);
    const [countCart, setCountCart] = useState(1);
    const [zoom, setZoom] = useState(`0% 0%`);
    const [toast,setToast]= useState(false);
    const productSmall = useRef(null);
    const product= props.product;

    useEffect(() => {
        if (product!==null) {
           if (imgIndex >= product.images.length) { 
               setImgIndex(0);
            }

            if (window.innerWidth > 900) {
                if (product.images.length > 4) {
                    if (imgIndex === 1 || imgIndex === 2) {
                        productSmall.current.style.transform= `translateY(0px)`
                    } else if (imgIndex === product.images.length - 1) {
                        productSmall.current.style.transform= `translateY(-${(imgIndex-5) * 110 + 50}px)`
                    } else if (imgIndex === product.images.length - 2) {
                        productSmall.current.style.transform= `translateY(-${(imgIndex-4) * 110 + 50}px)`
                    } else if (imgIndex === product.images.length - 3) {
                        productSmall.current.style.transform= `translateY(-${(imgIndex-3) * 110 + 50}px)`
                    } else if (imgIndex > 2) {
                        productSmall.current.style.transform= `translateY(-${(imgIndex-2) * 110}px)`
                    } else {
                        if (productSmall.current) {
                            productSmall.current.style.transform= `translateY(0px)`
                        }
                    }
                }
            } else {
                if (product.images.length > 4) {
                    console.log(imgIndex)
                    if (imgIndex === 1 || imgIndex === 2) {
                        productSmall.current.style.transform= `translateX(0px)`
                    } else if (imgIndex === product.images.length - 1) {
                        productSmall.current.style.transform= `translateX(-${(imgIndex-5) * 85 + 105}px)`
                    } else if (imgIndex === product.images.length - 2) {
                        productSmall.current.style.transform= `translateX(-${(imgIndex-4) * 85 + 105}px)`
                    } else if (imgIndex === product.images.length - 3) {
                        productSmall.current.style.transform= `translateX(-${(imgIndex-3) * 85 + 105}px)`
                    } else if (imgIndex > 2) {
                        productSmall.current.style.transform= `translateX(-${(imgIndex-2) * 85}px)`
                    } else {
                        if (productSmall.current) {
                            productSmall.current.style.transform= `translateX(0px)`
                        }
                    }
                }
            }
        }
    },[])

    
    let productDate = new Date()
    // console.log(product); 
    let today = new Date()
    const ratingStar = {
        size: 12,
        value: 5,
        edit: false,
        activeColor: "#fda32a",
        color: "#ddd",
        isHalf: true
    }
    const sliderWidth = useRef(null)
    const [loading, setLoading] = useState(0);

    const { 
        addToCart,
        addToWishList
    } = useContext(CartContext);
    const cartClick = () => { 
        setLoading(1);
        setToast(true);
        setTimeout(()=>{
            setToast(false);
            setLoading(0); 
            addToCart(product, countCart);
        }, 500)
        setCountCart(1)
    }
    const wishListClick = () => {
        setLoading(2)
        setTimeout(()=>{
            setLoading(0)
            addToWishList(product)
        }, 500)
    }
    return(
        <div className="ProductBody">
             <div className={toast ? "toast toast-show" : "toast"} style={{top: '20px'}}>
                        <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
                        Sản phẩm đã thêm vào giỏ...!
            </div>
            <div className="product-breadcrumb flex">
                <Link to="/" className="breadcrumb-item breadcrumb-link">Home</Link>
                <FontAwesomeIcon icon={ faAngleRight } className="breadcrumb-arrow"/>
                <Link to="/" className="breadcrumb-item breadcrumb-link">{product.trademark.name}</Link>
                <FontAwesomeIcon icon={ faAngleRight } className="breadcrumb-arrow"/>
                <div className="breadcrumb-item breadcrumb-product">{product.name}</div>
            </div>

            <div className="product-detail flex">
                <div className="product-gallery flex"
                    // onMouseEnter={()=> {setHover(true)}}
                    // onMouseLeave={()=> {setHover(false)}}
                ><div 
                        className="product-small" ref={productSmall}
                    >
                        { product.images && product.images.map((item, index) => {
                            return (
                                <div 
                                    key={index}
                                    className={imgIndex === index ? "product-small-item product-small-item-active" : "product-small-item"}>
                                    <img 
                                        src={item.path}
                                        onClick={()=>{ setImgIndex(index)}}
                                        alt=""
                                        ></img>
                                </div>
                            )
                        })}
                    </div>
                    <div
                        className="product-slider flex"
                        onMouseMove={handleMouseMove}
                        ref={sliderWidth}
                        >
                        <div className="product-tag">
                            {/* {
                                product.productSale > 0 && <div className="product-tag-item sale">
                                    {product.productSale}%
                                </div>
                            } */}
                            {
                                product.amount <10 && <div className="product-tag-item hot">
                                    HOT
                                </div>
                            }
                            {
                                (today - productDate)/ (1000 * 3600 * 24) < 7 && <div className="product-tag-item new">
                                    NEW 
                                </div>
                            }
                        </div>
                        {product.images && product.images.map((item, index) => {
                            // console.log(sliderWidth.current.offsetWidth);
                            const width =(sliderWidth.current!==null)?sliderWidth.current.offsetWidth:650;
                            return (
                                <div
                                    key={index}
                                    className="product-big flex" 
                                    style={{ 
                                        transform: `translateX(-${width * imgIndex}px`,
                                        backgroundImage: `url(${item.path})`,
                                        backgroundPosition: `${zoom}`
                                    }}>
                                    <div className="product-big-item">
                                        <img 
                                            id={index}
                                            className="nodrag"
                                            style={{ width: `${width}px`}}
                                            src={item.path}
                                            alt={product.name}
                                            ></img>
                                    </div>
                                </div>
                            )
                        })}
                        <div 
                            className="change-product left"
                            onClick={()=> {
                                if (imgIndex > 0) setImgIndex(imgIndex - 1)
                            }}
                            >
                            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
                        </div>
                        <div className="change-product right"
                            onClick={()=> {
                                if (imgIndex < product.images.length-1 && product.images.length>0) {
                                    setImgIndex(imgIndex + 1)
                                }
                                else  setImgIndex(0)

                            }}
                            >
                            <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
                <div className="product-info-detail">
                    <div className="product-info-title">
                        {product.name}
                    </div>
                    <div className="product-info-des">
                        {product.description}
                    </div>
                    <div 
                        className="product-info-vote"
                        // onClick={props.scrollOnLick}
                        >
                        <ReactStars {...ratingStar} />
                        
                    </div>
                    <div className="product-info-price">
                        {(product.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Đ
                    </div>
                    <div className="product-info-cart flex">
                        <div className="count-cart noselect">
                            <div className="count-cart-item left flex-center"
                                onClick={() => { 
                                    if (countCart > 1) setCountCart(countCart-1) 
                                }}
                                >
                                <FontAwesomeIcon icon={faMinus}/>
                            </div> 
                            <div className="count-cart-item text flex-center">
                                <form>
                                    <input 
                                        type="text" 
                                        value={countCart}
                                        onChange={(e) => { 
                                            setCountCart(Number(e.target.value.replace(/\D+/g, ''))) 
                                        }}
                                    />
                                </form>
                            </div>
                            <div 
                                className="count-cart-item right flex-center"
                                onClick={() => { setCountCart(countCart+1) }}
                                >
                                <FontAwesomeIcon icon={faPlus}/>
                            </div>
                        </div>
                        { loading === 1 && 
                            <div className="product-info-addtocart flex-center btn" onClick={cartClick} >
                                <div className="loading-icon"></div> 
                            </div>
                        }
                        { loading !== 1 &&  
                            <div className="product-info-addtocart flex-center btn" onClick={cartClick} >
                                <FontAwesomeIcon icon={faCartPlus}/>
                                <p>Add to cart</p>
                            </div>
                        }
                        { loading === 2 && 
                            <div className="product-info-wishlist flex-center" onClick={cartClick} >
                                <div className="loading-icon"></div>
                            </div>
                        }
                        { loading !== 2 &&  
                            <div 
                                className="product-info-wishlist flex-center"  onClick={wishListClick}>
                                <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                            </div>
                        }
                    </div>
                    <div className="product-info-line"></div>
                    <div className="product-info-cate flex">
                        <p>Thương Hiệu:</p>
                        <p>{product.trademark.name}</p>
                    </div>
                    <div className="product-info-line"></div>
                </div>
            </div>
            <div className="product-info-line mobile-disable-line"></div>
        </div>
    )
}
