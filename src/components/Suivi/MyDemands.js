
import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import DemandCard from './DemandCard'
const { REACT_APP_API_URL } = process.env;

const MyDemands = () => {

    const token = localStorage.token

    const [myDemands, setMyDemands] = useState([])
    
    const getMyDemands = () => {
        Axios
        .get(`${REACT_APP_API_URL}/api/demands/my-demands`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
          })
        .then(response => setMyDemands(response.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getMyDemands()
      }, []);

    return (
            <>
            { myDemands.length !== 0 ?
                myDemands.map(demand => (
                    <DemandCard 
                        key={demand.id} 
                        contactedParent={demand.Users[0].firstname} 
                        status={demand.status} 
                        date={demand.beginAt} 
                        endDate={demand.endAt} 
                        avatar={demand.Users[0].avatar} 
                        isMyDemand={true} 
                        userId={demand.Users[0].id} 
                        contactedParentId={demand.contactedParentId}
                    />
                ))
            : 
                <p style={{'text-align': 'center'}}>Vous n'avez pas encore fait de demande de garde pour l'instant.</p>
            }
            </>
            )
}

export default MyDemands;