import React from 'react';
import { X, Printer, QrCode, ShieldCheck, Heart, User } from 'lucide-react';

const PatientQRModal = ({ patient, onClose }) => {
  if (!patient) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="hms-modal-backdrop" onClick={onClose}>
      <div className="hms-modal-content p-4 position-relative" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4 no-print">
          <div className="d-flex align-items-center gap-2">
            <QrCode className="text-primary" size={24} />
            <h5 className="fw-bold mb-0">Patient Identification & Wristband QR</h5>
          </div>
          <button className="btn btn-outline-secondary border-0 p-1 rounded-circle" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Printable Card */}
        <div className="patient-wristband-card printable-area mb-4">
          <div className="d-flex justify-content-between align-items-start border-bottom border-primary pb-3 mb-3">
            <div>
              <span className="badge bg-primary text-white mb-1">APEX HEALTH SYSTEM</span>
              <h4 className="fw-bold mb-0 text-primary">{patient.name}</h4>
              <small className="text-muted fw-bold">ID: {patient.id}</small>
            </div>
            <div className="text-end">
              <span className="badge bg-danger text-white fw-bold px-3 py-1 fs-6">
                Blood: {patient.bloodGroup}
              </span>
              <small className="text-muted d-block mt-1">Reg: {patient.registeredDate}</small>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-8">
              <div className="row g-2" style={{ fontSize: '0.85rem' }}>
                <div className="col-6">
                  <span className="text-muted d-block">Age / Gender:</span>
                  <strong>{patient.age} Yrs / {patient.gender}</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted d-block">Phone:</span>
                  <strong>{patient.phone}</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted d-block">Emergency Contact:</span>
                  <strong className="text-danger">{patient.emergencyContact}</strong>
                </div>
                <div className="col-6">
                  <span className="text-muted d-block">Allergies:</span>
                  <strong className="text-warning">{patient.allergies || 'None'}</strong>
                </div>
                <div className="col-12 mt-2">
                  <span className="text-muted d-block">Insurance Policy:</span>
                  <strong>{patient.insuranceProvider} ({patient.policyNumber})</strong>
                </div>
              </div>
            </div>

            {/* Simulated QR Code Canvas/SVG */}
            <div className="col-md-4 text-center mt-3 mt-md-0">
              <div className="bg-white p-2 border border-2 border-primary rounded-3 d-inline-block shadow-sm">
                <svg width="110" height="110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" fill="white"/>
                  {/* Position detection patterns */}
                  <rect x="5" y="5" width="25" height="25" fill="#0284c7"/>
                  <rect x="9" y="9" width="17" height="17" fill="white"/>
                  <rect x="13" y="13" width="9" height="9" fill="#0284c7"/>

                  <rect x="70" y="5" width="25" height="25" fill="#0284c7"/>
                  <rect x="74" y="9" width="17" height="17" fill="white"/>
                  <rect x="78" y="13" width="9" height="9" fill="#0284c7"/>

                  <rect x="5" y="70" width="25" height="25" fill="#0284c7"/>
                  <rect x="9" y="74" width="17" height="17" fill="white"/>
                  <rect x="13" y="78" width="9" height="9" fill="#0284c7"/>

                  {/* Simulated Data Grid */}
                  <rect x="35" y="10" width="8" height="8" fill="#0f172a"/>
                  <rect x="48" y="10" width="8" height="8" fill="#0f172a"/>
                  <rect x="35" y="25" width="8" height="8" fill="#0f172a"/>
                  <rect x="48" y="25" width="8" height="8" fill="#0f172a"/>
                  <rect x="10" y="40" width="8" height="8" fill="#0f172a"/>
                  <rect x="25" y="40" width="8" height="8" fill="#0f172a"/>
                  <rect x="40" y="40" width="8" height="8" fill="#0f172a"/>
                  <rect x="55" y="40" width="8" height="8" fill="#0f172a"/>
                  <rect x="70" y="40" width="8" height="8" fill="#0f172a"/>
                  <rect x="85" y="40" width="8" height="8" fill="#0f172a"/>
                  <rect x="40" y="55" width="8" height="8" fill="#0f172a"/>
                  <rect x="55" y="55" width="8" height="8" fill="#0f172a"/>
                  <rect x="70" y="55" width="8" height="8" fill="#0f172a"/>
                  <rect x="35" y="70" width="8" height="8" fill="#0f172a"/>
                  <rect x="48" y="70" width="8" height="8" fill="#0f172a"/>
                  <rect x="65" y="70" width="8" height="8" fill="#0f172a"/>
                  <rect x="80" y="70" width="8" height="8" fill="#0f172a"/>
                  <rect x="35" y="85" width="8" height="8" fill="#0f172a"/>
                  <rect x="55" y="85" width="8" height="8" fill="#0f172a"/>
                  <rect x="75" y="85" width="8" height="8" fill="#0f172a"/>
                </svg>
              </div>
              <small className="text-muted d-block mt-1 font-monospace" style={{ fontSize: '0.68rem' }}>
                |||| | ||||| ||| |||||||
              </small>
              <small className="text-muted" style={{ fontSize: '0.65rem' }}>Scannable QR Wristband</small>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="d-flex justify-content-end gap-2 no-print">
          <button className="btn btn-hms-outline" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-hms-primary" onClick={handlePrint}>
            <Printer size={16} /> Print Wristband ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientQRModal;
