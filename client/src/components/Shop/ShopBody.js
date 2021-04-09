import React, { useEffect, useState } from 'react';
import '../../App.css';
import Product from '../Product/Product.js'
import RangeSlider from './RangeSlider.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faFilter, faTh, faThLarge, faTimes } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config/apiConfig';

function ShopBody(props) {

    const [product, setProduct] = useState([]);
    const [constProduct, setConstProduct] = useState([]);
    const [gridTab, setGridTab] = useState(3);
    const [currentTab, setCurrentTab] = useState(1);
    const location = props.location.pathname.split('/')[1];
    const [trademark,setTrademark] = useState([]);
    const [sortPriceValue, setSortPriceValue] = useState([])
    const machineProduct = ['Automatic (Tự Động)',"Quartz (Pin)","Eco-Drive (Năng Lượng Ánh Sáng)"]

    useEffect(()=>{
        // console.log(props.products)
        setProduct(props.products)
        setConstProduct(props.products)
    }, [props.products])
    useEffect(() => {
        axios.get(`${API_URL}/api/trademark`)
        .then(res=>{
            setTrademark(res.data.data);
        });
    },[]);
    let width, height, parentHeight, marginLeft, marginRight, classWidth = "";
    if (gridTab === 1) {
        width = `${100/6}%`; // six
        parentHeight = `${100/6}vw`;
        height = `calc(${parentHeight} - 68px)`;
    } else if (gridTab === 2) {
        width = '20%'; // five;
        parentHeight = '20vw';
        height = `calc(${parentHeight} - 68px)`;
    } else if (gridTab === 3) {
        width = '25%'; // four
        parentHeight = '25vw';
        height = `calc(${parentHeight} - 68px)`;
    }

    const hotProduct = [...product];
    if (hotProduct.length > 0) { 
        hotProduct.sort((a,b) => b.price - a.price)
    }
    const newProductVirtual = [...product];
    const newProduct = [];
    if (newProductVirtual) {
        newProductVirtual.sort((a,b)=> new Date(b.dayAdd) - new Date(a.dayAdd));
        for (let i in newProductVirtual) {
            const today = new Date();
            const productDate = new Date(newProductVirtual[i].dayAdd);
            if (((today - productDate)/(1000 * 3600 * 24)) < 10) {
                newProduct.push(newProductVirtual[i])
            }
        }
    }

    const chooseCateLink = (event) => {
        props.history.push(`/${location}/${(event.target.id).toLowerCase().split(' ').join('-')}`)
    }

    const chooseMachine = (event) => {
        const id = event.target.id
        setProduct(constProduct.filter(product=>{
            return (product.detail.machine.toLowerCase().includes(id.toLocaleLowerCase()))
        }));
    }

    const choosePrice = () => {
        const virtualProduct = []
        for (let i in constProduct) { 
            if (constProduct[i].price >= sortPriceValue[0] && constProduct[i].price <= sortPriceValue[1]) {
                virtualProduct.push(constProduct[i])
            }
        }
        setProduct(virtualProduct)
    }

    const [filterBox, setFilterBox] = useState(false)
    const [cateFilter, setCateFilter] = useState("")
    const [machineFilter, setMachineFilter] = useState("")
    const openFilterBox = () => {
        setFilterBox(true)
    }

    const filterMobile = () => {
        const virtualProduct = [] 
        if (cateFilter !== "") {
            for (let i in constProduct) { 
                if (constProduct[i].trademark.name.toLowerCase() === cateFilter.toLowerCase()) {
                    virtualProduct.push(constProduct[i])
                }
            }
        }
        if (virtualProduct.length === 0) {
            virtualProduct.push(...constProduct)
        }
        const virtualProduct2 = []
        if (machineFilter !== "") {
            for (let i in virtualProduct) { 
                if (virtualProduct[i].detail.machine.toLowerCase().includes(machineFilter.toLocaleLowerCase())) {
                    virtualProduct2.push(virtualProduct[i])
                }
            } 
        }
        if (virtualProduct2.length === 0) {
            virtualProduct2.push(...virtualProduct)
        }
        const virtualProduct3 = [] 
        for (let i in virtualProduct2) { 
            if (virtualProduct2[i].price >= sortPriceValue[0] && virtualProduct2[i].price <= sortPriceValue[1]) {
                virtualProduct3.push(virtualProduct2[i])
            }
        } 
        if (virtualProduct3.length === 0) {
            virtualProduct3.push(...virtualProduct2)
        }
        setProduct(virtualProduct3)
        setFilterBox(false)
    } 

    const [limit, setLimit] = useState(6);
    const [loading, setLoading] = useState(false);

    const loadMore = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setLimit(limit + 5);
        }, 1500);
    }
    //Limit products
    const limitProduct = product.slice(0, limit);
    const limitProductHot = hotProduct.slice(0, limit);
    const limitProductNew = newProduct.slice(0, limit);

    return(
        <div className="ShopBody">
            <div className="shopbody-container">
                <div className="shopbody-filter">
                    <div className="shopbody-filter-cate">
                        <div className="shopbody-filter-title">Thương Hiệu</div>
                        <div className="shopbody-filter-catelist">
                            {trademark.map((item, index) => 
                                <div 
                                    className="shopbody-filter-catelink" 
                                    key={index}
                                    id={item.name}
                                    onClick={chooseCateLink}
                                >
                                    {item.name}
                                </div>
                            )}
                        </div>
                        <div className="filter-line"></div>
                    </div>
                    <div className="shopbody-filter-size">
                        <div className="shopbody-filter-title">Loại máy</div>
                        <div className="shopbody-filter-catelist">
                            {
                                machineProduct.map((item,index)=>{
                                    return (
                                        <div 
                                            className="shopbody-filter-catelink" 
                                            id={item.split(' ')[0]}
                                            onClick={chooseMachine}
                                            key={item}
                                        >
                                           {item}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="filter-line"></div>
                    </div>
                    <div className="shopbody-filter-price">
                        <div className="shopbody-filter-title">Giá Tiền</div>
                        <RangeSlider
                            setSortPriceValue={setSortPriceValue}
                        />
                    </div>
                    <div 
                        className="shopbody-filter-submit btn"
                        onClick={choosePrice}
                    >
                        <p>Lọc Theo Giá </p>
                    </div>
                </div>
                <div className="shopbody-main">
                    <div className="shopbody-first flex">
                        <div className="shopbody-countproduct">{product.length} products</div>
                        <div className="shopbody-tab flex">
                            <div 
                                onClick={() => {setCurrentTab(1)}}
                                className={currentTab === 1 ? "shopbody-tab-item active" : "shopbody-tab-item"}
                                >
                                Tất cả sản phẩm
                            </div>
                            <div 
                                onClick={() => {setCurrentTab(2)}}
                                className={currentTab === 2 ? "shopbody-tab-item active" : "shopbody-tab-item"}
                                >
                                Sản phẩm nổi bật
                            </div>
                            <div 
                                onClick={() => {setCurrentTab(3)}}
                                className={currentTab === 3 ? "shopbody-tab-item active" : "shopbody-tab-item"}
                                >
                                Sản phẩm mới
                            </div>
                        </div>

                        <div className="shopbody-option flex">
                            <div className="shopbody-option-grid flex">
                                <div 
                                    className="grid-icon-container"
                                    onClick={()=> { setGridTab(1) }}
                                >
                                    <FontAwesomeIcon 
                                            icon={faTh} 
                                            className={gridTab === 1 ? "grid-icon grid-icon-active" : "grid-icon"}
                                        />
                                </div>
                                <div className="grid-icon-container">
                                    <FontAwesomeIcon 
                                            icon={faThLarge} 
                                            className={gridTab === 2 ? "grid-icon grid-icon-active" : "grid-icon"}
                                            onClick={()=> { setGridTab(2) }}
                                        />
                                </div>
                                <div className="grid-icon-container">
                                    <FontAwesomeIcon 
                                            icon={faCircle} 
                                            className={gridTab === 3 ? "grid-icon grid-icon-active" : "grid-icon"}
                                            onClick={()=> { setGridTab(3) }}
                                        />
                                </div>
                            </div>
                            <div className="shopbody-option-filter flex"
                                onClick={openFilterBox}>
                                <FontAwesomeIcon icon={faFilter} className="filter-icon"/>
                                <p style={{marginLeft: '10px'}}>Lọc</p>
                            </div>
                            {
                                filterBox && 
                                <div className="filter-box">
                                    <div className="filter-box-header flex"style={{color: '#111'}}>
                                        <p >Bộ Lọc</p>
                                        <div  
                                            onClick={()=>{
                                                setFilterBox(false)
                                            }}
                                            style={{
                                                height: '40px', 
                                                width: '40px',  
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-start',
                                                fontSize: '20px'
                                            }}>
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </div>
                                    </div>
                                    <div className="filter-box-main flex-col">
                                        <select 
                                            className="input"
                                            value={cateFilter}
                                            onChange={(event)=>{
                                                if (event.target.value === "Select a category") {
                                                    setCateFilter("")
                                                } else {
                                                    setCateFilter(event.target.value)
                                                }
                                        }}>
                                            <option>chọn hãng</option>
                                            {
                                                trademark.map((item, index) => 
                                                    <option  
                                                        key={index} 
                                                    >
                                                        {item.name}
                                                    </option>
                                                )
                                            }
                                        </select> 
                                        <select className="input"
                                            value={machineFilter}
                                            onChange={(event)=>{
                                                if (event.target.value === "Any size") {
                                                    setMachineFilter("")
                                                } else {
                                                    setMachineFilter(event.target.value)
                                                }
                                            }}
                                        >
                                            <option>Tất cả các loại</option>
                                            {
                                                 machineProduct.map((item,index)=>{
                                                    return (
                                                        <option key={index}>{item.split(' ')[0]}</option>
                                                    )
                                                })
                                            }
                                        </select> 
                                        <div>
                                            <div className="filter-box-text">Giá</div>
                                            <RangeSlider
                                                setSortPriceValue={setSortPriceValue}
                                            />
                                        </div>
                                        <div 
                                            className="shopbody-filter-submit btn"
                                            onClick={filterMobile}
                                        >
                                            <p>Lọc sản phẩm</p>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="shopbody-line"></div>
                    { currentTab === 1 &&
                        <div className="shopbody-products">
                            {
                                product.length>0 &&
                                limitProduct.map(function(item, index) {
                                    return (
                                        <Product
                                            key={index}
                                            product={item}
                                            width={width}
                                            height={height}
                                            parentHeight={parentHeight}
                                            marginLeft={marginLeft}
                                            marginRight={marginRight}
                                            gridTab={gridTab}
                                            classWidth={classWidth}
                                        />
                                    )
                                })
                            }
                        </div>
                    }
                    { currentTab === 2 &&
                        <div className="shopbody-products">
                            {
                                limitProductHot.length === 0 &&
                                <div style={{
                                    textAlign: 'center',
                                    width: '100%',
                                    textTransform: 'capitalize',
                                    marginTop: '150px'
                                }}>
                                    Không tìm thấy sản phẩm...!
                                </div>
                            }
                            {limitProductHot.map(function(item, index) {
                                return (
                                    <Product
                                        key={index}
                                        product={item}
                                        width={width}
                                        height={height}
                                        parentHeight={parentHeight}
                                        marginLeft={marginLeft}
                                        marginRight={marginRight}
                                        gridTab={gridTab}
                                        classWidth={classWidth}
                                    />
                                )
                            })}
                        </div>
                    }
                    { currentTab === 3 &&
                        <div className="shopbody-products">
                            {
                                limitProductNew.length === 0 &&
                                <div style={{
                                    textAlign: 'center',
                                    width: '100%',
                                    textTransform: 'capitalize',
                                    marginTop: '150px'
                                }}>
                                    Không tìm thấy sản phẩm...!
                                </div>
                            }
                            {limitProductNew.map(function(item, index) {
                                return (
                                    <Product
                                        key={index}
                                        product={item}
                                        width={width}
                                        height={height}
                                        parentHeight={parentHeight}
                                        marginLeft={marginLeft}
                                        marginRight={marginRight}
                                        gridTab={gridTab}
                                        classWidth={classWidth}
                                    />
                                )
                            })}
                        </div>
                    }
                    {(product.length > 10 && product.length >= limit) && 
                        <div className="tab-loadmore flex-center">
                            <div 
                                className="tab-loadmore-btn btn"
                                onClick={loadMore}
                                >
                                Xem thêm
                            </div>
                            {loading === true && 
                                <div className="tab-loadmore-btn tab-loadmore-loading btn-nothover">
                                    <div className="loading-icon"></div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
            <div className="shopbody-line"></div>
        </div>
    )
}
export default withRouter(ShopBody)
