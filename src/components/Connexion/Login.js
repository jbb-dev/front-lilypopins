import React, {useState} from 'react'
import { Link } from "react-router-dom";
import './login.css'
import Next from '../common/Buttons/Next'
import Header from '../common/Header/Header'


const Login = () => {

    const [dataUser, setDataUser] = useState({
        user_email: "",
        user_password: "",
      });

    const subscribe = () => {
        console.log('subscribe')
        // Axios.post("http://localhost:4000/api/users", dataUser)
        //   .catch((err) => console.error(err))
        //   .finally(setSuccess(true));
      };
    
    return(

        <div className='mainLogin'>

            <Header title='Connexion' />

            <div className='brandTitle'>
                <h3>Lily'Poppins</h3>
            </div>

            <div className="login_page">
                <form className="login_forms">
                    <label>
                    <input
                        className="login_input_text"
                        type="email"
                        placeholder=" Adresse mail"
                        required
                        value={dataUser.user_email}
                        onChange={(e) =>
                        setDataUser({ ...dataUser, user_email: e.target.value })
                        }
                    />
                    </label>
                </form>
                <form className="login_forms">
                    <label className="login_mdp">
                    <input
                        className="login_input_text"
                        type="password"
                        placeholder=" Mot de passe"
                        required
                        value={dataUser.user_password}
                        onChange={(e) =>
                        setDataUser({ ...dataUser, user_password: e.target.value })
                        }
                    />
                    </label>
                </form>

                <Link to="/home" style={{ textDecoration: "none" }}>
                    <Next title='Se connecter' onClick={() => subscribe()}/>
                </Link>


                <div className='create_account'>
                    <p>Pas de compte ? </p>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <p className="login_low_text">S'inscrire gratuitement</p>
                    </Link>
                </div>

            </div>
      </div>
      )
}

export default Login