import React, { useState } from 'react';
import './weldgun.css'; // Ensure the path is correct
import employees from './employees.json'; // Ensure the path is correct

const employeeData = require('./employees.json');

export default function WeldGunDetails() {
  const [id, setId] = useState('');
  const [employee, setEmployee] = useState(null);

  // Handle the change for the input
  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  // Function to download employee details as a .txt file
  const downloadEmployeeDetails = (employee) => {
    if (employee) {
      const employeeDetails = `Employee ID: ${employee.id}
      Name: ${employee.name}
      Shift No: ${employee.shiftNo}
      In Time: ${employee.inTime}
      Time Delay: ${employee.timeDelay}

      Weld Gun Details:
      ${employee.weldGun && employee.weldGun.length > 0 
        ? employee.weldGun.map((gun, index) => `
          Program No: ${gun.programNo}
          Weld Current: ${gun.weldCurrent}
          Cycle: ${gun.cycle}
          Spot Count: ${gun.spotCount}
          Force: ${gun.force}
        `).join('\n')
        : 'No weld gun details available'}
      `;

      // Create a Blob object with the employee details string
      const blob = new Blob([employeeDetails], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${employee.name}_details.txt`;  // Name of the downloaded file
      link.click();  // Trigger the download

      // Clean up the URL object after download
      window.URL.revokeObjectURL(url);
    }
  };

  // Search for the employee by ID
  const handleSearch = () => {
    const matchedEmployee = employeeData.find((emp) => emp.id === id);
    if (matchedEmployee) {
      setEmployee(matchedEmployee);
      alert("Employee found!");
      downloadEmployeeDetails(matchedEmployee);  // Automatically trigger the download
    } else {
      alert('Employee not found!');
      setEmployee(null);
    }
  };

  return (
    <div className="weldgun-details">
      <h1>Weld Gun Details</h1>

      {/* Input section for ID */}
      <div className='search-container'>
        <label>Enter Employee ID:</label>
        <input
          type="text"
          value={id}
          onChange={handleIdChange}
          placeholder="Enter ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Display employee details if found */}
      {employee && (
        <div className="fields-container">
          <h2>Employee Details:</h2>
          <p><strong>ID:</strong> {employee.id}</p>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Shift No:</strong> {employee.shiftNo}</p>
          <p><strong>In Time:</strong> {employee.inTime}</p>
          <p><strong>Time Delay:</strong> {employee.timeDelay}</p>

          <h3>Weld Gun Details:</h3>
          {employee.weldGun && employee.weldGun.length > 0 ? (
            employee.weldGun.map((gun, index) => (
              <div key={index}>
                <p><strong>Program No:</strong> {gun.programNo}</p>
                <p><strong>Weld Current:</strong> {gun.weldCurrent}</p>
                <p><strong>Cycle:</strong> {gun.cycle}</p>
                <p><strong>Spot Count:</strong> {gun.spotCount}</p>
                <p><strong>Force:</strong> {gun.force}</p>
              </div>
            ))
          ) : (
            <p className="no-details">No weld gun details available</p>
          )}
        </div>
      )}
    </div>
  );
}
