import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove Router import
import Navbar from './Navbar';

import Dashboard from './Dashboard';
import WeldGunDetails from './WeldGunDetails';
import Errors from './Errors';
import Admin from './Admin';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weld-gun-details" element={<WeldGunDetails />} />
        <Route path="/errors" element={<Errors />} />
        <Route path="/admin" element={<Admin />}/>
     
      </Routes>
    </div>
  );
}

export default App;
