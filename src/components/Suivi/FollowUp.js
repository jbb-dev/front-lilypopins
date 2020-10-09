import React from 'react'
import { Link } from "react-router-dom";
import Header from "../common/Header/Header"
import Back from '../common/Buttons/Back'
import ProfileSelect from '../common/Others/ProfileSelect'
import './followUp.css'
import MyDemands from './MyDemands';


const FollowUp = () => {

    // verify if user
    const token = localStorage.token 

    return(
        <>

            <Header className="header" title="Suivi des gardes" />

            {token === undefined ? 
                <div className="Profile-Page">
                    <p style={{'text-align' : 'center'}}>Vous devez être connecté(e) pour accéder à votre profil.</p> 
                    <div className='login' > 
                    <Link to='/login' style={{ textDecoration: "none" }}>
                        <button type='button' id='loginBtn' > Se connecter </button>
                    </Link>
                    </div>
                    <p style={{'text-align' : 'center'}}>Pas encore de compte ? Créer un compte gratuitement</p>
                    <div className='create' >
                    <Link to='/register' style={{ textDecoration: "none" }}>
                        <button type='button' id='createBtn' > Créer un compte </button>
                    </Link>
                    </div>
                </div>
      
            :
                <div className='FollowUp-Page'>
                    <Back title='Accueil' link='/home' />

                    <ProfileSelect 
                        title= {{
                            option1 : 'Mes demandes',
                            option2 : 'Mes gardes à faire' }}
                        status={{
                            option1 : 'active',
                            option2 : 'passive' }}
                        link = {{
                            option1 : '/home',
                            option2 : '/home' }}
                    />

                    <MyDemands />


                </div> 

            }

        
        </>
    )

}


export default FollowUp;
