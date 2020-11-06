import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Axios from 'axios';
import Header from '../common/Header/Header'
import Back from '../common/Buttons/Back'
import ChildCardInResultDetail from '../Search/ChildCardInResultDetail'
import './demandDetail.css'
import { Collapse, Button} from 'reactstrap'
const { REACT_APP_API_URL } = process.env;


const DemandDetail = (props) => {

    const token = localStorage.token

    // The id of the selected parent to contact
    const userId = Number(props.match.params.id)

    // Conversation Id between current user and the contacted parent
    const [idConversation, setIdConversation] = useState(null)

    const [dataUser, setDataUser] = useState(null)

    // For toggles
    const toggleOne = () => setIsOpenOne(!isOpenOne);
    const [isOpenOne, setIsOpenOne] = useState(false)

    const toggleTwo = () => setIsOpenTwo(!isOpenTwo);
    const [isOpenTwo, setIsOpenTwo] = useState(false)

    const toggleThree = () => setIsOpenThree(!isOpenThree);
    const [isOpenThree, setIsOpenThree] = useState(true)

    

    // For date format
    const options = { 
        year: "numeric", 
        month: "long", 
        day: "2-digit",
        hour : "numeric",
        minute : "numeric"
    };

    // Get information about the selected parent from its ID
    const getParentInformation = () => {
        Axios
        .get(`${REACT_APP_API_URL}/api/search/${userId}`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
            })
        .then(res => setDataUser(res.data))
        .catch(err=> console.log(err.response.data.error))        
    }

    // const getConversationId = () => {
    //     Axios
    //     .get(`${REACT_APP_API_URL}/api/conversations/user/${userId}`, { 
    //         headers : { 'Authorization' : 'Bearer ' + token}
    //         })
    //     .then(res => setIdConversation(res.data))
    //     .catch(err=> console.log(err.response.data.error))        

    // }
    
    useEffect(() => {
        getParentInformation()
        // getConversationId()
    }, [])

    return (
            <>

                <Header className="header" title="Fiche Demande" />

                <div className="top-demand-detail">
                    <Back title='Précédent'/>
                    <Link to={{ pathname: `conversation/${userId}`}} style={{ textDecoration: "none" }} >
                        <span style={{"font-size": "48px", "color": "#5a6268"}}>
                            <i className="fas fa-envelope" id="enveloppe" />
                        </span>
                    </Link>
                </div>

                {dataUser === null ? 
                    <div>
                        <p style={{'textAlign' : 'center'}}>Chargement en cours...</p>
                    </div>
                :

                    <div>
                        <div className='parent-info'>
                            <h5>{dataUser.firstname} {dataUser.lastname}</h5>
                            <p>{dataUser.age} ans</p>
                            <p>Habite à {dataUser.city}, {dataUser.postalCode}</p>
                            <img id="avatar-large" src={dataUser.avatar} alt="parent-avatar"></img>
                            <p className='biography'>" {dataUser.biography} "</p>
                        </div>


                        <div className='parent-availabilities'>
                            <Button id='toggle-parent-availabilities' className='toggle-parent-button' onClick={toggleOne} style={{ marginBottom: '1rem' }}>Mes dispos pour garder vos enfants :</Button>
                            <Collapse isOpen={isOpenOne}> 
                            <div>
                                {dataUser.availabilities.lundi.start && dataUser.availabilities.lundi.end !== '' ? <p>Lundi : <span>De</span> {dataUser.availabilities.lundi.start} à {dataUser.availabilities.lundi.end}</p> : null}
                                {dataUser.availabilities.mardi.start && dataUser.availabilities.mardi.end !== '' ?<p>Mardi : <span>De</span> {dataUser.availabilities.mardi.start} à {dataUser.availabilities.mardi.end}</p> : null}
                                {dataUser.availabilities.mercredi.start && dataUser.availabilities.mercredi.end !== '' ?<p>Mercredi : <span>De</span> {dataUser.availabilities.mercredi.start} à {dataUser.availabilities.mercredi.end}</p> : null}
                                {dataUser.availabilities.jeudi.start && dataUser.availabilities.jeudi.end !== '' ?<p>Jeudi : <span>De</span> {dataUser.availabilities.jeudi.start} à {dataUser.availabilities.jeudi.end}</p> : null}
                                {dataUser.availabilities.vendredi.start && dataUser.availabilities.vendredi.end !== '' ?<p>Vendredi : <span>De</span> {dataUser.availabilities.vendredi.start} à {dataUser.availabilities.vendredi.end}</p> : null}
                                {dataUser.availabilities.samedi.start && dataUser.availabilities.samedi.end !== '' ?<p>Samedi : <span>De</span> {dataUser.availabilities.samedi.start} à {dataUser.availabilities.samedi.end}</p> : null}
                                {dataUser.availabilities.dimanche.start && dataUser.availabilities.dimanche.end !== '' ?<p>Dimanche : <span>De</span> {dataUser.availabilities.dimanche.start} à {dataUser.availabilities.dimanche.end}</p> : null}
                            </div>
                            </Collapse>               
                        </div>


                        <div className='parent-children'>
                            <Button className='toggle-parent-button' 
                                onClick={toggleTwo} 
                                style={{ marginBottom: '1rem' }}>
                                Ma petite tribu :
                            </Button>
                            
                            <Collapse isOpen={isOpenTwo}> 
                                {dataUser.Children.map(child => 
                                    <ChildCardInResultDetail data={child} key={child.id} />
                                    )}
                            </Collapse>      

         
                        </div>

                    </div>
                }
        </>
     )
}

export default DemandDetail;