import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './contactParentModal.css';

const CancelDemandModal = (props) => {

  // Firstname of parent to contact
  const firstname = props.firstname

  // Message to send to the selected parent
  const [message, setMessage] = useState('')

  // Has sent or not the message 
  const [hasSentMessage, setHasSentMessage] = useState(false)

  // By default, modal is closed
  const [modal, setModal] = useState(true);

  // Open or close modal
  const toggle = () => setModal(!modal);

  // Send email message to the contacted parent
  const sendEmail = () => {
    Axios
    .get(`http://localhost:4000/api/users/messages`)
    .then(setHasSentMessage(!hasSentMessage))
    .catch(err=> console.error(err))
  }


  return (
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Supprimer ma demande</ModalHeader>
        <ModalBody>
          <p>Confirmez-vous la suppression de votre demande de garde ?</p>
        </ModalBody>
        <ModalFooter>
          <Button id='contact-parent-send-message' onClick={() => {
            toggle()
            sendEmail()}}>
            Supprimer la demande
          </Button>
          <Button color="secondary" onClick={() => toggle()}>Annuler</Button>
        </ModalFooter>
      </Modal>
  );
}

export default CancelDemandModal;