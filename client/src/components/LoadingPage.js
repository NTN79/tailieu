import React, { useEffect, useState } from 'react';
import '../Styles/LoadingPage.css'
import Div100vh from 'react-div-100vh';

export default function LoadingPage(props) {
  const [isActive , setIsActive] = useState(props.active);
  useEffect(() => {
    setTimeout(() => {
      setIsActive(false);
    }, 3500);
  });
    return(
        <Div100vh 
            className={isActive ? "loading-page" : "loading-page disable-loading"}
        >
            <div className="loading-page-container flex-center">
                <p className="loading-text hello">Hello!</p>
            </div>
            <div className="loading-page-container flex-center">
                <p className="loading-text welcome">Welcome to ABC shop</p>
            </div> 
        </Div100vh>
    )
}