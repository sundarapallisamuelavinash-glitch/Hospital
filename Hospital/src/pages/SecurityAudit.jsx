import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  ShieldCheck,
  Lock,
  Download,
  Upload,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Database
} from 'lucide-react';

const SecurityAudit = () => {
  const {
    auditLogs,
    privacyMode,
    setPrivacyMode,
    exportSystemData,
    importSystemData,
    currentUser
  } = useHospital();

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredLogs = auditLogs.filter(l => {
    const matchesSearch = l.action.toLowerCase().includes(search.toLowerCase()) ||
                          l.user.toLowerCase().includes(search.toLowerCase()) ||
                          l.details.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter ? l.role === roleFilter : true;
    return matchesSearch && matchesRole;
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedData = JSON.parse(event.target.result);
        const success = importSystemData(parsedData);
        if (success) {
          alert('Database restored successfully from JSON backup file!');
        } else {
          alert('Failed to parse backup JSON file format.');
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">Security, Compliance & Audit Trail</h2>
          <p className="text-muted mb-0">HIPAA/GDPR compliance settings, access logs, and JSON database backup & restore</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button className="btn btn-hms-primary" onClick={exportSystemData}>
            <Download size={16} /> Backup System DB (JSON)
          </button>
          <label className="btn btn-hms-outline mb-0 cursor-pointer">
            <Upload size={16} /> Restore System DB
            <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Compliance & Security Cards Row */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="hms-card p-4 h-100 border-primary">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2 text-primary">
                <ShieldCheck size={22} /> HIPAA / GDPR Privacy Controls
              </h5>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="privacySwitch"
                  checked={privacyMode}
                  onChange={(e) => setPrivacyMode(e.target.checked)}
                  style={{ width: '45px', height: '22px' }}
                />
              </div>
            </div>
            <p className="text-muted" style={{ fontSize: '0.88rem' }}>
              When <strong>HIPAA Privacy Masking</strong> is enabled, sensitive fields (SSN, Phone Numbers, DOB) are automatically obfuscated across all receptionist & clinical screens.
            </p>
            <span className={`badge ${privacyMode ? 'bg-success' : 'bg-secondary'} p-2`}>
              {privacyMode ? 'Masking Enforced (HIPAA Active)' : 'Standard View (Masking Disabled)'}
            </span>
          </div>
        </div>

        <div className="col-md-6">
          <div className="hms-card p-4 h-100">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <Lock size={20} className="text-success" /> JWT Authentication & Auto Session Timeout
            </h5>
            <div className="row g-2 text-center" style={{ fontSize: '0.85rem' }}>
              <div className="col-4">
                <div className="p-2 border rounded bg-body-tertiary">
                  <small className="text-muted d-block">TOKEN ALGORITHM</small>
                  <strong className="text-primary font-monospace">HS256</strong>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2 border rounded bg-body-tertiary">
                  <small className="text-muted d-block">SESSION TIMEOUT</small>
                  <strong className="text-success font-monospace">15 Mins</strong>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2 border rounded bg-body-tertiary">
                  <small className="text-muted d-block">2FA METHOD</small>
                  <strong className="text-info font-monospace">TOTP / SMS</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search for Audit Logs */}
      <div className="hms-card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search audit trail by User, Action, or IP..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <select className="hms-form-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="">Filter by Role (All)</option>
              <option value="Admin">Admin</option>
              <option value="Doctor">Doctor</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Lab Tech">Lab Tech</option>
            </select>
          </div>

          <div className="col-md-3 text-end text-muted">
            Total <strong>{filteredLogs.length}</strong> Logged Events
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="hms-card p-4">
        <div className="table-responsive">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Log ID</th>
                <th>Timestamp</th>
                <th>User & Role</th>
                <th>Action Performed</th>
                <th>Details / Payload</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>
                    <span className="font-monospace fw-bold text-muted" style={{ fontSize: '0.8rem' }}>
                      {log.id}
                    </span>
                  </td>
                  <td>
                    <small className="text-muted font-monospace">{log.timestamp}</small>
                  </td>
                  <td>
                    <div className="fw-bold">{log.user}</div>
                    <span className="badge bg-primary-subtle text-primary" style={{ fontSize: '0.68rem' }}>{log.role}</span>
                  </td>
                  <td>
                    <strong className="text-primary">{log.action}</strong>
                  </td>
                  <td>
                    <small className="text-muted">{log.details}</small>
                  </td>
                  <td>
                    <span className="badge bg-success-subtle text-success fw-bold">{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecurityAudit;
