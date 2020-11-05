import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './contactParentModal.css';


const ContactParent = (props) => {

  // Firstname of parent to contact
  const firstname = props.firstname

  // By default, modal is closed
  const [modal, setModal] = useState(false);

  // Open or close modal
  const toggle = () => setModal(!modal);

  return (
    <div className="main-contact-parent-modal">
      <Button className='main-contact-parent-modal-button' onClick={toggle}>Contacter {firstname}</Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Demander une garde à {firstname}</ModalHeader>
        <ModalBody>
          <p>Expliquez lui les raisons de votre prise de contact.</p>
          <form className="contact-parent_forms">
            <label>
            <textarea
                type="text"
                placeholder="Votre petit mot ici"
                value={props.text}
                onChange={props.messageToSend}
            />
            </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button id='contact-parent-send-message' 
            onClick={() => {
                toggle()
                {props.createNewDemand()}
            }}>
            Envoyer votre demande
          </Button>
          <Button color="secondary" onClick={() => toggle()}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ContactParent;