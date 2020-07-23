import React from 'react'
import { Link } from "react-router-dom";
import './home.css'
import Header from './common/Header/Header'
import Footer from './common/Footer/Footer'
import Notification from './common/Notification'

const Home = () => {

    return (
        <div className='mainHome'>

            <Header title='Accueil'/>

            {/* <Notification /> */}

            <h3 className='welcome'>Bienvenu sur LilyPopins !</h3>
            <p className='welcomeText'>Le baby-sitting collaboratif entre parents</p>

            <Link to="/search/results" style={{ textDecoration: "none" }}>
                <div className='homeBtn' >
                    <i class="fas fa-search"></i>
                    <p className='textBtn'> Faire garder mon enfant </p>
                </div>
            </Link>
            
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className='homeBtn' >
                    <i class="fas fa-eye"></i>
                    <p className='textBtn'> Suivre mes annonces </p>
                </div>
            </Link>

            <Link to="/" style={{ textDecoration: "none" }}>
                <div className='homeBtn' >
                    <i class="far fa-calendar-alt"></i>
                    <p className='textBtn'> Mon calendrier partagé </p>
                </div>
            </Link>

            <Link to="/" style={{ textDecoration: "none" }}>
                <div className='homeBtn' >
                    <i class="far fa-address-card"></i>
                    <p className='textBtn'> Mon profil utilisateur </p>
                </div>
            </Link>

            <div className="logout-button">
                <Link to="/login" style={{ textDecoration: "none" }}>
                    <button id="logout-button"> 
                        Se déconnecter
                    </button>
                </Link>
            </div>

            <Footer />
    
        </div>
    )
}

export default Home;