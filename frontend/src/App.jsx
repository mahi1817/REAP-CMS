import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Admin';
import ChoiceFilling from './ChoiceFilling';
import StudentDashboard from './StudentDashboard';
import StudentInformation from './StudentInformation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/student-dashboard" />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/choice-filling" element={<ChoiceFilling />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-information" element={<StudentInformation />} />
      </Routes>
    </Router>
  );
}

export default App;
