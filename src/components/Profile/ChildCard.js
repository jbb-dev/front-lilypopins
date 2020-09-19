import React from 'react'
import './childCard.css'



const ChildCard = (props) => {
    const { firstname, age, section, biography, avatar } = props.data

    return (
        <div className='main-child-card'>
                <img className="avatar" src='https://randomuser.me/api/portraits/men/84.jpg' alt="avatar"></img>
                <h5>{firstname}</h5>
                <p>{age} ans</p>
        </div>
    )
}

export default ChildCard