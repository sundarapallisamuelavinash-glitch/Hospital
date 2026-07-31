import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useNavigate } from 'react-router-dom';
import { UserPlus, ArrowLeft, CheckCircle2, ShieldAlert, Heart, QrCode } from 'lucide-react';
import PatientQRModal from '../components/PatientQRModal';

const PatientRegistration = () => {
  const { registerPatient } = useHospital();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '',
    email: '',
    address: '',
    emergencyContact: '',
    allergies: '',
    chronicConditions: '',
    insuranceProvider: '',
    policyNumber: ''
  });

  const [createdPatient, setCreatedPatient] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please fill in required fields (Name & Phone).');
      return;
    }

    const patient = registerPatient(formData);
    setCreatedPatient(patient);
  };

  return (
    <div className="container-fluid py-3">
      {/* Title */}
      <div className="d-flex align-items-center gap-3 mb-4 pb-2 border-bottom">
        <button className="btn btn-outline-secondary p-2 rounded-circle" onClick={() => navigate('/patients')}>
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="fw-bold mb-0">New Patient Registration</h2>
          <p className="text-muted mb-0">Generates unique Patient ID (PAT-2026-XXXX) & Scannable QR Badge</p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="hms-card p-4 p-md-5">
            <form onSubmit={handleSubmit}>
              <h5 className="fw-bold text-primary mb-3">1. Personal & Contact Information</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="hms-form-label">Full Patient Name *</label>
                  <input
                    type="text"
                    className="hms-form-input"
                    placeholder="e.g. William Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="hms-form-label">Age (Years) *</label>
                  <input
                    type="number"
                    className="hms-form-input"
                    placeholder="e.g. 35"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="hms-form-label">Gender</label>
                  <select
                    className="hms-form-select"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="hms-form-label">Blood Group</label>
                  <select
                    className="hms-form-select"
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="hms-form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="hms-form-input"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="hms-form-label">Email Address</label>
                  <input
                    type="email"
                    className="hms-form-input"
                    placeholder="patient@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="hms-form-label">Residential Address</label>
                  <input
                    type="text"
                    className="hms-form-input"
                    placeholder="Street, City, State, ZIP Code"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>

              <h5 className="fw-bold text-primary mb-3">2. Emergency Contact & Medical Alerts</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="hms-form-label">Emergency Contact Name & Phone</label>
                  <input
                    type="text"
                    className="hms-form-input"
                    placeholder="e.g. Jane Vance (+1 555-0193)"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="hms-form-label text-warning">Known Allergies (Penicillin, Latex, etc.)</label>
                  <input
                    type="text"
                    className="hms-form-input border-warning"
                    placeholder="e.g. Penicillin, Peanuts"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="hms-form-label">Pre-existing Medical Conditions</label>
                  <input
                    type="text"
                    className="hms-form-input"
                    placeholder="e.g. Asthma, Hypertension, Diabetes Type 2"
                    value={formData.chronicConditions}
                    onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                  />
                </div>
              </div>

              <h5 className="fw-bold text-primary mb-3">3. Insurance Details</h5>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="hms-form-label">Insurance Provider</label>
                  <input
                    type="text"
                    className="hms-form-input"
                    placeholder="e.g. Blue Cross Blue Shield"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="hms-form-label">Policy / Member ID</label>
                  <input
                    type="text"
                    className="hms-form-input"
                    placeholder="e.g. BC-9920144"
                    value={formData.policyNumber}
                    onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3 pt-3 border-top">
                <button type="button" className="btn btn-hms-outline" onClick={() => navigate('/patients')}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-hms-primary px-4 py-2">
                  <UserPlus size={18} /> Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal & QR Code Launcher */}
      {createdPatient && (
        <PatientQRModal
          patient={createdPatient}
          onClose={() => {
            setCreatedPatient(null);
            navigate('/patients');
          }}
        />
      )}
    </div>
  );
};

export default PatientRegistration;
