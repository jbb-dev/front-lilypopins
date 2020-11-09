import React, { useState, useContext, useEffect } from "react"
import Axios from 'axios'
import { Collapse, Button} from 'reactstrap'
import './resultDetails.css'
import Header from '../common/Header/Header'
import Back from '../common/Buttons/Back'
import ChildCardInResultDetail from '../Search/ChildCardInResultDetail'
import ContactParentModal from '../common/Modals/ContactParentModal'
import { SearchContext } from '../../context/SearchContext';
const { REACT_APP_API_URL } = process.env;


const ResultDetails = (props) => {

    // Loading context to get info about the date of babysitting
    const { searchContext, setSearchContext } = useContext(SearchContext)

    // The id of the selected parent to contact
    const userId = Number(props.match.params.id)

    // For authentification
    const token = localStorage.token 

    // Start date for babysitting
    const beginAt = searchContext.startHour

    // End date for babysitting
    const endAt = searchContext.endHour

    // Information about the selected parent
    const [dataUser, setDataUser] = useState(null)
    
    // Message to send to the selected parent
    const [message, setMessage] = useState('')

    // For toggles
    const toggleOne = () => setIsOpenOne(!isOpenOne);
    const [isOpenOne, setIsOpenOne] = useState(false)

    const toggleTwo = () => setIsOpenTwo(!isOpenTwo);
    const [isOpenTwo, setIsOpenTwo] = useState(false)

    // Display message error if exist
     const [errorMessage, setErrorMessage] = useState(null)

    // Has sent or not the message to the parent
    const [hasSentMessage, setHasSentMessage] = useState(false)


    // Get information about the selected parent from its ID
    const getParentInformation = () => {
        Axios
        .get(`${REACT_APP_API_URL}/api/search/${userId}`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
            })
        .then(res => setDataUser(res.data))
        .catch(err=> setErrorMessage(err.response.data.error))
          
    }

    // Create a new demand in database
    const createNewDemand = () => {
        Axios
        .post(`${REACT_APP_API_URL}/api/demands/create-new-demand`, [userId, beginAt, endAt, message] ,
            { headers : { 'Authorization' : 'Bearer ' + token}})
        .catch(err=> setErrorMessage(err.response.data.error))
        .finally(setHasSentMessage(!hasSentMessage))

    }

    useEffect(() => {
        getParentInformation()
    }, [])

    return (

        <>
            <Header className="header" title="Fiche parent" />

            {dataUser === null ? 
                <div>
                    <p style={{'textAlign' : 'center'}}>Chargement en cours...</p>
                </div>
            :
            <div>

                <Back title='Précédent' link='/search/results' />
    
                <div className="main-result-detail">

                    {/* Display Success or Error messages */}
                    {errorMessage !== null ? <div className="alert alert-danger" role="alert">{errorMessage}</div> : null}
                    {errorMessage === null && hasSentMessage ? <div className="alert alert-success" role="alert">Votre demande a bien été transmise à {dataUser.firstname}</div> : null}


                    <div className='parent-info'>
                        <img className="parent-avatar" src={dataUser.avatar} alt="parent-avatar"></img>
                        <h5>{dataUser.firstname} {dataUser.lastname}</h5>
                        <p>{dataUser.age} ans</p>
                        <p>Habite à {dataUser.city}, {dataUser.postalCode}</p>
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

                    <div className='parent-children'>
                        <ContactParentModal 
                            firstname={dataUser.firstname} 
                            contactedParentId={userId} 
                            createNewDemand={createNewDemand} 
                            messageToSend={e => setMessage(e.target.value)}
                            text={message}
                        />
                    </div>

                </div>
            </div>
            }
        </>
    )
}

export default ResultDetails