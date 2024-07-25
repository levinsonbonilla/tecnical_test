import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AppointmentConfirmModal = ({ show, onHide, appointment, doctors, doctorId, setDoctorId, patients, patientId, setPatientId, handleConfirm }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Detalles de la Cita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {appointment && (
                    <div>
                        <p><strong>Título:</strong> {appointment.title}</p>
                        <p><strong>Inicio:</strong> {appointment.start.toLocaleString()}</p>
                        <p><strong>Fin:</strong> {appointment.end.toLocaleString()}</p>
                        <Form.Group>
                            <Form.Label>Doctor</Form.Label>
                            <Form.Control as="select" value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
                                <option value="">Seleccione un doctor</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>{`${doctor.name} ${doctor.lastName}`}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Paciente</Form.Label>
                            <Form.Control as="select" value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                                <option value="">Seleccione un paciente</option>
                                {patients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>{`${patient.name} ${patient.lastName}`}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirmar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AppointmentConfirmModal;
