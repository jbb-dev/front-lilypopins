
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
    
    const getMyBabbySittings = () => {
        Axios
        .get(`${REACT_APP_API_URL}/api/demands/kidsitting/all`, { 
            headers : { 'Authorization' : 'Bearer ' + token}
          })
        .then(response => setMyBabbySittings(response.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getMyBabbySittings()
      }, []);

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
                        { myBabbySittings.length !== 0 ?
                            myBabbySittings.map(demand => (
                                <DemandCard 
                                    contactedParent={demand.Users[0].firstname} 
                                    status={demand.status} 
                                    date={demand.beginAt} 
                                    avatar={demand.Users[0].avatar} 
                                    userId={demand.Users[0].id} 
                                    isMyDemand={false} 
                                    contactedParentId={demand.contactedParentId}
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