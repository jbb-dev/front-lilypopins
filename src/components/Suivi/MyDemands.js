
import React, {useState} from 'react'
import './myDemands.css'
import { Button } from 'reactstrap';
import CancelDemandModal from '../common/Modals/CancelDemandModal';


const MyDemands = () => {

    // By default the demande is not canceled
    const [hasCanceled, setHasCanceled] = useState(false)

    return (
            <>
                <div className="card" style={{'width': '20em'}}>
                    <div className="card-body">
                        <div >
                            <h5 className="card-title" style={{'text-align': 'left'}}>Demande pour le #DateGarde</h5>
                            <p>Envoyé à : #NomduParentContacté</p>
                            <p>Status : en attente de réponse</p>
                        </div>
                        <p className="card-text" style={{'text-align': 'justify'}}>Vous avez envoyé une demande à #NomParentContacté pour faire garder #NomEnfant le #Jour entre #DebutGarde et #FinGarde</p>
                        <div className='button-delete-demand'>
                            <Button color="danger" onClick={() => setHasCanceled(!hasCanceled)}>Annuler la demande</Button>
                        </div>
                    </div>
                </div>
                {hasCanceled ? 
                    <CancelDemandModal />
                : null
                }
            </>
            )
}

export default MyDemands;