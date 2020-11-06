import React, { useState } from 'react'
import Axios from 'axios'
import { avatarGirl } from '../../common/Others/avatar'
import { avatarBoy } from '../../common/Others/avatar'
import SelectButton from '../../common/Buttons/SelectButton'
import SectionChild from '../../common/Others/SectionChild'
import Validate from '../Buttons/Validate'
import './childProfileForm.css'
const { REACT_APP_API_URL } = process.env;

const ChildProfileForm = (props) => {

    const token = localStorage.token 

    const [dataChild, setDataChild] = useState(props.data)

    // Management of child avatar and carousel
    const [defaultAvatar, setDefaultAvatar] = useState(null)

    const previousImage = (imageArray, currentImage) => {
        let currentIndex = imageArray.indexOf(currentImage)
        let minIndex = 0
        if (currentIndex > minIndex) {   
            const imageToDisplay = imageArray[currentIndex - 1]
            setDataChild({...dataChild, avatar : imageToDisplay}) }
        else {
            const maxIndex = imageArray.length - 1
            const imageToDisplay = imageArray[maxIndex]
            setDataChild({...dataChild, avatar : imageToDisplay}) }
    }

    const nextImage = (imageArray, currentImage) => {
        let currentIndex = imageArray.indexOf(currentImage)
        let maxIndex = imageArray.length - 1
        if (currentIndex < maxIndex) {   
            const imageToDisplay = imageArray[currentIndex + 1]
            setDataChild({...dataChild, avatar : imageToDisplay}) }
        else {
            const minIndex = 0
            const imageToDisplay = imageArray[minIndex]
            setDataChild({...dataChild, avatar : imageToDisplay}) }
    }

    // Update child data in bdd 
    const updateMyChildProfile = () => {
        Axios
        .put(`${REACT_APP_API_URL}/api/users/my-children/${dataChild.id}`, dataChild, 
            { 
            headers : { 'Authorization' : 'Bearer ' + token}
            })
        .catch(err=> console.error(err))
    }


    return (
        <div className="main-child-profile-form">
            <div className="child-image">
                <div className='chevron-left' 
                    onClick={() => 
                        {dataChild.sex === 'boy' ? previousImage(avatarBoy, dataChild.avatar) 
                        : previousImage(avatarGirl, dataChild.avatar)} 
                        }>
                    <i className="fas fa-chevron-left" id='chevron-left'></i>
                </div>
                <img src={dataChild.avatar !== null ? dataChild.avatar : defaultAvatar} id='child-avatar' />
                <div className='chevron-right' 
                    onClick={() => 
                        {dataChild.sex === 'boy' ? nextImage(avatarBoy, dataChild.avatar)
                        : nextImage(avatarGirl, dataChild.avatar)} 
                        }>
                    <i className="fas fa-chevron-right" id='chevron-right'></i>
                </div>
            </div>

            <div className='select_sex'>
            <SelectButton
                radioSelBtnId='Garçon'
                radioSelBtnValue='boy'
                radioSelBtnName='sex'
                onClick={() => setDefaultAvatar(avatarBoy[0])}
                onChange={e => setDataChild({...dataChild, sex : e.target.value})}
            />

            <SelectButton
                radioSelBtnId='Fille'
                radioSelBtnValue='girl'
                radioSelBtnName='sex'
                onClick={() => setDefaultAvatar(avatarGirl[0])}
                onChange={e => setDataChild({...dataChild, sex : e.target.value})}                            
            />
            </div>
            <div className='child-information'>
                <form>
                    <label className = "child-profile-label" htmlFor='prenom'>Prénom de votre enfant :</label>
                    <input
                        required
                        name='prenom'
                        className="child-profile-input"
                        type="text"
                        placeholder=" Prénom de votre enfant"
                        value={dataChild.firstname}
                        onChange={(e) =>
                        setDataChild({ ...dataChild, firstname: e.target.value })
                        }
                    />
                    <label className = "child-profile-label" htmlFor='age'>Age de votre enfant :</label>
                    <input
                        required
                        name='age'
                        className="child-profile-input"
                        type="number"
                        placeholder=" Age de votre enfant"
                        value={dataChild.age}
                        onChange={(e) =>
                        setDataChild({ ...dataChild, age: e.target.value })
                        }
                    />
                </form>
                    
                <SectionChild value={dataChild.section} onClick={(e) => setDataChild({ ...dataChild, section: e.target.value }) } />
            

                <form>
                <label className = "child-profile-label" htmlFor='biography'>Texte de présentation de votre enfant :</label>
                    <textarea
                        className="child-biography"
                        name='biography'
                        type="text"
                        placeholder="Quelques mots sur votre enfant"
                        value={dataChild.biography}
                        onChange={(e) =>
                                setDataChild({ ...dataChild, biography: e.target.value })
                            }
                    />
                </form>
            </div>

            {dataChild.sex && dataChild.firstname && dataChild.age && dataChild.section !== '' ?
            
                <Validate title='Enregistrer' status='active' onClick={() => {
                    props.wantModif()
                    updateMyChildProfile()}
                    }
                />
            : null}

        </div>
    )
}

export default ChildProfileForm