import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import './register.css'
import Next from '../common/Buttons/Next'
import Header from '../common/Header/Header'
import { UserContext } from '../../context/UserContext'


const RegisterStep2 = () => {

    const { userProfile, setUserProfile } = useContext(UserContext)

    
    return(

        <div className='mainRegister'>

        <Header title='Inscription- étape 2/3' />

        <h3 className='welcome'>Présentez-vous</h3>

        <div className="register_page">
          <form className="register_forms">
            <label>
              <input
                required
                className="register_input_text"
                type="text"
                placeholder=" Nom"
                autoFocus
                value={userProfile.lastname}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, lastname: e.target.value })
                }
              />
            </label>
          </form>
          <form className="register_forms">
            <label>
              <input
                required
                className="register_input_text"
                type="text"
                placeholder=" Prénom"
                value={userProfile.firstname}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, firstname: e.target.value })
                }
              />
            </label>
          </form>
          <form className="register_forms">
            <label>
              <input
                required
                className="register_input_text"
                type="Number"
                placeholder="Votre âge"
                value={userProfile.age}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, age: e.target.value })
                }
              />
            </label>
          </form>
          <form className="register_forms">
            <label>
              <input
                required
                className="register_input_text"
                type="text"
                placeholder="Ville de résidence"
                value={userProfile.city}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, city: e.target.value })
                }
              />
            </label>
          </form>
          <form className="register_forms">
            <label>
              <input
                required
                className="register_input_text"
                type="number"
                placeholder=" Code postal"
                value={userProfile.postalCode}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, postalCode: e.target.value })
                }
              />
            </label>
          </form>
          <form className="register_forms">
            <label>
            <textarea
                className="register_input_text"
                type="text"
                placeholder="Quelques mots sur vous"
                value={userProfile.biography}
                onChange={(e) =>
                        setUserProfile({ ...userProfile, biography: e.target.value })
                      }
            />

            </label>
          </form>



        </div>
        
        { userProfile.firstname && userProfile.lastname && userProfile.city && userProfile.postalCode && userProfile.biography && userProfile.age !== '' ?               
          <div>
            <Link to="/register-step3" style={{ textDecoration: "none" }}>
                <Next title='Etape suivante' status={'active'}/>
            </Link>
          </div>
        :
          <Next title='Etape suivante' status={'passive'}/>
        }
        <div>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <p className="register_go_back">Retour à l'étape précédente</p>
          </Link>
        </div>
      </div>
      )
}

export default RegisterStep2