import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import {
  Activity,
  Users,
  Calendar,
  FileText,
  Stethoscope,
  FlaskConical,
  Image as ImageIcon,
  UserCheck,
  ShieldCheck,
  Settings as SettingsIcon,
  LogOut,
  Sun,
  Moon,
  Globe,
  HeartPulse,
  CreditCard
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, toggleTheme, theme }) => {
  const { currentUser, switchRole, logoutUser, language, setLanguage } = useHospital();

  const handleRoleChange = (e) => {
    switchRole(e.target.value);
  };

  const navItems = [
    { title: 'Dashboard', path: '/dashboard', icon: Activity, roles: ['Admin', 'Doctor', 'Receptionist', 'Lab Technician'] },
    { title: 'Doctor Workspace', path: '/doctor-workspace', icon: Stethoscope, roles: ['Doctor', 'Admin'] },
    { title: 'Patients Directory', path: '/patients', icon: Users, roles: ['Admin', 'Doctor', 'Receptionist'] },
    { title: 'Register Patient', path: '/patients/new', icon: HeartPulse, roles: ['Admin', 'Receptionist'] },
    { title: 'OP Appointments', path: '/appointments', icon: Calendar, roles: ['Admin', 'Doctor', 'Receptionist'] },
    { title: 'EMR Records', path: '/emr', icon: FileText, roles: ['Admin', 'Doctor', 'Receptionist'] },
    { title: 'Laboratory Module', path: '/lab', icon: FlaskConical, roles: ['Lab Technician', 'Admin', 'Doctor'] },
    { title: 'Medical Imaging', path: '/imaging', icon: ImageIcon, roles: ['Admin', 'Doctor', 'Lab Technician'] },
    { title: 'Billing & Payments', path: '/payments', icon: CreditCard, roles: ['Admin', 'Receptionist'] },
    { title: 'Patient Portal', path: '/patient-portal', icon: UserCheck, roles: ['Patient', 'Admin'] },
    { title: 'Staff & Doctors', path: '/staff', icon: Users, roles: ['Admin'] },
    { title: 'Security & Audit', path: '/security', icon: ShieldCheck, roles: ['Admin'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    !currentUser || item.roles.includes(currentUser.role) || currentUser.role === 'Admin'
  );

  return (
    <aside className={`hms-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Logo */}
      <div className="sidebar-brand">
        <div className="bg-primary text-white p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: 'var(--primary-color)' }}>
          <Activity size={24} color="#ffffff" />
        </div>
        <div>
          <h5 className="mb-0 fw-bold text-primary" style={{ color: 'var(--primary-color)' }}>Apex Health</h5>
          <small className="text-muted d-block" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>HOSPITAL MANAGEMENT</small>
        </div>
      </div>

      {/* Role Switcher Demo Control */}
      <div className="p-3 bg-light-subtle border-bottom border-secondary-subtle">
        <label className="text-muted fw-bold d-block mb-1" style={{ fontSize: '0.72rem', letterSpacing: '0.05em' }}>
          DEMO ROLE SWITCHER
        </label>
        <select 
          className="form-select form-select-sm border-primary fw-semibold"
          value={currentUser?.role || 'Admin'}
          onChange={handleRoleChange}
          style={{ fontSize: '0.82rem', borderRadius: '8px' }}
        >
          <option value="Admin">🔑 Admin View</option>
          <option value="Doctor">🩺 Doctor View</option>
          <option value="Receptionist">📋 Receptionist View</option>
          <option value="Lab Technician">🧪 Lab Tech View</option>
          <option value="Patient">👤 Patient Portal View</option>
        </select>
      </div>

      {/* Navigation Links */}
      <div className="sidebar-nav">
        <div className="nav-category">Main Operations</div>
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `hms-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <Icon size={18} />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Footer controls: Language & Dark mode & Logout */}
      <div className="p-3 border-top border-secondary-subtle">
        <div className="d-flex align-items-center justify-content-between mb-2">
          {/* Language selector */}
          <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.8rem' }}>
            <Globe size={15} />
            <select 
              className="bg-transparent border-0 fw-semibold text-muted"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ outline: 'none', cursor: 'pointer' }}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '32px', height: '32px' }}
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* User Card & Logout */}
        <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary-subtle">
          <div className="d-flex align-items-center gap-2 overflow-hidden">
            <div className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: '34px', height: '34px', fontSize: '0.85rem' }}>
              {currentUser?.avatar || 'US'}
            </div>
            <div className="text-truncate">
              <div className="fw-bold text-truncate" style={{ fontSize: '0.82rem' }}>{currentUser?.name}</div>
              <small className="text-muted d-block text-capitalize" style={{ fontSize: '0.72rem' }}>{currentUser?.role}</small>
            </div>
          </div>

          <button 
            onClick={logoutUser}
            className="btn btn-sm text-danger p-1 border-0"
            title="Logout Session"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
