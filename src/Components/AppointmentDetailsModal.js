import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const AppointmentDetailsModal = ({ show, onHide, detailsAppointment }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles de la Cita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {detailsAppointment && (
                    <div>
                        <p><strong>Doctor:</strong> {detailsAppointment[0].doctor}</p>
                        <p><strong>Paciente:</strong> {detailsAppointment[0].patient}</p>
                        <p><strong>¿Atendido?:</strong> {detailsAppointment[0].isAttended ? 'Sí' : 'No'}</p>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AppointmentDetailsModal;
