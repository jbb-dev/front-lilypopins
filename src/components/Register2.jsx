import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import './register.css'
import './common/Buttons/Next'
import Next from '../components/common/Buttons/Next'
import Header from '../components/common/Header/Header'
import { UserContext } from '../context/UserContext'


const RegisterStep2 = () => {

    const { userProfile, setUserProfile } = useContext(UserContext)

    const subscribe = () => {
        console.log('subscribe')
        // Axios.post("http://localhost:4000/api/users", userProfile)
        //   .catch((err) => console.error(err))
        //   .finally(setSuccess(true));
      };
    
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
                value={userProfile.user_lastname}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, user_lastname: e.target.value })
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
                value={userProfile.user_firstname}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, user_firstname: e.target.value })
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
                value={userProfile.user_city}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, user_city: e.target.value })
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
                value={userProfile.user_postal}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, user_postal: e.target.value })
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
                value={userProfile.user_biography}
                onChange={(e) =>
                        setUserProfile({ ...userProfile, user_biography: e.target.value })
                      }
            />

            </label>
          </form>



        </div>
  
        <Link to="/register-step3" style={{ textDecoration: "none" }}>
            <Next title='Etape suivante' />
        </Link>

  
        <div>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <p className="register_go_back">Retour à l'étape précédente</p>
          </Link>
        </div>
      </div>
      )
}

export default RegisterStep2