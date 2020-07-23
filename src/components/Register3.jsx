import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import './register.css'
import './common/Buttons/Next'
import Next from '../components/common/Buttons/Next'
import Header from '../components/common/Header/Header'
import SelectButton from '../components/common/Buttons/SelectButton'
import { UserContext } from '../context/UserContext'
import { ChildrenContext } from '../context/ChildrenContext';


const RegisterStep3 = () => {

    const { userProfile, setUserProfile } = useContext(UserContext)

    const { childrenProfile, setChildrenProfile } = useContext(ChildrenContext)

    const subscribe = () => {
        console.log('subscribe')
        // Axios.post("http://localhost:4000/api/users", userProfile)
        //   .catch((err) => console.error(err))
        //   .finally(setSuccess(true));
      };
    
    return(

        <div className='mainRegister'>

        <Header title='Inscription- étape 3/3' />

        <h3 className='welcome'>Présentez votre enfant</h3>

        <div className="register_page">
          <form className="register_forms">
            <label>
              <input
                required
                className="register_input_text"
                type="text"
                placeholder=" Prénom de votre enfant"
                // value={childrenProfile.child_firstname}
                onChange={(e) =>
                  setChildrenProfile({ ...childrenProfile, child_firstname: e.target.value })
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
                placeholder=" Age de votre enfant"
                // value={childrenProfile.child_age}
                onChange={(e) =>
                  setChildrenProfile({ ...childrenProfile, child_age: Number(e.target.value) })
                }
              />
            </label>
          </form>

          <div className='select_sex'>
            <SelectButton
                    radioSelBtnId='Garçon'
                    radioSelBtnValue='Boy'
                    radioSelBtnName='Garçon'
                    onClick={(e) => setChildrenProfile({...childrenProfile, child_sex: e.target.value }) }
            />
            <SelectButton
                    radioSelBtnId='Fille'
                    radioSelBtnValue='Girl'
                    radioSelBtnName='Girl'
                    onClick={(e) => setChildrenProfile({...childrenProfile, child_sex: e.target.value }) }
            />

        </div>

          <form className="register_forms">
            <label>
            <textarea
                className="register_input_text"
                type="text"
                placeholder="Quelques mots sur votre enfant"
                // value={childrenProfile.child_biography}
                onChange={(e) =>
                        setChildrenProfile({ ...childrenProfile, child_biography: e.target.value })
                      }
            />

            </label>
          </form>



        </div>
  
        <Link to="/home" style={{ textDecoration: "none" }}>
            <Next title='Etape suivante' />
        </Link>

  
        <div>
          <Link to="/register-step2" style={{ textDecoration: "none" }}>
            <p className="register_go_back">Retour à l'étape précédente</p>
          </Link>
        </div>
      </div>
      )
}

export default RegisterStep3