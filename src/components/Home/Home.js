import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom";
import './home.css'
import Header from '../common/Header/Header'
import Footer from '../common/Footer/Footer'
import Notification from '../common/Others/Notification'

const { REACT_APP_API_URL } = process.env;

const Home = () => {

    // Get user profil
    const token = localStorage.token 

    const [dataUser, setDataUser] = useState(null) 
    const getMyProfile = () => {
        Axios
        .get(`${REACT_APP_API_URL}/api/users/my-profile`, { 
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
        <>
        <div className='home-wrapper'>
            <div className='mainHome'>

                {/* <Header title='Accueil'/> */}

                {/* <Notification /> */}
                <div>
                    <h3 className='home-welcome'>Bienvenue sur lilypopins !</h3>
                    <p className='home-welcomeText'>Le baby-sitting collaboratif entre parents</p>
                </div>

                <div className='homeBtn-wrapper'>
                    <Link to="/search" style={{ textDecoration: "none" }}>
                        <div className='homeBtn' >
                            <div className='contentBtn'>
                                <div className="icon-wrapper">
                                    <i className="fas fa-search fa-2x"></i>
                                </div>
                                <div className="textBtn-wrapper">
                                    <p className='textBtn'> Faire garder mon enfant </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    
                    <Link to="/my-demands" style={{ textDecoration: "none" }}>
                        <div className='homeBtn' >
                            <div className='contentBtn'>
                                <div className="icon-wrapper">
                                    <i className="fas fa-eye fa-2x"></i>
                                </div>
                                <div className="textBtn-wrapper">
                                    <p className='textBtn'> Mon suivi des gardes </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/my-planning" style={{ textDecoration: "none" }}>
                        <div className='homeBtn' >
                            <div className='contentBtn'>
                                <div className="icon-wrapper">
                                    <i className="fa fa-calendar fa-2x"></i>
                                </div>
                                <div className="textBtn-wrapper">
                                    <p className='textBtn'> Mon calendrier partagé </p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to="/my-profile" style={{ textDecoration: "none" }}>
                        <div className='homeBtn' >
                            <div className='contentBtn'>
                                <div className="icon-wrapper">
                                    <i className="far fa-address-card fa-2x"></i>
                                </div>
                                <div className="textBtn-wrapper">
                                    <p className='textBtn'> Mon profil utilisateur </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <p className="logout">Se déconnecter</p>
                    </Link>
                </div>
                
            </div>
        </div>    
            {/* <Footer /> */}
        </>

    )
}

export default Home;