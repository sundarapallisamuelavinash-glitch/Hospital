import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  Search,
  Bell,
  Shield,
  Menu,
  CheckCircle,
  Clock,
  User,
  X,
  FileText,
  FlaskConical,
  Calendar,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ toggleSidebar }) => {
  const {
    currentUser,
    privacyMode,
    setPrivacyMode,
    notifications,
    markNotificationAsRead,
    patients
  } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifPopover, setShowNotifPopover] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const searchFilteredPatients = searchQuery.trim() ? patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  ) : [];

  const handlePatientSelect = (patientId) => {
    setShowSearchResults(false);
    setSearchQuery('');
    navigate(`/emr?patientId=${patientId}`);
  };

  return (
    <header className="hms-topbar">
      {/* Mobile Toggle & Quick Title */}
      <div className="d-flex align-items-center gap-3">
        <button 
          onClick={toggleSidebar}
          className="btn btn-outline-secondary d-lg-none border-0 p-2"
        >
          <Menu size={22} />
        </button>

        {/* Global Search Bar */}
        <div className="position-relative d-none d-md-block" style={{ width: '320px' }}>
          <div className="input-group">
            <span className="input-group-text bg-transparent border-end-0 text-muted">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              className="form-control border-start-0 ps-0 bg-transparent"
              placeholder="Search patient by ID, Name or Phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              style={{ fontSize: '0.88rem', borderRadius: '0 10px 10px 0' }}
            />
          </div>

          {/* Quick Search Floating Results */}
          {showSearchResults && searchQuery.trim().length > 0 && (
            <div className="position-absolute start-0 end-0 mt-1 hms-card p-2 shadow-lg" style={{ zIndex: 1050, maxHeight: '280px', overflowY: 'auto' }}>
              <div className="d-flex justify-content-between align-items-center px-2 py-1 border-bottom">
                <small className="fw-bold text-muted" style={{ fontSize: '0.75rem' }}>PATIENT SEARCH RESULTS</small>
                <button className="btn btn-sm btn-link text-muted p-0" onClick={() => setShowSearchResults(false)}>
                  <X size={14} />
                </button>
              </div>
              {searchFilteredPatients.length > 0 ? (
                searchFilteredPatients.map(patient => (
                  <div 
                    key={patient.id} 
                    className="p-2 border-bottom hover-bg cursor-pointer d-flex align-items-center justify-content-between"
                    onClick={() => handlePatientSelect(patient.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{patient.name}</div>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>{patient.id} • {patient.phone}</small>
                    </div>
                    <span className="badge bg-primary-subtle text-primary fw-semibold" style={{ fontSize: '0.7rem' }}>
                      {patient.bloodGroup}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-muted" style={{ fontSize: '0.85rem' }}>No patients found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Topbar Right Actions */}
      <div className="d-flex align-items-center gap-3">
        {/* HIPAA Compliance Mask Toggle */}
        <button 
          onClick={() => setPrivacyMode(!privacyMode)}
          className={`btn btn-sm d-flex align-items-center gap-2 fw-semibold px-3 py-2 rounded-pill border-0 ${
            privacyMode ? 'bg-success text-white' : 'bg-secondary-subtle text-secondary'
          }`}
          title="HIPAA / GDPR Privacy Mode masks sensitive patient phone numbers and SSN details"
          style={{ fontSize: '0.78rem' }}
        >
          <Shield size={15} />
          <span className="d-none d-sm-inline">
            {privacyMode ? 'HIPAA Masking ACTIVE' : 'HIPAA Masking OFF'}
          </span>
        </button>

        {/* JWT Session Badge */}
        <div className="d-none d-lg-flex align-items-center gap-1 text-muted bg-body-tertiary px-2 py-1 rounded-2" style={{ fontSize: '0.75rem' }}>
          <Lock size={12} className="text-success" />
          <span>JWT Valid</span>
        </div>

        {/* Notifications Center */}
        <div className="position-relative">
          <button 
            onClick={() => setShowNotifPopover(!showNotifPopover)}
            className="btn btn-outline-secondary rounded-circle p-2 border-0 position-relative"
            title="System Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifPopover && (
            <div className="position-absolute end-0 mt-2 hms-card p-3 shadow-lg" style={{ width: '320px', zIndex: 1050 }}>
              <div className="d-flex justify-content-between align-items-center pb-2 mb-2 border-bottom">
                <h6 className="fw-bold mb-0">Notifications</h6>
                <small className="text-primary fw-bold" style={{ fontSize: '0.75rem' }}>{unreadCount} unread</small>
              </div>
              <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                {notifications.length > 0 ? (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      className={`p-2 mb-2 rounded-3 border-start border-3 ${n.read ? 'bg-body-tertiary' : 'bg-primary-subtle border-primary'}`}
                      onClick={() => markNotificationAsRead(n.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="fw-bold" style={{ fontSize: '0.82rem' }}>{n.title}</div>
                      <div className="text-muted" style={{ fontSize: '0.78rem' }}>{n.message}</div>
                      <small className="text-muted d-block text-end mt-1" style={{ fontSize: '0.68rem' }}>{n.time}</small>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-3 text-muted" style={{ fontSize: '0.85rem' }}>No notifications</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Active User Badge */}
        <div className="d-flex align-items-center gap-2 ps-2 border-start border-secondary-subtle">
          <div className="rounded-circle bg-primary text-white fw-bold d-flex align-items-center justify-content-center" style={{ width: '38px', height: '38px', fontSize: '0.9rem' }}>
            {currentUser?.avatar || 'US'}
          </div>
          <div className="d-none d-sm-block">
            <div className="fw-bold" style={{ fontSize: '0.85rem', lineHeight: '1.2' }}>{currentUser?.name}</div>
            <span className="badge bg-primary-subtle text-primary fw-bold" style={{ fontSize: '0.68rem' }}>
              {currentUser?.role}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
