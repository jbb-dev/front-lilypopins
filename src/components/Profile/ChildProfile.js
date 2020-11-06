import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Axios from 'axios'
import './childProfile.css'
import Header from '../common/Header/Header'
import Back from '../common/Buttons/Back'
import Next from '../common/Buttons/Next'
import ChildProfileForm from '../common/Others/ChildProfileForm'
const { REACT_APP_API_URL } = process.env;


const ChildProfile = (props) => {

    // Get Auth :
    const token = localStorage.token 

    // Get Child info :
    const childId = props.match.params.childId

    const [dataChild, setDataChild] = useState(null)

    const [hasFinishedToGet, SetHasFinishedToGet] = useState(false)

    const [wantModifProfile, setWantModifProfile] = useState(false)

    const getMyChildInfo = () => {
        Axios.get(`${REACT_APP_API_URL}/api/users/my-children/${childId}`, { 
          headers : { 'Authorization' : 'Bearer ' + token}
        })
        .then((res) => setDataChild(res.data))
        .finally(SetHasFinishedToGet(true))
        .catch((error)=> console.log(error))
      }

    // Start to catch child info and then, save it in the dataChild
    useEffect(() => {
        getMyChildInfo()
      }, [])

    return (
        <>

            <Header className="header" title="Profil de votre enfant" />

            {token === undefined ? 
                <div className="Profile-Page">
                    <p style={{'textAlign' : 'center'}}>Vous devez être connecté(e) pour accéder à votre profil.</p> 
                    <div className='login' > 
                        <Link to='/login' style={{ textDecoration: "none" }}>
                            <button type='button' id='loginBtn' > Se connecter </button>
                        </Link>
                    </div>
                    <p style={{'textAlign' : 'center'}}>Pas encore de compte ? Créer un compte gratuitement</p>
                    <div className='create' >
                        <Link to='/register' style={{ textDecoration: "none" }}>
                         <button type='button' id='createBtn' > Créer un compte </button>
                        </Link>
                    </div>
                </div>

            :

            dataChild === null ?
                <div>
                    <p style={{'textAlign' : 'center'}}>Chargement en cours...</p>
                </div>

            :
                <div className="Profile-Page">

                    <Back title='Retour' link='/my-children' />

                    {wantModifProfile ? 
                        <ChildProfileForm data={dataChild} wantModif={() => setWantModifProfile(!wantModifProfile)}/>
                    :
                        <div className='main-child-profile' >
                            <img className="avatar" src={dataChild.avatar} alt="avatar"></img>
                            <div className="child-info">
                                <h5>{dataChild.firstname}</h5>
                                <p>{dataChild.age} ans</p>
                                <p>Section : {dataChild.section}</p>
                                <p>" {dataChild.biography} "</p>
                            </div>
                        </div>
                    }

                    {wantModifProfile ? 

                    null

                    : 
                        <Next title="Modifier mon profil" status='passive' onClick={()=> 
                            setWantModifProfile(!wantModifProfile)
                        }/>
                    }

                </div>

            }
        </>
    )
}


export default ChildProfile;