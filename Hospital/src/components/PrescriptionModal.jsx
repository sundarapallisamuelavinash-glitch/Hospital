import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import { X, Printer, Plus, Trash2, Pill, Stethoscope, FileCheck } from 'lucide-react';

const PrescriptionModal = ({ patient, onClose }) => {
  const { doctors, currentUser, addMedicalRecord } = useHospital();

  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [bp, setBp] = useState('120/80 mmHg');
  const [hr, setHr] = useState('72 bpm');
  const [temp, setTemp] = useState('98.6 °F');
  const [spo2, setSpo2] = useState('99%');
  const [weight, setWeight] = useState('70 kg');

  const [medications, setMedications] = useState([
    { name: 'Amoxicillin', dosage: '500 mg', frequency: 'Three times daily after meals', duration: '5 Days' }
  ]);

  const [selectedLabTest, setSelectedLabTest] = useState('');
  const [labRequests, setLabRequests] = useState([]);

  const addMedication = () => {
    setMedications([...medications, { name: '', dosage: '', frequency: 'Once daily', duration: '7 Days' }]);
  };

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleMedChange = (index, field, value) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleAddLabRequest = () => {
    if (selectedLabTest && !labRequests.includes(selectedLabTest)) {
      setLabRequests([...labRequests, selectedLabTest]);
      setSelectedLabTest('');
    }
  };

  const handleSaveAndPrint = () => {
    if (!diagnosis) {
      alert('Please enter a clinical diagnosis.');
      return;
    }

    addMedicalRecord({
      patientId: patient?.id || 'PAT-2026-1001',
      doctorName: currentUser?.name || 'Dr. Alex Morgan',
      department: 'General Medicine',
      diagnosis,
      vitals: { bp, hr, temp, weight, spo2 },
      clinicalNotes: notes,
      prescriptions: medications,
      labRequests,
      reportFile: `Prescription_${patient?.id || 'PAT'}_${new Date().toISOString().substring(0, 10)}.pdf`
    });

    window.print();
    onClose();
  };

  return (
    <div className="hms-modal-backdrop" onClick={onClose}>
      <div className="hms-modal-content p-4" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3 no-print">
          <div className="d-flex align-items-center gap-2">
            <Pill className="text-primary" size={24} />
            <h5 className="fw-bold mb-0">Digital Prescription & Consultation Record</h5>
          </div>
          <button className="btn btn-outline-secondary border-0 p-1 rounded-circle" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Prescription Form / Printable Layout */}
        <div className="printable-area p-4 border rounded-3 bg-white mb-3" style={{ color: '#0f172a' }}>
          {/* Hospital Prescription Header */}
          <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
            <div>
              <h3 className="fw-bold mb-0 text-primary" style={{ color: '#0284c7' }}>APEX HEALTH SYSTEM</h3>
              <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>100 Medical Center Drive, Suite 400 • Phone: +1 (800) 555-APEX</p>
            </div>
            <div className="text-end">
              <h6 className="fw-bold mb-0">{currentUser?.name || 'Dr. Alex Morgan'}</h6>
              <small className="text-muted d-block">Department of Medicine</small>
              <small className="text-muted">Date: {new Date().toISOString().split('T')[0]}</small>
            </div>
          </div>

          {/* Patient Profile Sub-header */}
          <div className="row g-2 p-2 bg-light rounded-3 mb-3" style={{ fontSize: '0.85rem' }}>
            <div className="col-4"><strong>Patient:</strong> {patient?.name || 'John Doe'}</div>
            <div className="col-4"><strong>Patient ID:</strong> {patient?.id || 'PAT-2026-1001'}</div>
            <div className="col-4"><strong>Age/Gender:</strong> {patient?.age || 42} Yrs / {patient?.gender || 'Male'}</div>
            <div className="col-4"><strong>Blood Group:</strong> {patient?.bloodGroup || 'O+'}</div>
            <div className="col-8"><strong>Allergies:</strong> <span className="text-danger">{patient?.allergies || 'None'}</span></div>
          </div>

          {/* Vitals Form */}
          <div className="row g-2 mb-3">
            <div className="col border-end text-center">
              <label className="text-muted d-block" style={{ fontSize: '0.72rem' }}>BP</label>
              <input type="text" className="form-control form-control-sm text-center fw-bold border-0 bg-transparent" value={bp} onChange={(e) => setBp(e.target.value)} />
            </div>
            <div className="col border-end text-center">
              <label className="text-muted d-block" style={{ fontSize: '0.72rem' }}>Heart Rate</label>
              <input type="text" className="form-control form-control-sm text-center fw-bold border-0 bg-transparent" value={hr} onChange={(e) => setHr(e.target.value)} />
            </div>
            <div className="col border-end text-center">
              <label className="text-muted d-block" style={{ fontSize: '0.72rem' }}>Temp</label>
              <input type="text" className="form-control form-control-sm text-center fw-bold border-0 bg-transparent" value={temp} onChange={(e) => setTemp(e.target.value)} />
            </div>
            <div className="col text-center">
              <label className="text-muted d-block" style={{ fontSize: '0.72rem' }}>SpO2</label>
              <input type="text" className="form-control form-control-sm text-center fw-bold border-0 bg-transparent" value={spo2} onChange={(e) => setSpo2(e.target.value)} />
            </div>
          </div>

          {/* Diagnosis & Notes */}
          <div className="mb-3">
            <label className="hms-form-label text-primary">Clinical Diagnosis</label>
            <input 
              type="text" 
              className="hms-form-input fw-bold" 
              placeholder="e.g. Essential Hypertension / Upper Respiratory Infection"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="hms-form-label text-primary">Clinical Notes & Treatment Plan</label>
            <textarea 
              className="hms-form-input" 
              rows={2} 
              placeholder="Enter patient symptoms, physical examination, advice..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Rx Medication List */}
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h6 className="fw-bold text-primary mb-0 d-flex align-items-center gap-1">
                <Pill size={18} /> Prescribed Medications (Rx)
              </h6>
              <button className="btn btn-sm btn-outline-primary no-print" onClick={addMedication}>
                <Plus size={14} /> Add Medicine
              </button>
            </div>

            {medications.map((med, index) => (
              <div key={index} className="row g-2 align-items-center mb-2 p-2 bg-light rounded-3 border">
                <div className="col-md-4">
                  <input 
                    type="text" 
                    className="form-control form-control-sm fw-bold" 
                    placeholder="Medicine Name (e.g. Amoxicillin)"
                    value={med.name}
                    onChange={(e) => handleMedChange(index, 'name', e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    placeholder="Dosage (500mg)"
                    value={med.dosage}
                    onChange={(e) => handleMedChange(index, 'dosage', e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    placeholder="Frequency (TID after food)"
                    value={med.frequency}
                    onChange={(e) => handleMedChange(index, 'frequency', e.target.value)}
                  />
                </div>
                <div className="col-md-2">
                  <input 
                    type="text" 
                    className="form-control form-control-sm" 
                    placeholder="Duration (5 Days)"
                    value={med.duration}
                    onChange={(e) => handleMedChange(index, 'duration', e.target.value)}
                  />
                </div>
                {medications.length > 1 && (
                  <div className="col-md-1 text-center no-print">
                    <button className="btn btn-sm btn-link text-danger p-0" onClick={() => removeMedication(index)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Requested Lab Tests */}
          <div className="mb-2">
            <label className="hms-form-label text-primary">Diagnostic Lab Tests Ordered</label>
            <div className="d-flex gap-2 mb-2 no-print">
              <select className="hms-form-select" value={selectedLabTest} onChange={(e) => setSelectedLabTest(e.target.value)}>
                <option value="">Select Lab Test to Order...</option>
                <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                <option value="Lipid Profile">Lipid Profile</option>
                <option value="Fasting Blood Sugar (FBS)">Fasting Blood Sugar (FBS)</option>
                <option value="Liver Function Test (LFT)">Liver Function Test (LFT)</option>
                <option value="Thyroid Profile (T3, T4, TSH)">Thyroid Profile (T3, T4, TSH)</option>
                <option value="Chest X-Ray PA View">Chest X-Ray PA View</option>
              </select>
              <button className="btn btn-outline-primary" onClick={handleAddLabRequest}>Add Test</button>
            </div>

            <div className="d-flex flex-wrap gap-2">
              {labRequests.map((req, i) => (
                <span key={i} className="badge bg-info-subtle text-info fw-bold p-2 border">
                  {req}
                </span>
              ))}
            </div>
          </div>

          {/* Doctor Signature Line */}
          <div className="d-flex justify-content-between align-items-end mt-4 pt-3 border-top">
            <small className="text-muted">Generated via Apex HMS Digital Health Platform</small>
            <div className="text-center" style={{ width: '180px' }}>
              <div className="font-monospace text-primary fw-bold mb-1" style={{ borderBottom: '1px solid #94a3b8' }}>
                {currentUser?.name || 'Dr. Alex Morgan'}
              </div>
              <small className="text-muted">Doctor Signature</small>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 no-print">
          <button className="btn btn-hms-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-hms-primary" onClick={handleSaveAndPrint}>
            <Printer size={16} /> Save & Print Prescription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
