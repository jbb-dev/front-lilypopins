import React from "react"
import { useHistory } from "react-router-dom";
import './back.css'

const Back = (props) => {

    let history = useHistory();

    return(

    <div >
            <button className="back-button" onClick={()=>history.goBack()}>
                {props.title}
            </button>
    </div>

    )
}

export default Back