import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeleteConfirmationModal = ({ title, message, action, modalData, handleClose, show }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={() => {
                    action(modalData);
                    handleClose();
                }}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmationModal;