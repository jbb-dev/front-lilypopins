import React from "react"
import { Link } from "react-router-dom";
import './back.css'

const Back = (props) => {

    return(

    <div >
        <Link to={props.link}>
            <button className="back-button">
            {props.title}
            </button>
        </Link>
    </div>

    )
}

export default Back