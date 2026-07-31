import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  UserCheck,
  Calendar,
  FileText,
  Pill,
  Download,
  QrCode,
  Clock,
  CheckCircle2,
  Phone,
  Mail,
  Shield,
  Heart,
  Printer
} from 'lucide-react';
import PatientQRModal from '../components/PatientQRModal';

const PatientPortal = () => {
  const { patients, appointments, medicalRecords, labTests, currentUser } = useHospital();

  // Selected patient for portal (default John Doe PAT-2026-1001)
  const patientId = currentUser?.patientId || 'PAT-2026-1001';
  const patient = patients.find(p => p.id === patientId) || patients[0];

  const [showQRModal, setShowQRModal] = useState(false);
  const [activeTab, setActiveTab] = useState('appointments'); // 'appointments' | 'reports' | 'prescriptions' | 'profile'

  const myAppointments = appointments.filter(a => a.patientId === patient.id);
  const myEMR = medicalRecords.filter(r => r.patientId === patient.id);
  const myLabs = labTests.filter(l => l.patientId === patient.id);

  return (
    <div className="container-fluid py-3">
      {/* Patient Welcome Banner */}
      <div className="hms-card p-4 p-md-5 mb-4 bg-gradient-hospital text-white">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
          <div>
            <span className="badge bg-white text-primary fw-bold mb-2">SECURE PATIENT SELF-SERVICE PORTAL</span>
            <h2 className="fw-bold mb-1">Welcome back, {patient.name}!</h2>
            <p className="text-white-50 mb-0">Patient ID: <strong className="text-warning font-monospace">{patient.id}</strong> • Access your digital health records 24/7</p>
          </div>
          <div className="mt-3 mt-md-0">
            <button className="btn btn-light fw-bold text-primary d-flex align-items-center gap-2" onClick={() => setShowQRModal(true)}>
              <QrCode size={18} /> View Digital Wristband QR
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="hms-card p-2 mb-4">
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'appointments' ? 'active bg-primary' : 'text-body'}`}
              onClick={() => setActiveTab('appointments')}
            >
              <Calendar size={18} className="me-2" /> My OP Appointments ({myAppointments.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'reports' ? 'active bg-primary' : 'text-body'}`}
              onClick={() => setActiveTab('reports')}
            >
              <FileText size={18} className="me-2" /> Download Reports ({myLabs.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'prescriptions' ? 'active bg-primary' : 'text-body'}`}
              onClick={() => setActiveTab('prescriptions')}
            >
              <Pill size={18} className="me-2" /> My Prescriptions ({myEMR.length})
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link fw-bold ${activeTab === 'profile' ? 'active bg-primary' : 'text-body'}`}
              onClick={() => setActiveTab('profile')}
            >
              <UserCheck size={18} className="me-2" /> Personal Profile
            </button>
          </li>
        </ul>
      </div>

      {/* Tab 1: Appointments */}
      {activeTab === 'appointments' && (
        <div className="hms-card p-4">
          <h5 className="fw-bold mb-3">Your Outpatient (OP) Appointments</h5>
          <div className="table-responsive">
            <table className="hms-table">
              <thead>
                <tr>
                  <th>Token #</th>
                  <th>Doctor & Department</th>
                  <th>Date & Time</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myAppointments.map(app => (
                  <tr key={app.id}>
                    <td>
                      <span className="font-monospace fw-bold text-primary bg-primary-subtle px-2 py-1 rounded">
                        {app.tokenNo}
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold">{app.doctorName}</div>
                      <small className="text-muted">{app.department}</small>
                    </td>
                    <td>
                      <div className="fw-semibold">{app.date}</div>
                      <small className="text-muted">{app.time}</small>
                    </td>
                    <td>{app.type}</td>
                    <td>
                      <span className={`badge-status badge-${app.status.toLowerCase().replace(' ', '-')}`}>
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Download Reports */}
      {activeTab === 'reports' && (
        <div className="hms-card p-4">
          <h5 className="fw-bold mb-3">Diagnostic & Laboratory Test Reports</h5>
          <div className="row g-3">
            {myLabs.map(lab => (
              <div key={lab.id} className="col-md-6">
                <div className="p-3 border rounded-3 bg-body-tertiary d-flex align-items-center justify-content-between">
                  <div>
                    <span className="badge bg-primary-subtle text-primary fw-bold mb-1">{lab.category}</span>
                    <h6 className="fw-bold mb-1">{lab.testName}</h6>
                    <small className="text-muted d-block">Requested: {lab.requestDate} • Doctor: {lab.requestedBy}</small>
                  </div>
                  <div>
                    {lab.status === 'Completed' ? (
                      <button
                        className="btn btn-sm btn-hms-primary"
                        onClick={() => alert(`Downloading PDF Report File: ${lab.reportFile || 'Lab_Report.pdf'}`)}
                      >
                        <Download size={15} /> Download PDF
                      </button>
                    ) : (
                      <span className="badge bg-warning-subtle text-warning fw-bold">Processing</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="hms-card p-4">
          <h5 className="fw-bold mb-3">Issued Digital Prescriptions</h5>
          {myEMR.map(rec => (
            <div key={rec.id} className="p-3 border rounded-3 bg-body-tertiary mb-3">
              <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                <div>
                  <h6 className="fw-bold mb-0">{rec.diagnosis}</h6>
                  <small className="text-muted">Physician: {rec.doctorName} ({rec.department})</small>
                </div>
                <small className="text-muted font-monospace">{rec.date}</small>
              </div>

              <div className="mb-2">
                <strong className="text-primary d-block mb-1" style={{ fontSize: '0.85rem' }}>Prescribed Medications:</strong>
                <div className="d-flex flex-wrap gap-2">
                  {rec.prescriptions?.map((p, idx) => (
                    <span key={idx} className="badge bg-info-subtle text-info border p-2">
                      {p.name} {p.dosage} - {p.frequency} ({p.duration})
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-end">
                <button className="btn btn-sm btn-hms-outline" onClick={() => window.print()}>
                  <Printer size={14} /> Print Prescription
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Profile */}
      {activeTab === 'profile' && (
        <div className="hms-card p-4">
          <h5 className="fw-bold mb-3">Patient Profile & Personal Info</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="hms-form-label">Full Name</label>
              <input type="text" className="hms-form-input" defaultValue={patient.name} readOnly />
            </div>
            <div className="col-md-3">
              <label className="hms-form-label">Age</label>
              <input type="text" className="hms-form-input" defaultValue={`${patient.age} Yrs`} readOnly />
            </div>
            <div className="col-md-3">
              <label className="hms-form-label">Blood Group</label>
              <input type="text" className="hms-form-input fw-bold text-danger" defaultValue={patient.bloodGroup} readOnly />
            </div>
            <div className="col-md-6">
              <label className="hms-form-label">Phone Number</label>
              <input type="text" className="hms-form-input" defaultValue={patient.phone} />
            </div>
            <div className="col-md-6">
              <label className="hms-form-label">Emergency Contact</label>
              <input type="text" className="hms-form-input text-danger fw-bold" defaultValue={patient.emergencyContact} />
            </div>
            <div className="col-12">
              <label className="hms-form-label">Insurance Provider & Policy Number</label>
              <input type="text" className="hms-form-input" defaultValue={`${patient.insuranceProvider} (${patient.policyNumber})`} readOnly />
            </div>
          </div>
        </div>
      )}

      {/* QR Wristband Modal */}
      {showQRModal && (
        <PatientQRModal
          patient={patient}
          onClose={() => setShowQRModal(false)}
        />
      )}
    </div>
  );
};

export default PatientPortal;
