import React, { useState } from 'react'
import './demandCard.css'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom"
import CancelDemandModal from '../common/Modals/CancelDemandModal';


const DemandCard = (props) => {
    const { contactedParent, contactedParentId, status, date, endDate, avatar, isMyDemand, demandId, deleteDemand, acceptDemand } = props;

    // Modal Cancel Demand
    const [hasCanceled, setHasCanceled] = useState(false)

    // Modal Accept Demand
    const [hasAccept, setHasAccept] = useState(false)

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
                <div className="card" style={{'color' : 'black'}} key={demandId} >
                    <Link to={{ pathname: `my-demands/parent/${contactedParentId}`}} style={{ textDecoration: "none", color : 'black' }} >
                        <div className="card-body">
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
                    </Link>
                        < div className="footer-demandCard">
                            { hasAccept === false && isMyDemand === false ? 
                                <Button color= "success" 
                                    onClick={() => 
                                        // setHasAccept(!hasAccept) 
                                        acceptDemand(demandId)} 
                                    style={{ marginBottom: '1em', borderRadius : '20px' }} >Accepter la garde</Button>
                                : null }

                            <Button color="secondary" onClick={() => window.location.href=`/my-demands/parent/conversation/${contactedParentId}`} style={{ marginBottom: '1em', borderRadius : '20px' }} >Envoyer un message</Button>

                            { hasCanceled === false ? 
                                <Button color="danger" onClick={() => setHasCanceled(!hasCanceled)} style={{ marginBottom: '1em', borderRadius : '20px' }} >Annuler la demande</Button>
                                : null }
                        </div>
                </div>
                {hasCanceled ? 
                    <CancelDemandModal deleteDemand={deleteDemand} demandId={demandId} contactedParent={contactedParent} hasCanceled={hasCanceled} setHasCanceledDemand={setHasCanceled} />
                : null
                }
            </>
            )
}

export default DemandCard;