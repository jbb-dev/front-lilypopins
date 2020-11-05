import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom";
import './home.css'
import Header from '../common/Header/Header'
import Footer from '../common/Footer/Footer'
import Notification from '../common/Others/Notification'

const Home = () => {

    // Get user profil
    const token = localStorage.token 

    const [dataUser, setDataUser] = useState(null) 
    const getMyProfile = () => {
        Axios
        .get('http://localhost:4000/api/users/my-profile', { 
            headers : { 'Authorization' : 'Bearer ' + token}
            })
        .then((res) => setDataUser(res.data))
        .catch((error)=> console.log(error))
    }

    // Start to catch user info and then, save it in the dataUser
    useEffect(() => {
        getMyProfile()
    }, []);

    return (
        <div className='mainHome'>

            <Header title='Accueil'/>

            {/* <Notification /> */}

            <h3 className='welcome'>Bienvenue sur LilyPopins !</h3>
            <p className='welcomeText'>Le baby-sitting collaboratif entre parents</p>

            <Link to="/search" style={{ textDecoration: "none" }}>
                <div className='homeBtn' >
                    <i className="fas fa-search"></i>
                    <p className='textBtn'> Faire garder mon enfant </p>
                </div>
            </Link>
            
            <Link to="/my-demands" style={{ textDecoration: "none" }}>
                <div className='homeBtn' >
                    <i className="fas fa-eye"></i>
                    <p className='textBtn'> Mon suivi des gardes </p>
                </div>
            </Link>

            <Link to="/" style={{ textDecoration: "none" }}>
                <div className='homeBtn' >
                    <i className="far fa-calendar-alt"></i>
                    <p className='textBtn'> Mon calendrier partagé </p>
                </div>
            </Link>

            <Link to="/my-profile" style={{ textDecoration: "none" }}>
                <div className='homeBtn' >
                    <i className="far fa-address-card"></i>
                    <p className='textBtn'> Mon profil utilisateur </p>
                </div>
            </Link>


            <div>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <p className="logout">Se déconnecter</p>
                </Link>
             </div>

            <Footer />
    
        </div>
    )
}

export default Home;