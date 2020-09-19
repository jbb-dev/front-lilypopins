import React from 'react'
import './next.css'

const ButtonNext = (props) => {

return (
    <div className="next-button">
        <button id = "next-button" className={props.status === "active" ? "next-button-active" : "next-button-passive"} onClick={props.onClick}> 
            {props.title}
        </button>
    </div>
    )
}

export default ButtonNext
