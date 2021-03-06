import React from 'react'
import { Link } from "react-router-dom";
import './childCard.css'



const ChildCard = (props) => {
    const { id, firstname, age, section, biography, avatar } = props.data

    return (
        <>
        <Link   
            to={{
                pathname : `/my-children/${id}`,
                chilId : id}} 
            style={{ textDecoration: "none" }} >
            <div className='main-child-card' >
                    <img className="avatar" src={avatar} alt="avatar"></img>
                    <h5>{firstname}</h5>
                    <p>{age > 1 ? age + ' ans' : age + ' an'}</p>
            </div>
        </Link>
        </>
    )
}

export default ChildCard