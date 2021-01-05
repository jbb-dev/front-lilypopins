import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import './register.css'
import Next from '../common/Buttons/Next'
import Header from '../common/Header/Header'
import { UserContext } from '../../context/UserContext'


const Register = () => {


    const { userProfile, setUserProfile } = useContext(UserContext)

    
    return(

        <div className='mainRegister'>

          <Header title='Inscription' />

          <div className="register_page">

            <h3 className='register-welcome'>Créez votre profil de connexion</h3>

            <div className="register_page">
              <form className="register_forms">
                <label>
                  <input
                    className="register_input_text"
                    type="email"
                    placeholder=" Adresse mail"
                    required
                    value={userProfile.email}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, email: e.target.value })
                    }
                  />
                </label>
              </form>
              <form className="register_forms">
                <label className="register_mdp">
                  <input
                    className="register_input_text"
                    type="password"
                    placeholder=" Mot de passe"
                    required
                    value={userProfile.password}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, password: e.target.value })
                    }
                  />
                </label>
              </form>
            </div>
            { userProfile.email && userProfile.password !== '' ? 
              <div>
                <Link to="/register-step2" style={{ textDecoration: "none" }}>
                    <Next title='Etape suivante' status={'active'}/>
                </Link>
              </div>
              :           
                  <Next title='Etape suivante' status='passive'/>
            }
            <div>
              <p>Vous avez déjà un compte ?</p>
              <Link to="/" style={{ textDecoration: "none" }}>
                <p className="register_low_text">Se connecter</p>
              </Link>
            </div>
          </div>
      </div>
      )
}

export default Register