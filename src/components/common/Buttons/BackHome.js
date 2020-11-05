import React from "react"
import { Link } from "react-router-dom";
import './backHome.css'

const Back = () => {

    return(

    <div >
        <Link to='/home'>
            <button className="back-button">Accueil</button>
        </Link>
    </div>

    )
}

export default Back