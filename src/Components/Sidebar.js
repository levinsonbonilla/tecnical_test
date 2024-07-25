import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="bg-light border-right" id="sidebar">
      <Nav className="flex-column p-3">
        <Nav.Link href={`/`}>Pacientes</Nav.Link>
        <Nav.Link href="/doctors">Doctores</Nav.Link>
        <Nav.Link href="/agenda">Citas</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
