import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Animation.css';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import Div100vh from 'react-div-100vh';

function Banner (props) {
    const [currentBanner, setCurrentBanner] = useState(1);
    useEffect(()=>{
        const slide = setInterval(() => {
            setCurrentBanner(currentBanner + 1)
        }, 5000);
        return() => {
            clearInterval(slide)
        }
    }, [currentBanner])

    if (currentBanner > 4) {
        setCurrentBanner(1)
    }
    
    return(
        <div className="Banner flex-center">
            <Div100vh className="banner-container">
                <div className={classNames('banner-first flex-center', {
                    hide: currentBanner !== 1
                })}></div>
                <div className={classNames('banner-second flex-center', {
                    hide: currentBanner !== 2
                })}></div>
                <div className={classNames('banner-third flex-center', {
                    hide: currentBanner !== 3
                })}></div>
                <div className={classNames('banner-four flex-center', {
                    hide: currentBanner !== 4
                })}></div>
            </Div100vh>
            <div className="choose-slide flex-center">
                <div 
                    className={classNames('choose-line', {
                        choose_line_active: currentBanner === 1
                    })}
                    onClick={()=> {setCurrentBanner(1)}}
                ></div>
                <div 
                    className={classNames('choose-line', {
                        choose_line_active: currentBanner === 2
                    })}
                    onClick={()=> {setCurrentBanner(2)}}
                ></div>
                <div 
                    className={classNames('choose-line', {
                        choose_line_active: currentBanner === 3
                    })}
                    onClick={()=> {setCurrentBanner(3)}}
                ></div>
                <div 
                    className={classNames('choose-line', {
                        choose_line_active: currentBanner === 4
                    })}
                    onClick={()=> {setCurrentBanner(4)}}
                ></div>
            </div>
        </div>
    )
}
export default withRouter(Banner);