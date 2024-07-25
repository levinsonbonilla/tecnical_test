import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import DataTablePatients from './Components/DataTablePatients';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import DataTableDoctors from './Components/DataTableDoctors';
import FormPatient from './Components/FormPatient';
import FormDoctor from './Components/FormDoctor';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Layout>
          <div className='content'>
            <div className='row'>
              <Routes>
                <Route path='/' element={<DataTablePatients />} />
                <Route path='/doctors' element={<DataTableDoctors />} />
                <Route path='/add/patient' element={<FormPatient />} />
                <Route path='/add/doctor' element={<FormDoctor />} />
              </Routes>
            </div>
          </div>
        </Layout>
      </BrowserRouter>
    </React.Fragment >
  );
}

export default App;
