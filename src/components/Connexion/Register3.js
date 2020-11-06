import React, { useContext, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import './register.css'
import '../common/Buttons/Next'
import Next from '../common/Buttons/Next'
import Header from '../common/Header/Header'
import Axios from 'axios'
import { UserContext } from '../../context/UserContext'
import ButtonValidate from '../common/Buttons/Validate'
const { REACT_APP_API_URL } = process.env;

const RegisterStep3 = () => {

    const { userProfile, setUserProfile } = useContext(UserContext)

    const [hasFinished, setHasFinished] = useState(false)

    const subscribe = () => {
      Axios
        .post(`${REACT_APP_API_URL}/api/users/register`, userProfile)
        .then(setHasFinished(true))
        .catch((err) => console.error(err))
    }

        
    return(
      <>

        {hasFinished ? <Redirect to="/" /> : null}

        <div className='mainRegister'>

        <Header title='Inscription- étape 3/3' />

        <h3 className='welcome'>Vos créneaux possibles pour garder les enfants des autres</h3>
        <p className='welcome-text'>Ces créneaux serviront aux autres parents pour connaitre vos disponibilités</p>

        <div className='availabilities'>
          <div className='day-available'>
            <div className="day">
              <p>Lundi</p>
            </div>
            <input name='lundi-start' type='time' value={userProfile.availabilities.lundi.start} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              lundi : 
              {...userProfile.availabilities.lundi, start : e.target.value}}})}
            />
            <input name='lundi-end' type='time' value={userProfile.availabilities.lundi.end} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              lundi : 
              {...userProfile.availabilities.lundi, end : e.target.value}}})}
            />
          </div>
          <div className='day-available'>
            <div className="day">
              <p>Mardi</p>
            </div>
            <input name='mardi-start' type='time' value={userProfile.availabilities.mardi.start} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              mardi : 
              {...userProfile.availabilities.mardi, start : e.target.value}}})}
            />
            <input name='mardi-end' type='time' value={userProfile.availabilities.mardi.end} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              mardi : 
              {...userProfile.availabilities.mardi, end : e.target.value}}})}
            />
          </div>
          <div className='day-available'>
            <div className="day">
              <p>Mercredi</p>
            </div>
            <input name='mercredi-start' type='time' value={userProfile.availabilities.mercredi.start} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              mercredi : 
              {...userProfile.availabilities.mercredi, start : e.target.value}}})}
            />
            <input name='mercredi-end' type='time' value={userProfile.availabilities.mercredi.end} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              mercredi : 
              {...userProfile.availabilities.mercredi, end : e.target.value}}})}
            />
          </div>
          <div className='day-available'>
            <div className="day">
              <p>Jeudi</p>
            </div>
            <input name='jeudi-start' type='time' value={userProfile.availabilities.jeudi.start} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              jeudi : 
              {...userProfile.availabilities.jeudi, start : e.target.value}}})}
            />
            <input name='jeudi-end' type='time' value={userProfile.availabilities.jeudi.end} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              jeudi : 
              {...userProfile.availabilities.jeudi, end : e.target.value}}})}
            />
          </div>
          <div className='day-available'>
            <div className="day">
              <p>Vendredi</p>
            </div>
            <input name='vendredi-start' type='time' value={userProfile.availabilities.vendredi.start} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              vendredi : 
              {...userProfile.availabilities.vendredi, start : e.target.value}}})}
            />
            <input name='vendredi-end' type='time' value={userProfile.availabilities.vendredi.end} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              vendredi : 
              {...userProfile.availabilities.vendredi, end : e.target.value}}})}
            />
          </div>
          <div className='day-available'>
            <div className="day"> 
              <p>Samedi</p>
            </div>
            <input name='samedi-start' type='time' value={userProfile.availabilities.samedi.start} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              samedi : 
              {...userProfile.availabilities.samedi, start : e.target.value}}})}
            />
            <input name='samedi-end' type='time' value={userProfile.availabilities.samedi.end} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              samedi : 
              {...userProfile.availabilities.samedi, end : e.target.value}}})}
            />
          </div>
          <div className='day-available'>
            <div className="day"> 
              <p>Dimanche</p>
            </div>
            <input name='dimanche-start' type='time' value={userProfile.availabilities.dimanche.start} onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              dimanche : 
              {...userProfile.availabilities.dimanche, start : e.target.value}}})}
            />
            <input name='dimanche-end' type='time' value={userProfile.availabilities.dimanche.end } onChange={ e => setUserProfile({...userProfile, availabilities : 
              {...userProfile.availabilities, 
              dimanche : 
              {...userProfile.availabilities.dimanche, end : e.target.value}}})}
            />
          </div>

        </div>

  { userProfile.availabilities.lundi.start && userProfile.availabilities.lundi.end || userProfile.availabilities.mardi.start && userProfile.availabilities.mardi.end || userProfile.availabilities.mercredi.start && userProfile.availabilities.mercredi.end || userProfile.availabilities.jeudi.start && userProfile.availabilities.jeudi.end || userProfile.availabilities.vendredi.start && userProfile.availabilities.vendredi.end || userProfile.availabilities.samedi.start && userProfile.availabilities.samedi.end || userProfile.availabilities.dimanche.start && userProfile.availabilities.dimanche.end !== '' ?               
          
        <div>
          <ButtonValidate title="S'inscrire" status='active' onClick={()=> subscribe()}/>
        </div>
        :
        <ButtonValidate title="S'inscrire" status='passive' />
    }

        <div>
          <Link to="/register-step2" style={{ textDecoration: "none" }}>
            <p className="register_go_back">Retour à l'étape précédente</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default RegisterStep3