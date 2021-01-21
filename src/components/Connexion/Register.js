import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { Button, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './register.css'
import Next from '../common/Buttons/Next'
import Header from '../common/Header/Header'
import { UserContext } from '../../context/UserContext'


const Register = () => {


    const { userProfile, setUserProfile } = useContext(UserContext)

    
    return(

      <div>
        
      <Header title='Inscription' />  
      <div className='registerForm-wrapper'> 
        <h3 >Créez votre profil de connexion</h3>     
        <div className='registerForm'>
          <Form>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Votre email"                     
                  value={userProfile.email}
                  onChange={e => setUserProfile({ ...userProfile, email: e.target.value })}
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Votre mot de passe" 
                  value={userProfile.password}
                  onChange={e => setUserProfile({ ...userProfile, password: e.target.value })}
                />
            </FormGroup>
          </Form>       
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