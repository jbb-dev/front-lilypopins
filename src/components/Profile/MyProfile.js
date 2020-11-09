import React, { useState, useEffect } from "react";
import "./myProfile.css";
import Header from "../common/Header/Header"
import { storage } from "../../Firebase"
import Axios from "axios";
import { Link } from "react-router-dom";
import BackHome from '../common/Buttons/BackHome'
import Next from '../common/Buttons/Next'
import ProfileSelect from '../common/Others/ProfileSelect'
const { REACT_APP_API_URL } = process.env;


const MyProfile = () => {

  // User Data storage:
  const [dataUser, setDataUser] = useState(null)
  const token = localStorage.token 

  const defaultAvatar = 'https://static.wixstatic.com/media/8fa7e6_09cf11c3e4584b259145ecc0b2633997.jpg/v1/fill/w_224,h_224,al_c,lg_1,q_80/8fa7e6_09cf11c3e4584b259145ecc0b2633997.webp'
    
  // Get user profil
  const getMyProfile = () => {
    Axios.get(`${REACT_APP_API_URL}/api/users/my-profile`, { 
      headers : { 'Authorization' : 'Bearer ' + token}
    })
    .then((res) => setDataUser(res.data))
    .catch((error)=> console.log(error))
  }
  // Update user data information 
  const updateMyProfile = () => {
    Axios
    .put(`${REACT_APP_API_URL}/api/users/my-profile`, dataUser, 
    { 
      headers : { 'Authorization' : 'Bearer ' + token}
    })
    .catch(err=> console.error(err))
  }
  
  // Management of image upload :
  const [localImageUrl, setLocalImageUrl] = useState(null)
  const [image, setImage] = useState(null);
  
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setLocalImageUrl(URL.createObjectURL(e.target.files[0]))
      setImage(e.target.files[0])
    }
  }
  // User want to modify profile or not, display page will change :
  const [hasValidatePhoto, setHasValidatePhoto] = useState(false)
  const [modif, setModif] = useState(false);
  
  const modifprof = () => {
    setModif(!modif);
  };
  const validprof = () => {
    setModif(!modif);
  };

    // Start to catch user info and then, save it in the dataUser
  useEffect(() => {
    getMyProfile()
  }, []);

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${dataUser.id}/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`images/${dataUser.id}`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => setDataUser({...dataUser, avatar : url}))
      }
    )
    setHasValidatePhoto(true)
  };
  return (
    <>
      <Header className="header" title="Mon Profil" />

      {token === undefined ? 
      <div className="Profile-Page">
        <p style={{'text-align' : 'center'}}>Vous devez être connecté(e) pour accéder à votre profil.</p> 
        <div className='login' > 
          <Link to='/login' style={{ textDecoration: "none" }}>
              <button type='button' id='loginBtn' > Se connecter </button>
          </Link>
        </div>
        <p style={{'text-align' : 'center'}}>Pas encore de compte ? Créer un compte gratuitement</p>
        <div className='create' >
          <Link to='/register' style={{ textDecoration: "none" }}>
              <button type='button' id='createBtn' > Créer un compte </button>
          </Link>
        </div>
      </div>
      
      :
      
      dataUser === null ?
      <div>
        <p style={{'textAlign' : 'center'}}>Chargement en cours...</p>
      </div>

      :
      <div>
        <BackHome />

        <div className="Profile-Page">

            <ProfileSelect 
              title= {{
                option1 : 'Moi',
                option2 : 'Mes enfants' }}
              status={{
                option1 : 'active',
                option2 : 'passive' }}
              link = {{
                option1 : '/my-profile',
                option2 : '/my-children' }}
            />


              {dataUser.avatar === null ? 
                <p>Choisissez une photo pour améliorer votre visibilité</p> 
              : null}
              
              <div className="Profile-image">
                {modif ? 
                  <input id='upload-avatar' type="file" onChange={e=> {
                      setDataUser({...dataUser, avatar : e.target.files[0]})
                      handleChange(e)} }
                  />
                : null}
                <img src={localImageUrl !== null ? localImageUrl : dataUser.avatar !== null ? dataUser.avatar : defaultAvatar} id='avatar' />
                {image !== null ? 
                  <button 
                    className={hasValidatePhoto ? 'button-hidden' : null} 
                    onClick={() => { handleUpload() }} 
                    id="valid-photo-button">
                  Valider la photo
                  </button>
                  : null 
                }
              </div>
              
              {hasValidatePhoto && modif ? 
                <p>Pensez à cliquer sur Valider mon Profil pour enregistrer la modification</p>

                : null}
              
              {modif ? 

              <div>

                <form className="profile_forms">
                  <label>
                    <input
                      required
                      className="profile_input_text"
                      type="text"
                      placeholder=" Nom"
                      autoFocus
                      value={dataUser.lastname}
                      onChange={(e) =>
                        setDataUser({ ...dataUser, lastname: e.target.value })
                      }
                    />
                  </label>
                  </form>
                <form className="profile_forms">
                  <label>
                    <input
                      required
                      className="profile_input_text"
                      type="text"
                      placeholder=" Prénom"
                      value={dataUser.firstname}
                      onChange={(e) =>
                        setDataUser({ ...dataUser, firstname: e.target.value })
                      }
                    />
                    </label>
                  </form>
                  <form className="profile_forms">
                  <label>
                    <input
                      required
                      className="profile_input_text"
                      type="Number"
                      placeholder="Votre âge"
                      value={dataUser.age}
                      onChange={(e) =>
                        setDataUser({ ...dataUser, age: e.target.value })
                      }
                    />
                    </label>
                  </form>
                  <form className="profile_forms">
                    <label>
                    <input
                      required
                      className="profile_input_text"
                      type="text"
                      placeholder="Ville de résidence"
                      value={dataUser.city}
                      onChange={(e) =>
                        setDataUser({ ...dataUser, city: e.target.value })
                      }
                    />
                    </label>
                  </form>
                  <form className="profile_forms">
                    <label>
                    <input
                      required
                      className="profile_input_text"
                      type="number"
                      placeholder=" Code postal"
                      value={dataUser.postalCode}
                      onChange={(e) =>
                        setDataUser({ ...dataUser, postalCode: e.target.value })
                      }
                    />
                    </label>
                  </form>
                  <form className="profile_forms">
                    <label>
                    <textarea
                      className="profile_input_text"
                      type="text"
                      placeholder="Quelques mots sur vous"
                      value={dataUser.biography}
                      onChange={(e) =>
                              setDataUser({ ...dataUser, biography: e.target.value })
                            }
                  />
                    </label>
                  </form>
                </div>
              :
              <div className='my-info'>
                <h5>{dataUser.firstname} {dataUser.lastname}</h5>
                <p>{dataUser.age} ans</p>
                <p>{dataUser.postalCode} {dataUser.city}</p>
                <p className='my-biography' >" {dataUser.biography} "</p>
              </div>
              }    

          <h5>Mes dispos pour garder des enfants :</h5>
          {modif ? (
          <div className='profile_availabilities'>
            <div className='day-available'>
              <div className="day">
                <p>Lundi</p>
              </div>
              <input name='lundi-start' type='time' value={dataUser.availabilities.lundi.start} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                lundi : 
                {...dataUser.availabilities.lundi, start : e.target.value}}})}
              />
              <input name='lundi-end' type='time' value={dataUser.availabilities.lundi.end} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                lundi : 
                {...dataUser.availabilities.lundi, end : e.target.value}}})}
              />
            </div>
            <div className='day-available'>
              <div className="day">
                <p>Mardi</p>
              </div>
              <input name='mardi-start' type='time' value={dataUser.availabilities.mardi.start} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                mardi : 
                {...dataUser.availabilities.mardi, start : e.target.value}}})}
              />
              <input name='mardi-end' type='time' value={dataUser.availabilities.mardi.end} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                mardi : 
                {...dataUser.availabilities.mardi, end : e.target.value}}})}
              />
            </div>
            <div className='day-available'>
              <div className="day">
                <p>Mercredi</p>
              </div>
              <input name='mercredi-start' type='time' value={dataUser.availabilities.mercredi.start} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                mercredi : 
                {...dataUser.availabilities.mercredi, start : e.target.value}}})}
              />
              <input name='mercredi-end' type='time' value={dataUser.availabilities.mercredi.end} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                mercredi : 
                {...dataUser.availabilities.mercredi, end : e.target.value}}})}
              />
            </div>
            <div className='day-available'>
              <div className="day">
                <p>Jeudi</p>
              </div>
              <input name='jeudi-start' type='time' value={dataUser.availabilities.jeudi.start} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                jeudi : 
                {...dataUser.availabilities.jeudi, start : e.target.value}}})}
              />
              <input name='jeudi-end' type='time' value={dataUser.availabilities.jeudi.end} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                jeudi : 
                {...dataUser.availabilities.jeudi, end : e.target.value}}})}
              />
            </div>
            <div className='day-available'>
              <div className="day">
                <p>Vendredi</p>
              </div>
              <input name='vendredi-start' type='time' value={dataUser.availabilities.vendredi.start} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                vendredi : 
                {...dataUser.availabilities.vendredi, start : e.target.value}}})}
              />
              <input name='vendredi-end' type='time' value={dataUser.availabilities.vendredi.end} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                vendredi : 
                {...dataUser.availabilities.vendredi, end : e.target.value}}})}
              />
            </div>
            <div className='day-available'>
              <div className="day"> 
                <p>Samedi</p>
              </div>
              <input name='samedi-start' type='time' value={dataUser.availabilities.samedi.start} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                samedi : 
                {...dataUser.availabilities.samedi, start : e.target.value}}})}
              />
              <input name='samedi-end' type='time' value={dataUser.availabilities.samedi.end} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                samedi : 
                {...dataUser.availabilities.samedi, end : e.target.value}}})}
              />
            </div>
            <div className='day-available'>
              <div className="day"> 
                <p>Dimanche</p>
              </div>
              <input name='dimanche-start' type='time' value={dataUser.availabilities.dimanche.start} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                dimanche : 
                {...dataUser.availabilities.dimanche, start : e.target.value}}})}
              />
              <input name='dimanche-end' type='time' value={dataUser.availabilities.dimanche.end} onChange={ e => setDataUser({...dataUser, availabilities : 
                {...dataUser.availabilities, 
                dimanche : 
                {...dataUser.availabilities.dimanche, end : e.target.value}}})}
              />
            </div>

          </div>) 
          : 
            <div className='availabilities'>
                {dataUser.availabilities.lundi.start && dataUser.availabilities.lundi.end !== '' ? <p>Lundi : <span>De</span> {dataUser.availabilities.lundi.start} à {dataUser.availabilities.lundi.end}</p> : null}
                {dataUser.availabilities.mardi.start && dataUser.availabilities.mardi.end !== '' ?<p>Mardi : <span>De</span> {dataUser.availabilities.mardi.start} à {dataUser.availabilities.mardi.end}</p> : null}
                {dataUser.availabilities.mercredi.start && dataUser.availabilities.mercredi.end !== '' ?<p>Mercredi : <span>De</span> {dataUser.availabilities.mercredi.start} à {dataUser.availabilities.mercredi.end}</p> : null}
                {dataUser.availabilities.jeudi.start && dataUser.availabilities.jeudi.end !== '' ?<p>Jeudi : <span>De</span> {dataUser.availabilities.jeudi.start} à {dataUser.availabilities.jeudi.end}</p> : null}
                {dataUser.availabilities.vendredi.start && dataUser.availabilities.vendredi.end !== '' ?<p>Vendredi : <span>De</span> {dataUser.availabilities.vendredi.start} à {dataUser.availabilities.vendredi.end}</p> : null}
                {dataUser.availabilities.samedi.start && dataUser.availabilities.samedi.end !== '' ?<p>Samedi : <span>De</span> {dataUser.availabilities.samedi.start} à {dataUser.availabilities.samedi.end}</p> : null}
                {dataUser.availabilities.dimanche.start && dataUser.availabilities.dimanche.end !== '' ?<p>Dimanche : <span>De</span> {dataUser.availabilities.dimanche.start} à {dataUser.availabilities.dimanche.end}</p> : null}
            </div>
          }
          <div>
            {modif ? 
              <Next title="Valider mon profil" status='active' onClick={()=> {
                  validprof()
                  updateMyProfile()}}
              />
            : 
            <Next title="Modifier mon profil" status='passive' onClick={()=> modifprof()}/>
            }

          </div>
        </div>
    </div>
    }
    </>
  );
};

export default MyProfile;