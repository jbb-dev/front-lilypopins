
import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import Axios from 'axios';
import Header from "../common/Header/Header"
import BackHome from '../common/Buttons/BackHome'
import ProfileSelect from '../common/Others/ProfileSelect'
import DemandCard from './DemandCard'
const { REACT_APP_API_URL } = process.env;

const MyBabbySittings = () => {

    const token = localStorage.token

    const [myBabbySittings, setMyBabbySittings] = useState([])

    const [errorMessage, setErroMessage] = useState(null)

    const [sucessMessage, setSucessMessage] = useState(null)

    const [numberOfDeletion, setNumberOfDeletion] = useState(0)

    // Count how many acceptations to have a new render with useEffect
    const [numberOfAccept, setNumberOfAccept] = useState(0)

    
    const getMyBabbySittings = () => {
        Axios
        .get(`${REACT_APP_API_URL}/api/demands/kidsitting/all`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
          })
        .then(response => setMyBabbySittings(response.data))
        .catch(err => console.log(err))
    }

    const deleteDemand = (demandId) => {
        Axios
        .delete(`${REACT_APP_API_URL}/api/demands/delete/${demandId}`, {headers : { 'Authorization' : 'Bearer ' + token}} )
        .then(res => setSucessMessage(res.data))
        .finally(setNumberOfDeletion(numberOfDeletion + 1))
        .catch(err => setErroMessage(err.data))
    }

    const acceptDemand = (demandId) => {
        Axios
        .put(`${REACT_APP_API_URL}/api/demands/accept/${demandId}`, {headers : { 'Authorization' : 'Bearer ' + token}} )
        .then(res => setSucessMessage(res.data))
        .finally(setNumberOfAccept(numberOfAccept + 1))
        .catch(err => setErroMessage(err.data))

    }


    useEffect(() => {
        getMyBabbySittings()
      }, [numberOfDeletion]);

    return (
            <>

            <Header className="header" title="Suivi des gardes" />

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
                <div>
                    <BackHome />

                    <div className='FollowUp-Page'>

                        <ProfileSelect 
                            title= {{
                                option1 : 'Mes demandes',
                                option2 : 'Mes gardes à faire' }}
                            status={{
                                option1 : 'passive',
                                option2 : 'active' }}
                            link = {{
                                option1 : '/my-demands',
                                option2 : '/my-kidsitting' 
                                    }}
                        />

                        {/* Display Success or Error messages */}
                        {errorMessage !== null ? <div className="alert alert-danger" role="alert">{errorMessage}</div> : null}
                        {sucessMessage !== null ? <div className="alert alert-success" role="alert">{sucessMessage}</div> : null}


                        { myBabbySittings.length > 0 ?
                            myBabbySittings.map(demand => (
                                <DemandCard 
                                    isMyDemand={false} 
                                    contactedParentId={demand.contactedParentId}
                                    key={demand.id} 
                                    contactedParent={demand.Users[0].firstname} 
                                    status={demand.status} 
                                    date={demand.beginAt} 
                                    endDate={demand.endAt} 
                                    avatar={demand.Users[0].avatar} 
                                    userId={demand.Users[0].id} 
                                    contactedParentId={demand.contactedParentId}
                                    demandId={demand.id}
                                    deleteDemand={deleteDemand}
                                    acceptDemand={acceptDemand}
                                />
                            ))
                        : 
                            <p style={{'text-align': 'center'}}>Vous n'avez pas reçu de demande de garde pour l'instant.</p>
                        }
                    </div>
                </div> 
            }
        </>
    )
}

export default MyBabbySittings;