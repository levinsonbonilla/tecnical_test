import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { getDoctors } from '../Data/doctors';
import { Link } from 'react-router-dom';

const DataTableDoctors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { name: 'Tarjeta profesional', selector: row => row.professionalCard, sortable: true },
    { name: 'Correo electrónico', selector: row => row.email, sortable: true },
    { name: 'Nombre', selector: row => row.name, sortable: true },
    { name: 'Apellido', selector: row => row.lastName, sortable: true },
    { name: 'Teléfono profesiona', selector: row => row.professionalPhone, sortable: true },
    { name: 'Genero', selector: row => row.gender, sortable: true }
  ];

  const doctorsList = async () => {
    setLoading(true);
    const responseObject = await getDoctors();
    setData(responseObject.data.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    doctorsList();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <Link to={"/add/doctor"} className='btn btn-primary col-1'>Nuevo</Link>
      <DataTable
        title="Doctores"
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        progressPending={loading}
      />
    </React.Fragment>
  );
};

export default DataTableDoctors;
