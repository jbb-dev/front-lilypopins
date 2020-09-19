import React, {useState} from 'react'
import { Link, Redirect } from "react-router-dom";
import './login.css'
import Next from '../common/Buttons/Next'
import Header from '../common/Header/Header'
import Axios from 'axios'


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
        .post("http://localhost:4000/api/users/login", dataUser)
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

            <Header title='Connexion' />

            <div className='brandTitle'>
                <h3>Lily'Poppins</h3>
            </div>

            {error !== null ? <div class="alert alert-danger" role="alert">{error}</div> : null}

            <div className="login_page">
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
                : <Next title='Se connecter' status='passive'/>
                }
                <div className='create_account'>
                    <p>Pas de compte ? </p>
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