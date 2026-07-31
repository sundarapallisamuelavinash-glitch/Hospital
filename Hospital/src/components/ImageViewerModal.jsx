import React, { useState } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sun,
  Download,
  Maximize2,
  Minimize2,
  Sliders,
  FileText,
  Activity
} from 'lucide-react';

const ImageViewerModal = ({ scan, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [isInverted, setIsInverted] = useState(false);

  if (!scan) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
    setBrightness(100);
    setContrast(100);
    setIsInverted(false);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = scan.imageUrl;
    a.download = `${scan.modality}_${scan.patientId}_${scan.scanDate}.jpg`;
    a.click();
  };

  return (
    <div className="hms-modal-backdrop" onClick={onClose}>
      <div className="hms-modal-content p-4" style={{ maxWidth: '850px' }} onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="badge bg-primary-subtle text-primary fw-bold mb-1">{scan.modality} DIAGNOSTIC SCAN</span>
            <h5 className="fw-bold mb-0">{scan.bodyPart} - {scan.patientName} ({scan.patientId})</h5>
          </div>
          <button className="btn btn-outline-secondary border-0 p-1 rounded-circle" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 p-2 bg-body-tertiary rounded-3 mb-3 border">
          <div className="d-flex align-items-center gap-1">
            <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onClick={handleZoomIn} title="Zoom In">
              <ZoomIn size={16} /> <span className="d-none d-sm-inline">Zoom In</span>
            </button>
            <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onClick={handleZoomOut} title="Zoom Out">
              <ZoomOut size={16} /> <span className="d-none d-sm-inline">Zoom Out</span>
            </button>
            <span className="badge bg-secondary-subtle text-secondary px-2">{Math.round(zoom * 100)}%</span>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1" onClick={handleRotate} title="Rotate 90 deg">
              <RotateCw size={16} /> <span className="d-none d-sm-inline">Rotate</span>
            </button>
            <button 
              className={`btn btn-sm ${isInverted ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setIsInverted(!isInverted)}
              title="Invert Colors"
            >
              Invert
            </button>
            <button className="btn btn-sm btn-link text-muted" onClick={handleReset}>Reset</button>
          </div>

          <button className="btn btn-sm btn-hms-primary" onClick={handleDownload}>
            <Download size={15} /> Download DICOM
          </button>
        </div>

        {/* Interactive DICOM Image Viewport */}
        <div className="dicom-viewport mb-3">
          <img 
            src={scan.imageUrl} 
            alt={scan.bodyPart}
            className="dicom-img"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              filter: `brightness(${brightness}%) contrast(${contrast}%) ${isInverted ? 'invert(100%)' : ''}`,
            }}
          />
        </div>

        {/* Image Adjustment Sliders */}
        <div className="row g-3 bg-body-tertiary p-3 rounded-3 mb-3 border">
          <div className="col-md-6">
            <label className="hms-form-label d-flex justify-content-between" style={{ fontSize: '0.78rem' }}>
              <span>Brightness</span>
              <span>{brightness}%</span>
            </label>
            <input 
              type="range" 
              className="form-range" 
              min="50" 
              max="200" 
              value={brightness}
              onChange={(e) => setBrightness(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label className="hms-form-label d-flex justify-content-between" style={{ fontSize: '0.78rem' }}>
              <span>Contrast</span>
              <span>{contrast}%</span>
            </label>
            <input 
              type="range" 
              className="form-range" 
              min="50" 
              max="200" 
              value={contrast}
              onChange={(e) => setContrast(e.target.value)}
            />
          </div>
        </div>

        {/* Radiologist Findings & Report Notes */}
        <div className="p-3 bg-primary-subtle rounded-3 border border-primary-subtle">
          <h6 className="fw-bold text-primary mb-1 d-flex align-items-center gap-2">
            <Activity size={16} /> Radiologist Findings ({scan.radiologist})
          </h6>
          <p className="mb-0 text-secondary" style={{ fontSize: '0.88rem' }}>
            {scan.findings}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageViewerModal;
