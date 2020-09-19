import React from "react";
import { Modal } from "react-bootstrap";

const ShowModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Caval Cloud
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Votre compte a bien été créé !</p>
      </Modal.Body>
    </Modal>
  );
}

export default ShowModal