import React, { useEffect} from "react";
import "../App.css";
// import Collection from '../components/Home/Collection.js'
// import RecommendBanner from "../components/Home/RecommendBanner.js"
import HomeTab from "../components/Home/HomeTab.js";
// import FashionNews from '../components/Home/FashionNews.js'
// import Newsletter from "../components/Layouts/Newsletter.js"
import Footer from "../components/Layouts/Footer.js";
import Banner from '../components/Banner/Banner.js';
import Header from '../components/Header/Header.js';
import LoadingPage from  '../components/LoadingPage';

function Home() {
    useEffect(()=>{
        window.scrollTo(0,0);
        document.body.style.overflow = 'unset';
    },[])

    return (
        <div className="Home">
            <LoadingPage active="false"/>
            <Header/>
            <Banner/>
            <HomeTab/>
            {/* <FashionNews/> */}
            {/* <Newsletter/> */}
            <Footer/>
        </div>
    )
}
export default Home;
