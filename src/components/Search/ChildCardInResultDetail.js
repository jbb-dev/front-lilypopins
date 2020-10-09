import React from 'react'
import './childCardInResultDetail.css'



const ChildCardInResultDetail = (props) => {
    const { id, firstname, age, section, biography, avatar } = props.data

    return (
        <>
            <div className='main-child-card-result-detail' >
                    <img className="avatar" src={avatar} alt="avatar"></img>
                    <h5>{firstname}</h5>
                    <p>{age > 1 ? age + ' ans' : age + ' an'}</p>
                    <p>{section}</p>

            </div>
        </>
    )
}

export default ChildCardInResultDetail