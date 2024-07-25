import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAppoinments, addAppointmen, getAppoinmentData } from '../Data/appointments';
import { getDoctors } from '../Data/doctors';
import { getPatients } from '../Data/patients';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppointmentConfirmModal from './AppointmentConfirmModal';
import AppointmentDetailsModal from './AppointmentDetailsModal';

const localizer = momentLocalizer(moment);

const AppointmentCalendar = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [detailsAppointment, setDetailsAppointment] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctorId, setDoctorId] = useState('');
    const [patientId, setPatientId] = useState('');

    const appointmentsList = async () => {
        const responseObject = await getAppoinments();
        setAppointments(responseObject.data ?? []);
    }

    const doctorsList = async () => {
        const responseObject = await getDoctors();
        setDoctors(responseObject.data.data ?? []);
    }

    const patientsList = async () => {
        const responseObject = await getPatients();
        setPatients(responseObject.data.data ?? []);
    }

    useEffect(() => {
        appointmentsList();
        doctorsList();
        patientsList();
    }, []);

    const events = appointments.map((appointment) => ({
        id: appointment.id,
        title: appointment.name,
        start: new Date(`${appointment.dateAppointment}T${appointment.timeStart}`),
        end: new Date(`${appointment.dateAppointment}T${appointment.timeEnd}`),
        active: appointment.active,
        past: new Date(`${appointment.dateAppointment}T${appointment.timeEnd}`) < new Date()
    }));

    const handleSelectEvent = async (event) => {
        if (event.active && !event.past) {
            setSelectedAppointment(event);
        } else if (!event.active) {
            const responseObject = await getAppoinmentData(event.id);
            setDetailsAppointment(responseObject.data);
        }
    };

    const handleConfirm = async () => {
        if (!doctorId || !patientId) {
            toast.error('Por favor, seleccione un doctor y un paciente.');
            return;
        }

        const appointmentData = {
            doctorId,
            patientId,
            appointmentId: selectedAppointment.id,
        };

        const responseObject = await addAppointmen(appointmentData);

        if (responseObject.errorMessage) {
            toast.error(`Error: ${responseObject.errorMessage}`);
        } else {
            toast.success('Cita confirmada con éxito');
            setSelectedAppointment(null);
            setDoctorId('');
            setPatientId('');
            appointmentsList();
        }
    };

    const eventPropGetter = (event) => {
        let backgroundColor;
        if (event.past) {
            backgroundColor = '#ffcccb';
        } else {
            backgroundColor = event.active ? '#3174ad' : '#d3d3d3';
        }
        const style = {
            backgroundColor,
            borderColor: backgroundColor,
            color: event.active ? 'white' : 'black'
        };
        return { style };
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventPropGetter}
            />
            <ToastContainer />
            <AppointmentConfirmModal
                show={!!selectedAppointment}
                onHide={() => setSelectedAppointment(null)}
                appointment={selectedAppointment}
                doctors={doctors}
                doctorId={doctorId}
                setDoctorId={setDoctorId}
                patients={patients}
                patientId={patientId}
                setPatientId={setPatientId}
                handleConfirm={handleConfirm}
            />
            <AppointmentDetailsModal
                show={!!detailsAppointment}
                onHide={() => setDetailsAppointment(null)}
                detailsAppointment={detailsAppointment}
            />
        </div>
    );
};

export default AppointmentCalendar;
