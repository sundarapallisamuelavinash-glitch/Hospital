import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  Image as ImageIcon,
  ZoomIn,
  Download,
  Filter,
  Plus,
  Activity,
  Maximize2,
  FileText
} from 'lucide-react';
import ImageViewerModal from '../components/ImageViewerModal';

const MedicalImaging = () => {
  const { imagingScans, addImagingScan, patients } = useHospital();

  const [modalityFilter, setModalityFilter] = useState('');
  const [selectedScanForView, setSelectedScanForView] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New Scan Form State
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [modality, setModality] = useState('X-Ray');
  const [bodyPart, setBodyPart] = useState('Chest PA View');
  const [findings, setFindings] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80');

  const filteredScans = imagingScans.filter(s => {
    return modalityFilter ? s.modality === modalityFilter : true;
  });

  const handleUploadScan = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === selectedPatientId);
    addImagingScan({
      patientId: patient.id,
      patientName: patient.name,
      modality,
      bodyPart,
      radiologist: 'Dr. H. Vance',
      findings: findings || 'Unremarkable diagnostic imaging scan.',
      imageUrl
    });
    setShowUploadModal(false);
  };

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">Medical Diagnostics & Imaging Center</h2>
          <p className="text-muted mb-0">High-resolution DICOM gallery for X-Rays, MRIs, CT Scans, ECG, and Ultrasound</p>
        </div>
        <div className="mt-3 mt-md-0">
          <button className="btn btn-hms-primary" onClick={() => setShowUploadModal(true)}>
            <Plus size={16} /> Upload New Diagnostic Scan
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="hms-card p-3 mb-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex flex-wrap gap-2">
            <button
              className={`btn btn-sm ${modalityFilter === '' ? 'btn-hms-primary' : 'btn-hms-outline'}`}
              onClick={() => setModalityFilter('')}
            >
              All Modalities ({imagingScans.length})
            </button>
            <button
              className={`btn btn-sm ${modalityFilter === 'X-Ray' ? 'btn-hms-primary' : 'btn-hms-outline'}`}
              onClick={() => setModalityFilter('X-Ray')}
            >
              X-Ray Scans
            </button>
            <button
              className={`btn btn-sm ${modalityFilter === 'MRI' ? 'btn-hms-primary' : 'btn-hms-outline'}`}
              onClick={() => setModalityFilter('MRI')}
            >
              MRI Brain/Spine
            </button>
            <button
              className={`btn btn-sm ${modalityFilter === 'CT Scan' ? 'btn-hms-primary' : 'btn-hms-outline'}`}
              onClick={() => setModalityFilter('CT Scan')}
            >
              3D CT Scans
            </button>
          </div>

          <div className="text-muted" style={{ fontSize: '0.85rem' }}>
            Interactive DICOM Viewer with Zoom & Contrast controls
          </div>
        </div>
      </div>

      {/* Imaging Scans Grid */}
      <div className="row g-4">
        {filteredScans.map((scan) => (
          <div key={scan.id} className="col-md-6 col-lg-4">
            <div className="hms-card h-100 overflow-hidden hms-card-interactive">
              {/* Scan Thumbnail with Overlay Button */}
              <div className="position-relative bg-dark" style={{ height: '220px' }}>
                <img
                  src={scan.imageUrl}
                  alt={scan.bodyPart}
                  className="w-100 h-100 object-fit-cover opacity-90"
                />
                <div className="position-absolute top-0 start-0 p-2">
                  <span className="badge bg-primary text-white font-monospace">{scan.modality}</span>
                </div>
                <div className="position-absolute top-0 end-0 p-2">
                  <span className="badge bg-dark text-white opacity-75">{scan.scanDate}</span>
                </div>

                <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-to-t text-white d-flex justify-content-between align-items-center" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                  <button
                    className="btn btn-sm btn-light fw-bold d-flex align-items-center gap-1 shadow-sm"
                    onClick={() => setSelectedScanForView(scan)}
                  >
                    <ZoomIn size={16} /> Open Viewer
                  </button>
                </div>
              </div>

              {/* Scan Details Footer */}
              <div className="p-3">
                <h6 className="fw-bold mb-1">{scan.bodyPart}</h6>
                <div className="d-flex justify-content-between align-items-center text-muted" style={{ fontSize: '0.82rem' }}>
                  <span>Patient: <strong>{scan.patientName}</strong></span>
                  <span className="font-monospace">{scan.patientId}</span>
                </div>
                <hr className="my-2" />
                <small className="text-muted d-block text-truncate">
                  Radiologist: {scan.radiologist}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive DICOM Viewer Modal */}
      {selectedScanForView && (
        <ImageViewerModal
          scan={selectedScanForView}
          onClose={() => setSelectedScanForView(null)}
        />
      )}

      {/* Upload Scan Modal */}
      {showUploadModal && (
        <div className="hms-modal-backdrop" onClick={() => setShowUploadModal(false)}>
          <div className="hms-modal-content p-4" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <h5 className="fw-bold mb-3">Upload New Diagnostic Imaging Scan</h5>
            <form onSubmit={handleUploadScan}>
              <div className="mb-3">
                <label className="hms-form-label">Select Patient *</label>
                <select className="hms-form-select" value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)}>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="hms-form-label">Imaging Modality</label>
                  <select className="hms-form-select" value={modality} onChange={(e) => setModality(e.target.value)}>
                    <option value="X-Ray">X-Ray</option>
                    <option value="MRI">MRI</option>
                    <option value="CT Scan">CT Scan</option>
                    <option value="Ultrasound">Ultrasound</option>
                    <option value="ECG">ECG 12-Lead</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="hms-form-label">Body Part / Target Region</label>
                  <input type="text" className="hms-form-input" value={bodyPart} onChange={(e) => setBodyPart(e.target.value)} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="hms-form-label">Radiologist Findings & Report Notes</label>
                <textarea className="hms-form-input" rows={3} value={findings} onChange={(e) => setFindings(e.target.value)} placeholder="Radiology observations..." />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-hms-outline" onClick={() => setShowUploadModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-hms-primary">Save Imaging File</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalImaging;
