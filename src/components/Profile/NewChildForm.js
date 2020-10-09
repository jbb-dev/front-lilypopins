import React, { useState, useContext } from 'react'
import { Redirect } from "react-router-dom"
import Header from '../common/Header/Header'
import Back from '../common/Buttons/Back'
import SelectButton from '../common/Buttons/SelectButton'
import SectionChild from '../common/Others/SectionChild'
import Validate from '../common/Buttons/Validate'
import './newChildForm.css'
import { ChildrenContext } from '../../context/ChildrenContext'
import Axios from 'axios'
import { avatarGirl } from '../common/Others/avatar'
import { avatarBoy } from '../common/Others/avatar'



const NewChildForm = () => {

    const { childrenProfile, setChildrenProfile } = useContext(ChildrenContext)

    const [hasFinished, setHasFinished] = useState(false)

    const [error, setError] = useState(null)

    const [hasClickedOnSex, setHasClickedOnSex] = useState(false)


    // create the child in bdd
    const token = localStorage.token 
    const addChild = () => {
        Axios
            .post('http://localhost:4000/api/users/add-a-child', childrenProfile,
                { headers : { 'Authorization' : 'Bearer ' + token}})
            .then(setHasFinished(true))
            .catch(err=> setError(err))
    }

    // Management of child avatar and carousel
    const [defaultAvatar, setDefaultAvatar] = useState(null)
    
    const previousImage = (imageArray, currentImage) => {
        let currentIndex = imageArray.indexOf(currentImage)
        let minIndex = 0
        if (currentIndex > minIndex) {   
            const imageToDisplay = imageArray[currentIndex - 1]
            setChildrenProfile({...childrenProfile, avatar : imageToDisplay}) }
        else {
            const maxIndex = imageArray.length - 1
            const imageToDisplay = imageArray[maxIndex]
            setChildrenProfile({...childrenProfile, avatar : imageToDisplay}) }
    }

    const nextImage = (imageArray, currentImage) => {
        let currentIndex = imageArray.indexOf(currentImage)
        let maxIndex = imageArray.length - 1
        if (currentIndex < maxIndex) {   
            const imageToDisplay = imageArray[currentIndex + 1]
            setChildrenProfile({...childrenProfile, avatar : imageToDisplay}) }
        else {
            const minIndex = 0
            const imageToDisplay = imageArray[minIndex]
            setChildrenProfile({...childrenProfile, avatar : imageToDisplay}) }
    }


    return (
        <>

        {hasFinished ? <Redirect to="/my-children" /> : null}

        <Header className="header" title="Ajouter mon enfant" />

        <div className="Profile-Page">

        <Back title='Retour' link='/my-children' />

        {error !== null ? <div class="alert alert-danger" role="alert">{error}</div> : null}

            <h3 className='welcome'>Présentez votre enfant</h3>
                <form className="profile_forms">

                {hasClickedOnSex ? 
                    <div className="child-image">
                        <div className='chevron-left' 
                        onClick={() => 
                            {childrenProfile.sex === 'boy' ? previousImage(avatarBoy, childrenProfile.avatar) 
                            : previousImage(avatarGirl, childrenProfile.avatar)} 
                            }>
                            <i class="fas fa-chevron-left" id='chevron-left'></i>
                        </div>
                        <img src={childrenProfile.avatar !== null ? childrenProfile.avatar : defaultAvatar} id='child-avatar' />
                        <div className='chevron-right' 
                            onClick={() => 
                                        {childrenProfile.sex === 'boy' ? nextImage(avatarBoy, childrenProfile.avatar)
                                        : nextImage(avatarGirl, childrenProfile.avatar)} 
                                    }>
                            <i class="fas fa-chevron-right" id='chevron-right'></i>
                        </div>
                    </div>
                : null }

                    <div className='select_sex'>
                        <SelectButton
                            radioSelBtnId='Garçon'
                            radioSelBtnValue='boy'
                            radioSelBtnName='sex'
                            onClick={() => {
                                setHasClickedOnSex(true)
                                setDefaultAvatar(avatarBoy[0])}
                            }
                            onChange={e => {
                                setChildrenProfile({...childrenProfile, sex : e.target.value})}}
                        />

                        <SelectButton
                            radioSelBtnId='Fille'
                            radioSelBtnValue='girl'
                            radioSelBtnName='sex'
                            onClick={() => {
                                setHasClickedOnSex(true)
                                setDefaultAvatar(avatarGirl[0])
                                setChildrenProfile({...childrenProfile, avatar : avatarGirl[0]}) }
                            }
                            onChange={e => setChildrenProfile({...childrenProfile, sex : e.target.value})}                            
                        />
                    </div>
                    <label >
                    <input
                        required
                        className="profile_input_text"
                        type="text"
                        placeholder=" Prénom de votre enfant"
                        value={childrenProfile.firstname}
                        onChange={(e) =>
                        setChildrenProfile({ ...childrenProfile, firstname: e.target.value })
                        }
                    />
                    </label>
                    <label>
                    <input
                        required
                        className="profile_input_text"
                        type="number"
                        placeholder=" Age de votre enfant"
                        value={childrenProfile.age}
                        onChange={(e) =>
                        setChildrenProfile({ ...childrenProfile, age: e.target.value })
                        }
                    />
                    </label>
                </form>
                
                <SectionChild onClick={(e) =>
                        setChildrenProfile({ ...childrenProfile, section: e.target.value }) }
                />

                <form className="profile_forms">
                    <label>
                    <textarea
                        className="profile_input_text"
                        type="text"
                        placeholder="Quelques mots sur votre enfant"
                        value={childrenProfile.biography}
                        onChange={(e) =>
                                setChildrenProfile({ ...childrenProfile, biography: e.target.value })
                            }
                    />

                    </label>
                </form>



            {childrenProfile.sex && childrenProfile.firstname && childrenProfile.age && childrenProfile.section !== '' ?
            
                <Validate title='Enregistrer' status='active' onClick={() => addChild()}/>
            
            : 
                <Validate title='Enregistrer' status='passive' />
            }
            </div>
    </>
    )
}

export default NewChildForm;