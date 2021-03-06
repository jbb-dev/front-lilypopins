import React, {useState} from 'react'
import { Link, Redirect } from "react-router-dom";
import './login.css'
import Next from '../common/Buttons/Next'
import Axios from 'axios'
import logo from "../../components/common/Logo/logo.png"

const { REACT_APP_API_URL } = process.env;


const Login = () => {

    // By default, user is not logged
    const [logged, setLogged] = useState(false)

    const [dataUser, setDataUser] = useState({
        email: "",
        password: "",
      });
    // Récupération des erreurs serveur (status 400) lors du login (si erreur existante)
    const [error, setError] = useState(null)

    const login = () => {
        Axios
        .post(`${REACT_APP_API_URL}/api/users/login`, dataUser)
        .then((res) => {
            localStorage.setItem("token", res.data.token)
            setLogged(true)
        }) 
        .catch((err) => setError(err.response.data.error))
    }

    
    return(
    <>
        {logged ? <Redirect to="/home" /> : null}

        <div className='mainLogin'>

            <h1 id="logoTitle" >lilypopins</h1>

            <div className="login_page">

                {/* <img className="login_logo" src={logo} alt="logo" /> */}
                {error !== null ? <div class="alert alert-danger" role="alert">{error}</div> : null}

                <form className="login_forms">
                    <label>
                    <input
                        className="login_input_text"
                        type="email"
                        placeholder=" Adresse mail"
                        required
                        value={dataUser.email}
                        onChange={(e) =>
                        setDataUser({ ...dataUser, email: e.target.value })
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
                        value={dataUser.password}
                        onChange={(e) =>
                        setDataUser({ ...dataUser, password: e.target.value })
                        }
                    />
                    </label>
                </form>
                
                { dataUser.email && dataUser.password !== '' ? 
                    <Next title='Se connecter' onClick={() => login()} status='active'/>
                : 
                    <Next title='Se connecter' status='passive'/>
                }
                
                <div className='create_account'>
                    <p className='no-account'>Pas de compte ? </p>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <p className="login_low_text">S'inscrire gratuitement</p>
                    </Link>
                </div>
            </div>
      </div>
    </>
    )
}

export default Login