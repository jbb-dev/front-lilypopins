import React from 'react'
import { Link } from "react-router-dom"
import './resultCard.css'

const SearchResultCard = (props) => {
    const { id, firstname, lastname, age, avatar, city, Children} = props.data

    // for better understanding :
    const userId = id

    return (
        <>
        <Link to={{ pathname: `/search/results/${userId}`}} style={{ textDecoration: "none" }} >
            <div className='main-result-card'>
                        <img className="avatar" src={avatar} alt="avatar"></img>
                        <h5 className="parent-info">{firstname} {lastname}</h5>
                        <p className="parent-info">Habite à {city}</p>
                        {Children.length > 1 ? 
                            <p>Parent de {Children.length} enfants</p>
                        : Children.length === 1 ? 
                            <p>Parent de {Children.length} enfant</p>
                        : null}
            </div>
        </Link>                         
        </>
        

    )
}

export default SearchResultCard