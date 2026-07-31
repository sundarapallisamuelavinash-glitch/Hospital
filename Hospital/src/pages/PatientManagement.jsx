import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  UserPlus,
  QrCode,
  FileText,
  Phone,
  Mail,
  Shield,
  Heart,
  Filter,
  ChevronRight,
  Eye
} from 'lucide-react';
import PatientQRModal from '../components/PatientQRModal';

const PatientManagement = () => {
  const { patients, privacyMode } = useHospital();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [bloodFilter, setBloodFilter] = useState('');
  const [selectedPatientForQR, setSelectedPatientForQR] = useState(null);

  // Mask Phone & SSN if Privacy Mode is active
  const formatPhone = (phone) => {
    if (privacyMode && phone) return phone.replace(/\d(?=\d{4})/g, '*');
    return phone;
  };

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.id.toLowerCase().includes(search.toLowerCase()) ||
                          p.phone.includes(search);
    const matchesBlood = bloodFilter ? p.bloodGroup === bloodFilter : true;
    return matchesSearch && matchesBlood;
  });

  return (
    <div className="container-fluid py-3">
      {/* Page Title Bar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">Patient Directory & Profiles</h2>
          <p className="text-muted mb-0">Search, register, and manage electronic patient records & QR ID wristbands</p>
        </div>
        <div className="mt-3 mt-md-0">
          <button className="btn btn-hms-primary" onClick={() => navigate('/patients/new')}>
            <UserPlus size={16} /> Register New Patient
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
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
                placeholder="Search patient by ID, Name or Phone number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <select
              className="hms-form-select"
              value={bloodFilter}
              onChange={(e) => setBloodFilter(e.target.value)}
            >
              <option value="">Filter by Blood Group (All)</option>
              <option value="O+">O+</option>
              <option value="A+">A+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
            </select>
          </div>

          <div className="col-md-3 text-end text-muted" style={{ fontSize: '0.85rem' }}>
            Showing <strong>{filteredPatients.length}</strong> registered patients
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="hms-card p-4">
        <div className="table-responsive">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Full Name</th>
                <th>Age / Gender</th>
                <th>Blood Group</th>
                <th>Contact Info</th>
                <th>Insurance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td>
                      <span className="font-monospace fw-bold text-primary bg-primary-subtle px-2 py-1 rounded">
                        {patient.id}
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold">{patient.name}</div>
                      <small className="text-muted">Reg: {patient.registeredDate}</small>
                    </td>
                    <td>
                      <span className="fw-semibold">{patient.age} Yrs</span>
                      <small className="text-muted d-block">{patient.gender}</small>
                    </td>
                    <td>
                      <span className="badge bg-danger-subtle text-danger fw-bold px-2 py-1">
                        {patient.bloodGroup}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-1" style={{ fontSize: '0.85rem' }}>
                        <Phone size={14} className="text-muted" />
                        <span>{formatPhone(patient.phone)}</span>
                      </div>
                      <small className="text-muted d-block">{patient.email}</small>
                    </td>
                    <td>
                      <div className="fw-semibold" style={{ fontSize: '0.85rem' }}>{patient.insuranceProvider}</div>
                      <small className="text-muted">{patient.policyNumber}</small>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => setSelectedPatientForQR(patient)}
                          title="Generate QR Code Wristband"
                        >
                          <QrCode size={16} /> QR Badge
                        </button>
                        <button
                          className="btn btn-sm btn-hms-primary"
                          onClick={() => navigate(`/emr?patientId=${patient.id}`)}
                          title="View EMR Medical History"
                        >
                          <FileText size={16} /> EMR History
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    No patients matching query
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient QR Wristband Modal */}
      {selectedPatientForQR && (
        <PatientQRModal
          patient={selectedPatientForQR}
          onClose={() => setSelectedPatientForQR(null)}
        />
      )}
    </div>
  );
};

export default PatientManagement;
