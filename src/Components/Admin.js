import React, { useState, useEffect } from 'react';
import './admin.css'; // Admin CSS styles
import './navbar.css'; // Navbar styles (if applicable)
import employeeData from './employees.json'; // Importing employee details

export default function Admin() {
  const [adminID, setAdminID] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [message, setMessage] = useState('');

  // Hardcoded admin credentials
  const correctAdminID = 'admin123';
  const correctAdminPassword = 'admin';

  // Handle Admin Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (adminID === correctAdminID && adminPassword === correctAdminPassword) {
      setIsAuthenticated(true);
      setMessage('');
      setEmployeeDetails(employeeData); // Load data from employee.json
    } else {
      setMessage('Invalid admin ID or password!');
    }
  };

  return (
    <div className="admin-container">
      {!isAuthenticated ? (
        <div className="admin-login-form">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin} className="login-form-flex">
            <div className="input-container">
              <label htmlFor="adminID">Admin ID:</label>
              <input
                type="text"
                id="adminID"
                value={adminID}
                onChange={(e) => setAdminID(e.target.value)}
                className="admin-input"
                placeholder="Enter your Admin ID"
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="adminPassword">Password:</label>
              <input
                type="password"
                id="adminPassword"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="admin-input"
                placeholder="Enter your Password"
                required
              />
            </div>
            <button type="submit" className="admin-button">
              Login
            </button>
          </form>
          {message && <p className="admin-message">{message}</p>}
        </div>
      ) : (
        <div className="employee-details-section">
          <h1>Employee Details</h1>
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Shift</th>
                <th>Role</th>
                <th>Programs</th>
              </tr>
            </thead>
            <tbody>
              {employeeDetails.length > 0 ? (
                employeeDetails.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.shift}</td>
                    <td>{employee.role}</td>
                    <td>
                      {employee.programs.map((program, i) => (
                        <div key={i}>{program}</div>
                      ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
