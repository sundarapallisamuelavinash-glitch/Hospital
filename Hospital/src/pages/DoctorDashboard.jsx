import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  Stethoscope,
  Clock,
  User,
  FileText,
  Pill,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronRight,
  HeartPulse,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PrescriptionModal from '../components/PrescriptionModal';

const DoctorDashboard = () => {
  const { appointments, patients, currentUser, updateAppointmentStatus, addLabTest } = useHospital();
  const navigate = useNavigate();

  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedLabTest, setSelectedLabTest] = useState('');

  // Doctor's today appointments
  const doctorApps = appointments.filter(a => a.date === '2026-07-30');

  const handleStartConsultation = (app) => {
    updateAppointmentStatus(app.id, 'In Consultation');
    const p = patients.find(pat => pat.id === app.patientId);
    if (p) setSelectedPatient(p);
    setShowPrescriptionModal(true);
  };

  const handleQuickLabOrder = () => {
    if (!selectedLabTest) return;
    addLabTest({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      testName: selectedLabTest,
      category: 'General Diagnostics',
      requestedBy: currentUser?.name || 'Dr. Alex Morgan'
    });
    setSelectedLabTest('');
    alert(`Lab test "${selectedLabTest}" ordered for ${selectedPatient.name}.`);
  };

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <span className="badge bg-success-subtle text-success fw-bold mb-1">CLINICAL WORKSPACE</span>
          <h2 className="fw-bold mb-0">Physician Clinical Workspace</h2>
          <p className="text-muted mb-0">Welcome <strong className="text-primary">{currentUser?.name}</strong> • Today's OP Patient Appointments & EMR Console</p>
        </div>
        <div className="mt-3 mt-md-0 d-flex gap-2">
          <button className="btn btn-hms-primary" onClick={() => setShowPrescriptionModal(true)}>
            <Pill size={16} /> Write Prescription
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Column: Today's Appointments Queue */}
        <div className="col-lg-5">
          <div className="hms-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <Clock className="text-primary" size={20} /> Today's OP Patient Queue
              </h5>
              <span className="badge bg-primary text-white font-monospace">{doctorApps.length} Patients</span>
            </div>

            <div className="d-flex flex-column gap-3">
              {doctorApps.map((app) => {
                const patientObj = patients.find(p => p.id === app.patientId);
                const isSelected = selectedPatient?.id === app.patientId;
                return (
                  <div
                    key={app.id}
                    className={`p-3 rounded-3 border transition-all cursor-pointer ${
                      isSelected ? 'border-primary bg-primary-subtle shadow-sm' : 'bg-body-tertiary'
                    }`}
                    onClick={() => patientObj && setSelectedPatient(patientObj)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <span className="font-monospace fw-bold text-primary bg-white px-2 py-1 rounded border">
                          {app.tokenNo}
                        </span>
                        <div>
                          <h6 className="fw-bold mb-0">{app.patientName}</h6>
                          <small className="text-muted">{app.patientId} • {app.time}</small>
                        </div>
                      </div>
                      <span className={`badge-status badge-${app.status.toLowerCase().replace(' ', '-')}`}>
                        {app.status}
                      </span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                      <small className="text-muted">Type: <strong>{app.type}</strong></small>
                      <button
                        className="btn btn-sm btn-hms-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartConsultation(app);
                        }}
                      >
                        Start Consultation
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Active Patient Consultation Workspace */}
        <div className="col-lg-7">
          {selectedPatient ? (
            <div className="hms-card p-4">
              {/* Active Patient Details Banner */}
              <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                <div>
                  <span className="badge bg-primary text-white mb-1">ACTIVE CONSULTATION</span>
                  <h4 className="fw-bold mb-0">{selectedPatient.name}</h4>
                  <small className="text-muted font-monospace">{selectedPatient.id} • {selectedPatient.gender}, {selectedPatient.age} Yrs</small>
                </div>
                <div className="text-end">
                  <span className="badge bg-danger-subtle text-danger fw-bold px-3 py-1 fs-6">
                    Blood: {selectedPatient.bloodGroup}
                  </span>
                  <small className="text-muted d-block mt-1">Phone: {selectedPatient.phone}</small>
                </div>
              </div>

              {/* Vitals Summary Ribbon */}
              <div className="row g-2 text-center mb-4">
                <div className="col-3">
                  <div className="p-2 border rounded bg-body-tertiary">
                    <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>BP</small>
                    <strong className="text-primary" style={{ fontSize: '0.95rem' }}>120/80</strong>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2 border rounded bg-body-tertiary">
                    <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>HEART RATE</small>
                    <strong className="text-success" style={{ fontSize: '0.95rem' }}>72 bpm</strong>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2 border rounded bg-body-tertiary">
                    <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>TEMP</small>
                    <strong className="text-info" style={{ fontSize: '0.95rem' }}>98.6 °F</strong>
                  </div>
                </div>
                <div className="col-3">
                  <div className="p-2 border rounded bg-body-tertiary">
                    <small className="text-muted d-block" style={{ fontSize: '0.72rem' }}>SpO2</small>
                    <strong className="text-purple" style={{ fontSize: '0.95rem' }}>99%</strong>
                  </div>
                </div>
              </div>

              {/* Patient Allergies & Warnings */}
              <div className="p-3 bg-warning-subtle text-warning-emphasis rounded-3 border border-warning mb-4">
                <div className="fw-bold d-flex align-items-center gap-2 mb-1">
                  <AlertCircle size={18} /> Known Patient Allergies & Chronic Alerts
                </div>
                <div style={{ fontSize: '0.88rem' }}>
                  <strong>Allergies:</strong> {selectedPatient.allergies || 'None declared'}<br />
                  <strong>Chronic Conditions:</strong> {selectedPatient.chronicConditions || 'None declared'}
                </div>
              </div>

              {/* Quick Actions Console */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="p-3 border rounded-3 bg-body-tertiary h-100">
                    <h6 className="fw-bold mb-2 d-flex align-items-center gap-2">
                      <Pill className="text-primary" size={18} /> Issued Prescriptions
                    </h6>
                    <p className="text-muted mb-3" style={{ fontSize: '0.82rem' }}>Compose digital prescription, dosage & instructions for patient</p>
                    <button className="btn btn-hms-primary w-100" onClick={() => setShowPrescriptionModal(true)}>
                      Open Prescription Writer
                    </button>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 border rounded-3 bg-body-tertiary h-100">
                    <h6 className="fw-bold mb-2 d-flex align-items-center gap-2">
                      <FlaskConical className="text-warning" size={18} /> Quick Order Lab Test
                    </h6>
                    <div className="d-flex gap-2">
                      <select className="hms-form-select" value={selectedLabTest} onChange={(e) => setSelectedLabTest(e.target.value)}>
                        <option value="">Select Lab Test...</option>
                        <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                        <option value="Lipid Profile">Lipid Profile</option>
                        <option value="Thyroid Profile">Thyroid Profile</option>
                        <option value="HbA1c Glucose">HbA1c Glucose</option>
                      </select>
                      <button className="btn btn-outline-warning" onClick={handleQuickLabOrder}>Order</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Full EMR Link */}
              <div className="text-end">
                <button className="btn btn-hms-outline" onClick={() => navigate(`/emr?patientId=${selectedPatient.id}`)}>
                  <FileText size={16} /> View Full Patient EMR History <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="hms-card p-5 text-center text-muted">Select a patient from the queue to start consultation</div>
          )}
        </div>
      </div>

      {/* Prescription Writer Modal */}
      {showPrescriptionModal && (
        <PrescriptionModal
          patient={selectedPatient}
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorDashboard;
