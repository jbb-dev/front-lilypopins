import React, { useState } from 'react'
import './demandCard.css'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom"
import CancelDemandModal from '../common/Modals/CancelDemandModal';

const { REACT_APP_API_URL } = process.env;


const DemandCard = (props) => {
    const { contactedParent, contactedParentId, status, date, endDate, avatar, isMyDemand, userId} = props;

    const [hasCanceled, setHasCanceled] = useState(false)

    // For date format
    const options = { 
        year: "numeric", 
        month: "long", 
        day: "2-digit",
        hour : "numeric",
        minute : "numeric"
    };


    return (
            <>
                <Link to={{ pathname: `my-demands/parent/${contactedParentId}`}} style={{ textDecoration: "none" }} >
                    <div className="card" style={{'color' : 'black'}} >
                        <div className="card-body">
                            <div >
                                <h5 className="card-title" style={{'textAlign': 'center'}}>Le {new Date(date).toLocaleDateString("fr-FR", options)} jusqu'à {new Date(endDate).getHours()}h{new Date(endDate).getMinutes()}</h5>
                                <div className='demand-main-info'>
                                    {isMyDemand ? 
                                        <p style={{'textAlign': 'center'}}>Envoyée à {contactedParent}</p>
                                        : 
                                        <p style={{'textAlign': 'center'}}>Envoyée par {contactedParent}</p>
                                    }
                                        <img src={avatar} alt='avatar' id="avatar-small"/>
                                        <p style={{'textAlign': 'center'}}>Status : {status}</p>
                                </div>
                            </div>
                            <div className="footer-demandCard">
                                <Button color="secondary" onClick={() => window.location.href=`/my-demands/parent/conversation/${contactedParentId}` }>Envoyer un message</Button>
                                <Button color="danger" onClick={() => setHasCanceled(!hasCanceled)}>Annuler la demande</Button>
                            </div>
                        </div>
                    </div>
                    {hasCanceled ? 
                        <CancelDemandModal />
                    : null
                    }
                </Link>
            </>
            )
}

export default DemandCard;