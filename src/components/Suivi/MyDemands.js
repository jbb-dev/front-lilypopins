
import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import DemandCard from './DemandCard'
const { REACT_APP_API_URL } = process.env;

const MyDemands = () => {

    const token = localStorage.token

    const [myDemands, setMyDemands] = useState([])
    
    const [errorMessage, setErroMessage] = useState(null)

    const [sucessMessage, setSucessMessage] = useState(null)

    // Count how many deletions to have a new render with useEffect
    const [numberOfDeletion, setNumberOfDeletion] = useState(0)


    const getMyDemands = () => {
        Axios
        .get(`${REACT_APP_API_URL}/api/demands/my-demands`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
          })
        .then(response => setMyDemands(response.data))
        .catch(err => setErroMessage(err.data))
    }

    const deleteDemand = (demandId) => {
        Axios
        .delete(`${REACT_APP_API_URL}/api/demands/delete/${demandId}`, {headers : { 'Authorization' : 'Bearer ' + token}} )
        .then(res => setSucessMessage(res.data))
        .finally(setNumberOfDeletion(numberOfDeletion + 1))
        .catch(err => setErroMessage(err.data))
    }


    useEffect(() => {
        getMyDemands()
      }, [numberOfDeletion]);

    return (
            <>

            {/* Display Success or Error messages */}
            {errorMessage !== null ? <div className="alert alert-danger" role="alert">{errorMessage}</div> : null}
            {sucessMessage !== null ? <div className="alert alert-success" role="alert">{sucessMessage}</div> : null}

            { myDemands.length > 0 ?
                myDemands.map(demand => (
                    <DemandCard 
                        isMyDemand={true} 
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
                    />
                ))
            : 
                <p style={{'textAlign': 'center'}}>Vous n'avez pas encore fait de demande de garde pour l'instant.</p>
            }
            </>
            )
}

export default MyDemands;