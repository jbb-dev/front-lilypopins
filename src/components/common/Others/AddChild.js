import React from 'react'
import { Link } from "react-router-dom";
import './addChild.css'


const AddChild = () => {

    return (
        <>
        <Link to="/add-my-child" style={{ textDecoration: "none" }}>
            <div className='main-add-child'>
                <p>Cliquez ici pour ajouter votre enfant</p>
                <span className='add-icon-button'>
                    <i class="fas fa-plus-circle"></i>
                </span>
            </div>  
        </Link> 
        </>
    )
}

export default AddChild