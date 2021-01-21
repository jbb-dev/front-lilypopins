import React, { useState } from "react";
import "./slidingButton.css";


const SlidingButton = (props) => {
    const {id, text, isAvailable, setIsAvailable, onClick} = props

    // const [isChecked, setIsCheked] = useState(false)
    
    // const toggleCheckBox = () => {
    //     setIsCheked(!isChecked)
    // }
    
  return (
        <div className="slidingButton-check">
            <div className="slidingButton-check">
                {text}
            </div>
            <div className="slidingButton-check">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    id={id}
                    name={id}
                    value={isAvailable}
                    onChange={setIsAvailable}
                    checked={isAvailable}
                />
                <label className="custom-control-label" htmlFor={id}></label>
            </div>
        </div>
  );
}

export default SlidingButton;
