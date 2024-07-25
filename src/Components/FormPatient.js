import React, { useEffect, useState } from 'react';
import { addPatient } from '../Data/patients';
import { getEps } from '../Data/eps';
import { Link } from 'react-router-dom';

const FormPatient = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        lastName: '',
        address: '',
        phone: '',
        gender: '',
        personalIdentification: '',
        epsId: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [epsData, setEpsData] = useState([]);

    const epsList = async () => {
        const responseObject = await getEps();
        setEpsData(responseObject.data ?? []);
    }

    useEffect(() => {
        epsList();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);
        const responseObject = await addPatient(formData);
        if (responseObject.errorMessage) {
            setErrorMessage(responseObject.errorMessage);
        } else {
            setSuccessMessage('Paciente agregado con éxito');
            setFormData({
                email: '',
                password: '',
                name: '',
                lastName: '',
                address: '',
                phone: '',
                gender: '',
                personalIdentification: '',
                epsId: ''
            });
        }
    };

    return (
        <React.Fragment>
            <div className="container mt-5">
                <h2>Agregar Paciente</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="lastName">Apellido</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="address">Dirección</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="phone">Teléfono</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="gender">Género</label>
                            <select
                                className="form-control"
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="personalIdentification">Identificación Personal</label>
                            <input
                                type="text"
                                className="form-control"
                                id="personalIdentification"
                                name="personalIdentification"
                                value={formData.personalIdentification}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="epsId">EPS</label>
                            <select
                                className="form-control"
                                id="epsId"
                                name="epsId"
                                value={formData.epsId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione</option>
                                {epsData.map(eps => (
                                    <option key={eps.id} value={eps.id}>{eps.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Link to={"/"} className='btn btn-secondary'>Cancelar</Link> &nbsp;
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default FormPatient;
