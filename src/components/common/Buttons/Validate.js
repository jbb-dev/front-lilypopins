import React from 'react'
import './validate.css'

const ButtonValidate = (props) => {

return (
    <div className="validate-button">
        <button id="validate-button" onClick={props.onClick} className={props.status === "active" ? "validate-button-active" : "validate-button-passive"}>
            <div className='button-content'>
                <i className="fas fa-check"></i>
                <p>{props.title}</p>
            </div>
        </button>
    </div>
    )
}

export default ButtonValidate
