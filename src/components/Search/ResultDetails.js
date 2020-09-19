import React, { useState, useEffect} from "react"
import Axios from 'axios'
import emailjs from 'emailjs-com';
import { Link } from "react-router-dom"
import './results.css'
import Header from '../common/Header/Header'
import ButtonValidate from '../common/Buttons/Validate'



const ResultDetails = (props) => {

    const userId = Number(props.match.params.id)

    const [dataUser, setDataUser] = useState([])


    const templateParams = {
        name: 'James',
        notes: 'Check this out!'
    };

    // Get information about the selected user from its ID
    const getUserInformation = () => {
        Axios
        .get(`http://localhost:4000/api/users/${userId}`)
        .then(res => setDataUser(res.data))
        .catch(err=> console.error(err))
          }

    const sendEmail = (e) => {
        e.preventDefault();
        
        emailjs.sendForm('default_service', 'template_RNn5tOce', templateParams, 'user_n7v9EXYH3R9MLNyL5R86V')
              .then((result) => {
                  console.log(result.text);
              }, (error) => {
                  console.log(error.text);
              });
          }
    
          useEffect(() => {
        getUserInformation()
            }, 
          [])

    return (

        <>
            <Header className="header" title="Fiche parent" />

            <div className="Result-filterbarTop">
                <Link to='/search/results'>
                    <button className="Result-filterbar-button">
                        Retour
                    </button>
                </Link>
            </div>


            <div className='mainResultDetail'>

                <img className="avatar" src='https://randomuser.me/api/portraits/men/84.jpg' alt="avatar"></img>
                <div className="user_identity">
                    <p>{dataUser.user_firstname}</p>
                    <p>{dataUser.user_lastname}</p>
                </div>
                <p>{dataUser.user_biography}</p>

            </div>

            <ButtonValidate title={`Contacter ${dataUser.user_firstname}`} onClick={(e)=> sendEmail(e)}/>
        
        </>
    )
}

export default ResultDetails