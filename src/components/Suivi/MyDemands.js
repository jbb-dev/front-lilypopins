
import React, {useState, useEffect} from 'react'
import Axios from 'axios';
import DemandCard from './DemandCard'

const MyDemands = () => {

    const token = localStorage.token

    const [myDemands, setMyDemands] = useState([])
    
    const getMyDemands = () => {
        Axios
        .get('http://localhost:4000/api/demands/my-demands', { 
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
                    <DemandCard contactedParent={demand.Users[0].firstname} status={demand.status} date={demand.beginAt} avatar={demand.Users[0].avatar} isMyDemand={true} userId={demand.Users[0].id} />
                ))
            : 
                <p style={{'text-align': 'center'}}>Vous n'avez pas encore fait de demande de garde pour l'instant.</p>
            }
            </>
            )
}

export default MyDemands;