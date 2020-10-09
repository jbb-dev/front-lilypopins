import React from 'react'
import './selectButton.css'

const SelectButton = (props) => {
    
    return (
        <div>
        <div className="selectBtn-list">
            <input type="radio" className="radioSelBtn" 
            id={props.radioSelBtnId} 
            name={props.radioSelBtnName} 
            value={props.radioSelBtnValue} 
            onClick={props.onClick}
            onChange={props.onChange}
            />
            <label htmlFor={props.radioSelBtnId}>{props.radioSelBtnId} </label>
        </div>
        </div>
    
    )}

export default SelectButton