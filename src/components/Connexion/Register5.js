import React, { useContext, useState } from 'react'
import Header from '../common/Header/Header'
import { Link, Redirect } from "react-router-dom"
import Axios from 'axios'
import SelectButton from '../common/Buttons/SelectButton'
import ButtonValidate from '../common/Buttons/Validate'
import SectionChild from '../common/Others/SectionChild'
import { UserContext } from '../../context/UserContext'
import { ChildrenContext } from '../../context/ChildrenContext'


const Register5 = () => {

    const { userProfile, setUserProfile } = useContext(UserContext)
    
    const { childrenProfile, setChildrenProfile } = useContext(ChildrenContext)

    const [hasFinished, setHasFinished] = useState(false)

    const subscribe = () => {
        Axios
          .post("http://localhost:4000/api/users/register", userProfile)
          .then(setHasFinished(true))
          .catch((err) => console.error(err))
      }

    return(
        <>

        {hasFinished ? <Redirect to="/login" /> : null}

         <div className='mainRegister'>
            <Header title='Inscription- étape 5/5' />
            
            <h3 className='welcome'>Présentez votre enfant</h3>
            <div className="register_page">
                <form className="register_forms">
                    <div className='select_sex'>
                        <SelectButton
                            radioSelBtnId='Garçon'
                            radioSelBtnValue='Boy'
                            radioSelBtnName='sex'
                            onClick={(e) => setChildrenProfile({...childrenProfile, child_sex: e.target.value }) }
                        />
                        <SelectButton
                            radioSelBtnId='Fille'
                            radioSelBtnValue='Girl'
                            radioSelBtnName='sex'
                            onClick={(e) => setChildrenProfile({...childrenProfile, child_sex: e.target.value }) }
                        />
                    </div>
                    <label >
                    <input
                        required
                        className="register_input_text"
                        type="text"
                        placeholder=" Prénom de votre enfant"
                        value={childrenProfile.child_firstname}
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
                        value={childrenProfile.child_age}
                        onChange={(e) =>
                        setChildrenProfile({ ...childrenProfile, child_age: Number(e.target.value) })
                        }
                    />
                    </label>
                </form>
                
                <SectionChild onClick={(e) =>
                        setChildrenProfile({ ...childrenProfile, child_section: e.target.value }) }
                />

                <form className="register_forms">
                    <label>
                    <textarea
                        className="register_input_text"
                        type="text"
                        placeholder="Quelques mots sur votre enfant"
                        value={childrenProfile.child_biography}
                        onChange={(e) =>
                                setChildrenProfile({ ...childrenProfile, child_biography: e.target.value })
                            }
                    />

                    </label>
                </form>

            </div>

            <ButtonValidate title="S'inscrire" onClick={()=> subscribe()}/>

            <div>
                <Link to="/register-step4" style={{ textDecoration: "none" }}>
                    <p className="register_go_back">Retour à l'étape précédente</p>
                </Link>
            </div>

        </div>
        </>
    )
}

export default Register5