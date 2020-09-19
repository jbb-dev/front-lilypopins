import React from 'react'
import { Link } from "react-router-dom"
import './results.css'

const SearchResultCard = (props) => {

    const userID = props.fullResult.id

    return (

        <div className='mainResultCard'>
            <Link to={{ pathname: `/search/results/${userID}`, id: {userID} }} className='link'>
                <div className="contact_leftside">    
                    <img className="avatar" src='https://randomuser.me/api/portraits/men/84.jpg' alt="avatar"></img>
                    <p className="name">{props.fullResult.user_firstname}</p>
                </div>

                <div className="contact_rightside">    
                    <p className="biography">{props.fullResult.user_biography}</p>
                </div> 
            </Link>                         
        </div>
        

    )
}

export default SearchResultCard