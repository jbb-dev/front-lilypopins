import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './contactParentModal.css';
import DemandCard from '../../Suivi/DemandCard'


const CalendarEventModal = (props) => {

  const {isOpen, handleModal, data} = props

  console.log(data)

  return (

    <div className="main-contact-parent-modal">
      <Modal isOpen={isOpen} toggle={handleModal} >
        <ModalHeader toggle={handleModal}>Détail de la garde</ModalHeader>
        <ModalBody>
          <DemandCard 
            contactedParent={data.Users[0].firstname}
            status={data.status }
            date={data.beginAt}
            endDate={data.endAt}
            avatar={data.Users[0].avatar}
            // isMyDemand=
            userId={data.id}
            contactedParentId={data.contactedParentId}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CalendarEventModal;