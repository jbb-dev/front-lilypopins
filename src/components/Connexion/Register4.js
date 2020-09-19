import React, { useContext, useState } from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios'
import './register.css'
import ButtonValidate from '../common/Buttons/Validate'
import Header from '../common/Header/Header'
import { UserContext } from '../../context/UserContext'


const RegisterStep4 = () => {

    const { userProfile, setUserProfile } = useContext(UserContext)
    const [modif, setModif] = useState(false)

    const [hasFinished, setHasFinished] = useState(false)

    // Management of image upload :
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        if (e.target.files[0]) {
        setImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    const subscribe = () => {
        Axios
          .post("http://localhost:4000/api/users/register", userProfile)
          .then(setHasFinished(true))
          .catch((err) => console.error(err))
      }

    return(

        <div className='mainRegister'>

        <Header title='Inscription- étape 4/5' />

        <h3 className='welcome'>Améliorer votre profil</h3>

        <div className="register_page">
            <div className="Profile-row">
                {image === null ? <p>Choisissez une photo pour améliorer votre visibilité</p> : null}
                <input id='upload-avatar' type="file" onChange={e=> {
                    setUserProfile({...userProfile, avatar : e.target.files[0]})
                    handleChange(e)} }
                />
                <img src={image !== null ? image : userProfile.avatar}  alt='avatar' id='avatar' />
                <h5>{userProfile.firstname} {userProfile.lastname}</h5>
                <p>{userProfile.age}</p>
                <p>{userProfile.postalCode} {userProfile.city}</p>
                <p className='my-biography' >" {userProfile.biography} "</p>
                <h4>Mes dispos pour garder des enfants :</h4>
                <div>
                    {userProfile.availabilities.lundi.start && userProfile.availabilities.lundi.end !== '' ? <p>Lundi : <span>De</span> {userProfile.availabilities.lundi.start} à {userProfile.availabilities.lundi.end}</p> : null}
                    {userProfile.availabilities.mardi.start && userProfile.availabilities.mardi.end !== '' ?<p>Mardi : <span>De</span> {userProfile.availabilities.mardi.start} à {userProfile.availabilities.mardi.end}</p> : null}
                    {userProfile.availabilities.mercredi.start && userProfile.availabilities.mercredi.end !== '' ?<p>Mercredi : <span>De</span> {userProfile.availabilities.mercredi.start} à {userProfile.availabilities.mercredi.end}</p> : null}
                    {userProfile.availabilities.jeudi.start && userProfile.availabilities.jeudi.end !== '' ?<p>Jeudi : <span>De</span> {userProfile.availabilities.jeudi.start} à {userProfile.availabilities.jeudi.end}</p> : null}
                    {userProfile.availabilities.vendredi.start && userProfile.availabilities.vendredi.end !== '' ?<p>Vendredi : <span>De</span> {userProfile.availabilities.vendredi.start} à {userProfile.availabilities.vendredi.end}</p> : null}
                    {userProfile.availabilities.samedi.start && userProfile.availabilities.samedi.end !== '' ?<p>Samedi : <span>De</span> {userProfile.availabilities.samedi.start} à {userProfile.availabilities.samedi.end}</p> : null}
                    {userProfile.availabilities.dimanche.start && userProfile.availabilities.dimanche.end !== '' ?<p>Dimanche : <span>De</span> {userProfile.availabilities.dimanche.start} à {userProfile.availabilities.dimanche.end}</p> : null}
                </div>

                <ButtonValidate title="S'inscrire" status='active' onClick={()=> subscribe()}/>

                <div>
                    <Link to="/register-step3" style={{ textDecoration: "none" }}>
                        <p className="register_go_back">Retour à l'étape précédente</p>
                    </Link>
                </div>
            </div>
        </div>
    </div> 
    )       
}

export default RegisterStep4