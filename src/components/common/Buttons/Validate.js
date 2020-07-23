import React from 'react'
import './validate.css'

const ButtonValidate = (props) => {

return (
    <div className="validate-button">
        <button id="validate-button" onClick={props.onClick}>
            <i class="fas fa-check"></i>
            <p>{props.title}</p>
        </button>
    </div>
    )
}

export default ButtonValidate
