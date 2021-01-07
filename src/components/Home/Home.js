import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from "react-router-dom";
import './home.css'
import Header from '../common/Header/Header'
import Footer from '../common/Footer/Footer'
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

const { REACT_APP_API_URL } = process.env;

const Home = () => {

    // Get user profil
    const token = localStorage.token 

    const [dataUser, setDataUser] = useState(null) 

    const [count, setCount] = useState(null)
 
    const getMyProfile = async () => {
        await Axios
        .get(`${REACT_APP_API_URL}/api/users/my-profile`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
            })
        .then((res) => setDataUser(res.data))
        .catch((error)=> console.log(error))
    }

    const countOpenedDemandsAndGards = async () => {
        await Axios
        .get(`${REACT_APP_API_URL}/api/demands/count`, 
            { 
                headers : { 'Authorization' : 'Bearer ' + token },
            })
        .then((res) => setCount(res.data))
        .catch((error)=> console.log(error)) 
    }

    const logout = async () => {
        console.log('logout')
        await localStorage.setItem("token", "")
        window.location.href='/'
    }

    // Start to catch user info and then, save it in the dataUser
    useEffect(() => {
        getMyProfile()
        countOpenedDemandsAndGards()
    }, []);

    return (
        <>
        <div className='home-wrapper'>
        <Header title='lilypopins' home={true} logout={logout} />
        {dataUser !== null ? 
            <div className='mainHome'>
                <div>
                    <h3 className='home-welcome'>Bonjour {dataUser.firstname}</h3>
                </div>

                <div>
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
                            <div>
                                <NotificationBadge count={count} effect={Effect.SCALE} style={{
                                    'backgroundColor' : '#ff3dc2bb', 
                                    'top'             : '-5px', 
                                    'right'           : '-5px', 
                                    'min-width'       : '28px',
                                    'padding-top'     : '7px',
                                    'padding-right'   : '9px',
                                    'padding-bottom'  : '7px',
                                    'padding-left'    : '9px',
                                    'border-radius'   : '15px'
                                    }} 
                                />
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
            </div>
            : <p style={{'text-align' : 'center'}}>Chargement en cours...</p>}
        </div>    
            {/* <Footer /> */}
        </>

    )
}

export default Home;