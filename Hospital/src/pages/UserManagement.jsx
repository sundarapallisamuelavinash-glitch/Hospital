import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  Users,
  UserPlus,
  Stethoscope,
  ShieldCheck,
  Plus,
  Search,
  CheckCircle2,
  Trash2,
  Edit3
} from 'lucide-react';

const UserManagement = () => {
  const { doctors, currentUser } = useHospital();

  const [search, setSearch] = useState('');
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">Hospital Staff & Doctor Management</h2>
          <p className="text-muted mb-0">Manage medical staff, physicians, consultation schedules, and room assignments</p>
        </div>
        <div className="mt-3 mt-md-0">
          <button className="btn btn-hms-primary" onClick={() => setShowAddDoctorModal(true)}>
            <UserPlus size={16} /> Add New Physician / Staff
          </button>
        </div>
      </div>

      {/* Search & Stats */}
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
                placeholder="Search physician by Name or Specialty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6 text-end text-muted">
            Total Active Medical Staff: <strong>{doctors.length} Physicians</strong>
          </div>
        </div>
      </div>

      {/* Staff Table */}
      <div className="hms-card p-4">
        <div className="table-responsive">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Department & Room</th>
                <th>Qualifications</th>
                <th>Consultation Fee</th>
                <th>Availability Schedule</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoctors.map(d => (
                <tr key={d.id}>
                  <td>
                    <div className="fw-bold">{d.name}</div>
                    <small className="text-muted">{d.id} • {d.email}</small>
                  </td>
                  <td>
                    <span className="badge bg-primary-subtle text-primary fw-bold me-1">{d.department}</span>
                    <small className="text-muted d-block">{d.roomNo}</small>
                  </td>
                  <td>
                    <div className="fw-semibold">{d.qualification}</div>
                    <small className="text-muted">{d.experience}</small>
                  </td>
                  <td>
                    <strong className="text-success">₹{d.fee}</strong>
                  </td>
                  <td>
                    <div className="fw-semibold" style={{ fontSize: '0.85rem' }}>{d.availableDays.join(', ')}</div>
                    <small className="text-muted">{d.timing}</small>
                  </td>
                  <td>
                    <span className="badge bg-success-subtle text-success fw-bold">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Doctor Modal Simulation */}
      {showAddDoctorModal && (
        <div className="hms-modal-backdrop" onClick={() => setShowAddDoctorModal(false)}>
          <div className="hms-modal-content p-4" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <h5 className="fw-bold mb-3">Add New Medical Staff / Doctor</h5>
            <div className="mb-3">
              <label className="hms-form-label">Doctor Full Name</label>
              <input type="text" className="hms-form-input" placeholder="e.g. Dr. Sarah Jenkins" />
            </div>
            <div className="row g-3 mb-3">
              <div className="col-6">
                <label className="hms-form-label">Department</label>
                <select className="hms-form-select">
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="General Surgery">General Surgery</option>
                </select>
              </div>
              <div className="col-6">
                <label className="hms-form-label">Consultation Fee (₹)</label>
                <input type="number" className="hms-form-input" defaultValue={1200} />
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-hms-outline" onClick={() => setShowAddDoctorModal(false)}>Cancel</button>
              <button className="btn btn-hms-primary" onClick={() => {
                alert('New physician added to staff registry!');
                setShowAddDoctorModal(false);
              }}>Save Doctor</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
