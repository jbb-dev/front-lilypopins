import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './contactParentModal.css';

const CancelDemandModal = (props) => {
  const { contactedParent, deleteDemand, demandId, hasCanceled, setHasCanceledDemand } = props

  // Message to send to the selected parent
  const [message, setMessage] = useState('')

  // By default, modal is closed
  const [modal, setModal] = useState(true);

  // Open or close modal
  const toggle = () => {
    setModal(!modal);
    setHasCanceledDemand(!hasCanceled)
  }

  return (
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Supprimer ma demande</ModalHeader>
        <ModalBody>
        <p>{`Vous pouvez ici laisser un message à ${contactedParent} pour expliquer pourquoi vous annuler.`}</p>
          <form className="contact-parent_forms">
            <label>
            <textarea
                type="text"
                placeholder="Votre message ici"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            </label>
          </form>
        </ModalBody>
        <ModalFooter>
        <p>Confirmez-vous la suppression ?</p>
          <Button id='contact-parent-send-message' onClick={() => {
            toggle()
            deleteDemand(demandId)
            }}>
            Supprimer la demande
          </Button>
          <Button color="secondary" onClick={() => toggle()}>Annuler</Button>
        </ModalFooter>
      </Modal>
  );
}

export default CancelDemandModal;