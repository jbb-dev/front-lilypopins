import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import './contactParentModal.css';
import DemandCard from '../../Suivi/DemandCard'


const CalendarEventModal = (props) => {

  const {isOpen, handleModal, data} = props

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
            isMyDemand={data.isMyDemand}
            userId={data.id}
            contactedParentId={data.contactedParentId}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default CalendarEventModal;