import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getPatients } from '../Data/patients';
import { Link } from 'react-router-dom';

const DataTablePatients = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { name: 'Identificación', selector: row => row.personalIdentification, sortable: true },
    { name: 'Nombre', selector: row => row.name, sortable: true },
    { name: 'Apellido', selector: row => row.lastName, sortable: true },
    { name: 'Correo electrónico', selector: row => row.email, sortable: true },
    { name: 'Dirección', selector: row => row.address, sortable: true },
    { name: 'Teléfono', selector: row => row.phone, sortable: true },
    { name: 'Genero', selector: row => row.gender, sortable: true }
  ];

  const patientsList = async () => {
    setLoading(true);
    const responseObject = await getPatients();
    setData(responseObject.data.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    patientsList();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <Link to={"/add/patient"} className='btn btn-primary col-1'>Nuevo</Link>
      <DataTable
        title="Pacientes"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        progressPending={loading}
      />
    </React.Fragment>
  );
};

export default DataTablePatients;
