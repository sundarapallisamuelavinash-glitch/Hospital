import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  User,
  Stethoscope,
  Pill,
  FlaskConical,
  Image as ImageIcon,
  Download,
  Printer,
  Plus,
  Search,
  ChevronRight,
  ShieldCheck,
  Paperclip
} from 'lucide-react';
import PrescriptionModal from '../components/PrescriptionModal';

const EMR = () => {
  const { patients, medicalRecords, labTests, imagingScans } = useHospital();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedPatientId = searchParams.get('patientId') || patients[0]?.id || 'PAT-2026-1001';
  const activePatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  // Filter records for active patient
  const patientRecords = medicalRecords.filter(r => r.patientId === activePatient?.id);
  const patientLabs = labTests.filter(l => l.patientId === activePatient?.id);
  const patientScans = imagingScans.filter(s => s.patientId === activePatient?.id);

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="container-fluid py-3">
      {/* Top Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">Electronic Medical Records (EMR)</h2>
          <p className="text-muted mb-0">Chronological clinical timeline, diagnostic reports, and digital prescriptions</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0 no-print">
          <button className="btn btn-hms-outline" onClick={handlePrintSummary}>
            <Printer size={16} /> Print EMR Summary
          </button>
          <button className="btn btn-hms-primary" onClick={() => setShowPrescriptionModal(true)}>
            <Plus size={16} /> New Consultation Record
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Left Side: Patient Selector Sidebar */}
        <div className="col-lg-4 no-print">
          <div className="hms-card p-3 mb-3">
            <label className="hms-form-label mb-2">Select Active Patient</label>
            <select
              className="hms-form-select fw-bold border-primary"
              value={activePatient?.id}
              onChange={(e) => navigate(`/emr?patientId=${e.target.value}`)}
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
          </div>

          {/* Active Patient Summary Profile Card */}
          {activePatient && (
            <div className="hms-card p-4">
              <div className="text-center mb-3">
                <div className="rounded-circle bg-primary text-white font-monospace fw-bold d-inline-flex align-items-center justify-content-center mb-2" style={{ width: '60px', height: '60px', fontSize: '1.2rem' }}>
                  {activePatient.bloodGroup}
                </div>
                <h5 className="fw-bold mb-0">{activePatient.name}</h5>
                <small className="text-muted font-monospace">{activePatient.id}</small>
              </div>

              <div className="d-flex flex-column gap-2" style={{ fontSize: '0.88rem' }}>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted">Age / Gender:</span>
                  <strong>{activePatient.age} Yrs / {activePatient.gender}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted">Phone:</span>
                  <strong>{activePatient.phone}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted">Known Allergies:</span>
                  <strong className="text-danger">{activePatient.allergies || 'None'}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <span className="text-muted">Chronic Conditions:</span>
                  <strong className="text-warning">{activePatient.chronicConditions || 'None'}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Insurance:</span>
                  <strong>{activePatient.insuranceProvider}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Chronological EMR Timeline */}
        <div className="col-lg-8">
          <div className="hms-card p-4 printable-area">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
              <div>
                <h5 className="fw-bold mb-0">Clinical History Timeline</h5>
                <small className="text-muted">Chronological order of physician encounters & lab tests</small>
              </div>
              <span className="badge bg-primary text-white font-monospace">{patientRecords.length + patientLabs.length} Records</span>
            </div>

            {/* Medical Records Timeline List */}
            <div className="emr-timeline">
              {patientRecords.map((record) => (
                <div key={record.id} className="emr-timeline-item">
                  <div className="emr-timeline-dot" />
                  <div className="border rounded-3 p-3 bg-body-tertiary shadow-sm">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="badge bg-primary-subtle text-primary fw-bold me-2">{record.department}</span>
                        <h6 className="fw-bold mb-0 d-inline">{record.diagnosis}</h6>
                      </div>
                      <small className="text-muted font-monospace">{record.date}</small>
                    </div>

                    <p className="text-muted mb-2" style={{ fontSize: '0.88rem' }}>
                      <strong>Attending Physician:</strong> {record.doctorName}
                    </p>

                    {/* Vitals Ribbon */}
                    {record.vitals && (
                      <div className="d-flex flex-wrap gap-2 p-2 bg-body rounded-2 border mb-3" style={{ fontSize: '0.78rem' }}>
                        <span><strong>BP:</strong> {record.vitals.bp}</span> • 
                        <span><strong>HR:</strong> {record.vitals.hr}</span> • 
                        <span><strong>Temp:</strong> {record.vitals.temp}</span> • 
                        <span><strong>Weight:</strong> {record.vitals.weight}</span> • 
                        <span><strong>SpO2:</strong> {record.vitals.spo2}</span>
                      </div>
                    )}

                    {/* Clinical Notes */}
                    <div className="mb-3 p-2 bg-light-subtle rounded border-start border-3 border-primary" style={{ fontSize: '0.85rem' }}>
                      <strong>Clinical Notes:</strong> {record.clinicalNotes}
                    </div>

                    {/* Prescriptions (Rx) */}
                    {record.prescriptions && record.prescriptions.length > 0 && (
                      <div className="mb-3">
                        <small className="fw-bold text-primary d-block mb-1">PRESCRIBED MEDICATIONS (Rx):</small>
                        <div className="d-flex flex-wrap gap-2">
                          {record.prescriptions.map((p, idx) => (
                            <span key={idx} className="badge bg-info-subtle text-info border p-2 text-start">
                              <strong>{p.name}</strong> ({p.dosage}) • {p.frequency} [{p.duration}]
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Attached Report File */}
                    {record.reportFile && (
                      <div className="d-flex align-items-center justify-content-between p-2 bg-white rounded border no-print" style={{ fontSize: '0.82rem' }}>
                        <div className="d-flex align-items-center gap-2">
                          <Paperclip size={16} className="text-primary" />
                          <span className="fw-semibold">{record.reportFile}</span>
                        </div>
                        <button 
                          className="btn btn-sm btn-link text-primary p-0 fw-bold"
                          onClick={() => alert(`Simulated downloading PDF report file: ${record.reportFile}`)}
                        >
                          <Download size={14} /> Download PDF
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Attached Diagnostic Scans & Lab Results */}
              {patientLabs.map((lab) => (
                <div key={lab.id} className="emr-timeline-item">
                  <div className="emr-timeline-dot bg-warning" />
                  <div className="border rounded-3 p-3 bg-body-tertiary shadow-sm">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <span className="badge bg-warning-subtle text-warning fw-bold me-2">LAB REPORT</span>
                        <h6 className="fw-bold mb-0 d-inline">{lab.testName}</h6>
                      </div>
                      <small className="text-muted font-monospace">{lab.completedDate || lab.requestDate}</small>
                    </div>

                    <div className="p-2 bg-body rounded border mb-2" style={{ fontSize: '0.82rem' }}>
                      {lab.results ? (
                        Object.entries(lab.results).map(([k, v]) => (
                          <div key={k} className="d-flex justify-content-between border-bottom py-1">
                            <span>{k}</span>
                            <strong className="text-primary">{v}</strong>
                          </div>
                        ))
                      ) : (
                        <em className="text-warning">Laboratory test currently pending processing...</em>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Writer Modal */}
      {showPrescriptionModal && (
        <PrescriptionModal
          patient={activePatient}
          onClose={() => setShowPrescriptionModal(false)}
        />
      )}
    </div>
  );
};

export default EMR;
