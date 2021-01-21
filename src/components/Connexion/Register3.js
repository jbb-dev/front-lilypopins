import React, { useContext, useState } from 'react'
import { Link, Redirect } from "react-router-dom";
import './register.css'
import '../common/Buttons/Next'
import moment from "moment";
import 'moment/locale/fr'
import Next from '../common/Buttons/Next'
import Header from '../common/Header/Header'
import Axios from 'axios'
import { UserContext } from '../../context/UserContext'
import ButtonValidate from '../common/Buttons/Validate'
import AvailabilitiesPicker from '../common/Others/AvailabilitiesPicker';
const { REACT_APP_API_URL } = process.env;

const RegisterStep3 = () => {

    const { userProfile, setUserProfile } = useContext(UserContext)

    const [hasFinished, setHasFinished] = useState(false)

    const [error, setError] = useState(null)

    const transformSlotInDateTime = (timeSlot, dayOfWeek) => {
      let hour = timeSlot.slice(0,2)
      let minutes = timeSlot.slice(3,5)
      let slotInDateFormat = moment().set({day : dayOfWeek, hour : hour, minute : minutes, second : 0})
      return slotInDateFormat
    }

    const subscribe = async () => {
      await Axios
        .post(`${REACT_APP_API_URL}/api/users/register`, userProfile)
        .then(setHasFinished(true))
        .catch((err) => setError(err.message))
    }
        
    return(
      <>
        {hasFinished && <Redirect to="/" />}

        <div className='register-wrapper'>
        
          <Header title='Inscription - étape 3/3' />
          {/* <button onClick={() => console.log(day)}>CLIC</button> */}
          {/* <button onClick={() => console.log(transformSlotInDateTime('14:35', 3))}>CLIC</button> */}
          <div className='mainRegister'>
  
           {error !== null ? <div class="alert alert-danger" role="alert">{error}</div> : null}

            <h3 className='register-welcome'>Renseignez ici vos créneaux possibles pour garder les enfants des autres</h3>
            <p className='register-welcome-text'>C'est le principe du babysitting collaboratif :)</p>
            <div className="day-select-availabilities">
              <AvailabilitiesPicker 
                id='lundi' 
                text='Lundi' 
                isAvailable={userProfile.availabilities.lundi.isAvailable}
                setIsAvailable={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  lundi : 
                  {...userProfile.availabilities.lundi, isAvailable : !userProfile.availabilities.lundi.isAvailable}}})} 
                startTime={userProfile.availabilities.lundi.start.format('HH:mm')}
                endTime={userProfile.availabilities.lundi.end.format('HH:mm')}
                setStartTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  lundi : 
                  {...userProfile.availabilities.lundi, start : transformSlotInDateTime(e.target.value, 1) }}})} 
                setEndTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  lundi : 
                  {...userProfile.availabilities.lundi, end : transformSlotInDateTime(e.target.value, 1)}}})}
              />
              <AvailabilitiesPicker 
                id='mardi' 
                text='Mardi'
                isAvailable={userProfile.availabilities.mardi.isAvailable}
                setIsAvailable={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  mardi : 
                  {...userProfile.availabilities.mardi, isAvailable : !userProfile.availabilities.mardi.isAvailable}}})} 
                startTime={userProfile.availabilities.mardi.start.format('HH:mm')}
                endTime={userProfile.availabilities.mardi.end.format('HH:mm')}
                setStartTime={e => setUserProfile({...userProfile, availabilities : 
                {...userProfile.availabilities, 
                mardi : 
                {...userProfile.availabilities.mardi, start : transformSlotInDateTime(e.target.value, 2)}}})}
                setEndTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  mardi : 
                  {...userProfile.availabilities.mardi, end : transformSlotInDateTime(e.target.value, 2)}}})}
              />
              <AvailabilitiesPicker 
                id='mercredi' 
                text='Mercredi' 
                isAvailable={userProfile.availabilities.mercredi.isAvailable}
                setIsAvailable={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  mercredi : 
                  {...userProfile.availabilities.mercredi, isAvailable : !userProfile.availabilities.mercredi.isAvailable}}})} 
                startTime={userProfile.availabilities.mercredi.start.format('HH:mm')}
                endTime={userProfile.availabilities.mercredi.end.format('HH:mm')}  
                setStartTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  mercredi : 
                  {...userProfile.availabilities.mercredi, start : transformSlotInDateTime(e.target.value, 3)}}})}
                setEndTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  mercredi : 
                  {...userProfile.availabilities.mercredi, end : transformSlotInDateTime(e.target.value, 3)}}})}
              />
              <AvailabilitiesPicker 
                id='jeudi' 
                text='Jeudi' 
                isAvailable={userProfile.availabilities.jeudi.isAvailable}
                setIsAvailable={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  jeudi : 
                  {...userProfile.availabilities.jeudi, isAvailable : !userProfile.availabilities.jeudi.isAvailable}}})} 
                startTime={userProfile.availabilities.jeudi.start.format('HH:mm')}
                endTime={userProfile.availabilities.jeudi.end.format('HH:mm')}  
                setStartTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  jeudi : 
                  {...userProfile.availabilities.jeudi, start : transformSlotInDateTime(e.target.value, 4)}}})}
                setEndTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  jeudi : 
                  {...userProfile.availabilities.jeudi, end : transformSlotInDateTime(e.target.value, 4)}}})}
              />
              <AvailabilitiesPicker 
                id='vendredi' 
                text='Vendredi' 
                isAvailable={userProfile.availabilities.vendredi.isAvailable}
                setIsAvailable={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  vendredi : 
                  {...userProfile.availabilities.vendredi, isAvailable : !userProfile.availabilities.vendredi.isAvailable}}})} 
                startTime={userProfile.availabilities.vendredi.start.format('HH:mm')}
                endTime={userProfile.availabilities.vendredi.end.format('HH:mm')}    
                setStartTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  vendredi : 
                  {...userProfile.availabilities.vendredi, start : transformSlotInDateTime(e.target.value, 5)}}})}
                setEndTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  vendredi : 
                  {...userProfile.availabilities.vendredi, end : transformSlotInDateTime(e.target.value, 5)}}})}
              />
              <AvailabilitiesPicker 
                id='samedi' 
                text='Samedi'
                isAvailable={userProfile.availabilities.samedi.isAvailable}
                startTime={userProfile.availabilities.samedi.start.format('HH:mm')}
                endTime={userProfile.availabilities.samedi.end.format('HH:mm')}    
                setIsAvailable={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  samedi : 
                  {...userProfile.availabilities.samedi, isAvailable : !userProfile.availabilities.samedi.isAvailable}}})}  
                setStartTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  samedi : 
                  {...userProfile.availabilities.samedi, start : transformSlotInDateTime(e.target.value, 6)}}})}
                setEndTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  samedi : 
                  {...userProfile.availabilities.samedi, end : transformSlotInDateTime(e.target.value, 6)}}})}
              />
              <AvailabilitiesPicker 
                id='dimanche' 
                text='Dimanche' 
                isAvailable={userProfile.availabilities.dimanche.isAvailable}
                setIsAvailable={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  dimanche : 
                  {...userProfile.availabilities.dimanche, isAvailable : !userProfile.availabilities.dimanche.isAvailable}}})}  
                startTime={userProfile.availabilities.dimanche.start.format('HH:mm')}
                endTime={userProfile.availabilities.dimanche.end.format('HH:mm')}      
                setStartTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  dimanche : 
                  {...userProfile.availabilities.dimanche, start : transformSlotInDateTime(e.target.value, 7)}}})}
                setEndTime={e => setUserProfile({...userProfile, availabilities : 
                  {...userProfile.availabilities, 
                  dimanche : 
                  {...userProfile.availabilities.dimanche, end : transformSlotInDateTime(e.target.value, 7)}}})}
              />
            </div>

    { userProfile.availabilities.lundi.isAvailable || userProfile.availabilities.mardi.isAvailable || userProfile.availabilities.mercredi.isAvailable || userProfile.availabilities.jeudi.isAvailable || userProfile.availabilities.vendredi.isAvailable || userProfile.availabilities.samedi.isAvailable || userProfile.availabilities.dimanche.isAvailable ?               
            
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
      </div>
    </>
  )
}

export default RegisterStep3