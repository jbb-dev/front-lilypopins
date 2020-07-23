import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import './register.css'
import Next from '../components/common/Buttons/Next'
import Header from '../components/common/Header/Header'
import { UserContext } from '../context/UserContext'


const Register = () => {


    const { userProfile, setUserProfile } = useContext(UserContext)


    const subscribe = () => {
        console.log('subscribe')
        // Axios.post("http://localhost:4000/api/users", userProfile)
        //   .catch((err) => console.error(err))
        //   .finally(setSuccess(true));
      };
    
    return(

        <div className='mainRegister'>

        <Header title='Inscription' />

        <h3 className='welcome'>Créez votre profil de connexion</h3>

        <div className="register_page">
          <form className="register_forms">
            <label>
              <input
                className="register_input_text"
                type="email"
                placeholder=" Adresse mail"
                required
                value={userProfile.user_email}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, user_email: e.target.value })
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
                value={userProfile.user_password}
                onChange={(e) =>
                  setUserProfile({ ...userProfile, user_password: e.target.value })
                }
              />
            </label>
          </form>
        </div>
  
        <Link to="/register-step2" style={{ textDecoration: "none" }}>
            <Next title='Etape suivante' onClick={() => subscribe()}/>
        </Link>
    
        <div>
          <p>Vous avez déjà un compte ?</p>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <p className="register_low_text">Se connecter</p>
          </Link>
        </div>
      </div>
      )
}

export default Register