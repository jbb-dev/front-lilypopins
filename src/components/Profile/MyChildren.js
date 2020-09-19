import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Header from '../common/Header/Header'
import Axios from 'axios'
import Back from '../common/Buttons/Back'
import ProfileSelect from '../common/Others/ProfileSelect'
import AddChild from '../common/Others/AddChild'
import './myChildren.css'
import ChildCard from './ChildCard';


const MyChildren = () => {
    
    // get and store children infos
    const [dataChildren, setDataChildren] = useState(null)
    const [hasFinishedToGet, SetHasFinishedToGet] = useState(false)
    const token = localStorage.token 

    const [addChild, setAddChild] = useState(false)

    const getMyChildren = () => {
        Axios.get('http://localhost:4000/api/users/my-children', { 
          headers : { 'Authorization' : 'Bearer ' + token}
        })
        .then((res) => setDataChildren(res.data))
        .finally(SetHasFinishedToGet(true))
        .catch((error)=> console.log(error))
      }
    
    // Start to catch children info and then, save it in the dataChildren
    useEffect(() => {
        getMyChildren()
      }, []);

    return(
        <>

        <Header className="header" title="Mes enfants" />

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
      
        : hasFinishedToGet === false ?
        
            <div>
                <p style={{'text-align' : 'center'}}>Chargement en cours...</p>
            </div>

        : dataChildren === null ?
            <div className="Profile-Page">
                <Back title='Accueil' link='/home' />
                    
                <ProfileSelect status={ {
                    me : 'passive',
                    children : 'active'}}
                />

                <AddChild onClick={event =>  window.location.href='/add-my-child'}/>
            </div>

        : 
            <div className="Profile-Page">
                <Back title='Accueil' link='/home' />
                    
                <ProfileSelect status={ {
                    me : 'passive',
                    children : 'active'}}
                />

                {dataChildren.map(child => 
                    <ChildCard data={child}/>)}
                

                <AddChild onClick={event =>  window.location.href='/add-my-child'}/>

            </div>
        }
    </>
    )
}

export default MyChildren