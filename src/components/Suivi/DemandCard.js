import React, {useState } from 'react'
import './demandCard.css'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom"
import CancelDemandModal from '../common/Modals/CancelDemandModal';

const DemandCard = (props) => {

    const userId = props.userId

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
                <Link to={{ pathname: `my-demands/parent/${userId}`}} style={{ textDecoration: "none" }} >
                    <div className="card" style={{'width': '20em', 'color' : 'black'}} >
                        <div className="card-body">
                            <div >
                                <h5 className="card-title" style={{'text-align': 'center'}}>{new Date(props.date).toLocaleDateString("fr-FR", options)}</h5>
                                <div className='demand-main-info'>
                                    {props.isMyDemand ? 
                                        <p style={{'text-align': 'center'}}>Envoyée à {props.contactedParent}</p>
                                        : 
                                        <p style={{'text-align': 'center'}}>Envoyée par {props.contactedParent}</p>
                                    }
                                        <img src={props.avatar} alt='avatar' id="avatar-small"/>
                                        <p style={{'text-align': 'center'}}>Status : {props.status}</p>
                                </div>
                            </div>
                            {/* <p className="card-text" style={{'text-align': 'justify'}}>Vous avez envoyé une demande de garde à {props.contactedParent} pour faire garder #NomEnfant le #Jour entre #DebutGarde et #FinGarde</p> */}
                            <div className='button-delete-demand'>
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