import React from 'react';
import '../../App.css';
import {
    withRouter
} from 'react-router-dom'

function Dropdown(props) {
    
    const sex = props.label.toLowerCase()
    const redirect = (event) => {
        window.scrollTo(0,0);
        props.history.push(`${event.target.id}`)
        props.handleLeaveHover()
    }
    return(
        <div className="Dropdown" style={{display:'block'}}>
            <div className="dropdown-container ">
                { props.dropdownContent.map((item, index) => {
                    return (
                        <div 
                            className="dropdown-col flex"
                            key={index}
                        >
                            <div>
                                {item.dropdownTitle &&
                                    <div 
                                        id = {`shop`}
                                        onClick={redirect}
                                        className="dropdown-title">{item.dropdownTitle}
                                    </div>
                                }
                                <div className="dropdown-item flex-col">
                                    {
                                        item.dropdownList.map((item, index) => {
                                            return (
                                                <div
                                                    id = {`${sex}/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                    onClick={redirect}
                                                    key={index}
                                                    style={{textTransform: 'capitalize', cursor: 'pointer'}}
                                                >
                                                    {item}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default withRouter(Dropdown)