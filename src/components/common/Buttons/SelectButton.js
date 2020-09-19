import React from 'react'
import './selectButton.css'

const SelectButton = (props) => {
    
    return (
        <div>
        <div className="selectBtn-list">
            <input type="radio" class="radioSelBtn" 
            id={props.radioSelBtnId} 
            name={props.radioSelBtnName} 
            value={props.value} 
            onClick={props.onClick}
            />
            <label for={props.radioSelBtnId}>{props.radioSelBtnId} </label>
        </div>
        </div>
    
    )}

export default SelectButton