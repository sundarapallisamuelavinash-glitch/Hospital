import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HospitalProvider, useHospital } from './context/HospitalContext';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientManagement from './pages/PatientManagement';
import PatientRegistration from './pages/PatientRegistration';
import EMR from './pages/EMR';
import Appointments from './pages/Appointments';
import LabModule from './pages/LabModule';
import MedicalImaging from './pages/MedicalImaging';
import PaymentManagement from './pages/PaymentManagement';
import PatientPortal from './pages/PatientPortal';
import UserManagement from './pages/UserManagement';
import SecurityAudit from './pages/SecurityAudit';

function AppLayout({ children, toggleTheme, theme }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useHospital();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} toggleTheme={toggleTheme} theme={theme} />
      <div className="hms-main-content flex-grow-1">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content-wrapper p-3 p-md-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [theme, setTheme] = useState(localStorage.getItem('hms_theme') || 'light');
  const { currentUser } = useHospital();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hms_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/*" element={
          <AppLayout toggleTheme={toggleTheme} theme={theme}>
            <Routes>
              <Route path="/" element={<Navigate to={currentUser?.role === 'Doctor' ? '/doctor-workspace' : currentUser?.role === 'Patient' ? '/patient-portal' : currentUser?.role === 'Lab Technician' ? '/lab' : '/dashboard'} replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctor-workspace" element={<DoctorDashboard />} />
              <Route path="/patients" element={<PatientManagement />} />
              <Route path="/patients/new" element={<PatientRegistration />} />
              <Route path="/emr" element={<EMR />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/lab" element={<LabModule />} />
              <Route path="/imaging" element={<MedicalImaging />} />
              <Route path="/payments" element={<PaymentManagement />} />
              <Route path="/patient-portal" element={<PatientPortal />} />
              <Route path="/staff" element={<UserManagement />} />
              <Route path="/security" element={<SecurityAudit />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppLayout>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <HospitalProvider>
      <AppContent />
    </HospitalProvider>
  );
}

export default App;
