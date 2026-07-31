import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  FlaskConical,
  Upload,
  CheckCircle2,
  Clock,
  Send,
  FileText,
  Search,
  Plus,
  AlertCircle,
  Paperclip
} from 'lucide-react';

const LabModule = () => {
  const { labTests, updateLabTest, addLabTest, patients, currentUser } = useHospital();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [activeTestModal, setActiveTestModal] = useState(null);
  const [testResults, setTestResults] = useState({
    param1Name: 'Hemoglobin', param1Value: '14.5 g/dL',
    param2Name: 'WBC Count', param2Value: '7.2 x10^3/uL',
    param3Name: 'Platelets', param3Value: '260 x10^3/uL'
  });
  const [reportFileName, setReportFileName] = useState('Lab_Report_Final.pdf');
  const [notificationSent, setNotificationSent] = useState(false);

  const filteredTests = labTests.filter(l => {
    const matchesSearch = l.testName.toLowerCase().includes(search.toLowerCase()) ||
                          l.patientName.toLowerCase().includes(search.toLowerCase()) ||
                          l.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? l.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const handleOpenResultsModal = (test) => {
    setActiveTestModal(test);
    setNotificationSent(false);
  };

  const handleSaveLabReport = () => {
    if (!activeTestModal) return;

    const formattedResults = {
      [testResults.param1Name]: testResults.param1Value,
      [testResults.param2Name]: testResults.param2Value,
      [testResults.param3Name]: testResults.param3Value,
    };

    updateLabTest(activeTestModal.id, {
      status: 'Completed',
      completedDate: new Date().toISOString().split('T')[0],
      results: formattedResults,
      reportFile: reportFileName,
      notified: true
    });

    setNotificationSent(true);
    setTimeout(() => {
      setActiveTestModal(null);
    }, 1500);
  };

  return (
    <div className="container-fluid py-3">
      {/* Page Title */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">Laboratory Management Module</h2>
          <p className="text-muted mb-0">Pending & completed diagnostic tests, result data entry, PDF upload, and patient notification</p>
        </div>
        <div className="mt-3 mt-md-0">
          <button className="btn btn-hms-primary" onClick={() => alert('To request a new test, use the Doctor Workspace or EMR Console.')}>
            <FlaskConical size={16} /> Request Diagnostics
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="hms-card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0 text-muted">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="Search lab test by ID, Test Name or Patient Name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-3">
            <select className="hms-form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">Filter by Status (All)</option>
              <option value="Pending">Pending Processing</option>
              <option value="Completed">Completed Reports</option>
            </select>
          </div>

          <div className="col-md-3 text-end text-muted d-flex align-items-center justify-content-end" style={{ fontSize: '0.88rem' }}>
            Showing <strong>{filteredTests.length}</strong> Lab Orders
          </div>
        </div>
      </div>

      {/* Lab Tests Table */}
      <div className="hms-card p-4">
        <div className="table-responsive">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Test ID</th>
                <th>Patient Name</th>
                <th>Test Name & Category</th>
                <th>Requested By</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTests.length > 0 ? (
                filteredTests.map((test) => (
                  <tr key={test.id}>
                    <td>
                      <span className="font-monospace fw-bold text-primary bg-primary-subtle px-2 py-1 rounded">
                        {test.id}
                      </span>
                    </td>
                    <td>
                      <div className="fw-bold">{test.patientName}</div>
                      <small className="text-muted">{test.patientId}</small>
                    </td>
                    <td>
                      <div className="fw-semibold">{test.testName}</div>
                      <span className="badge bg-secondary-subtle text-secondary">{test.category || 'General'}</span>
                    </td>
                    <td>
                      <div className="fw-semibold" style={{ fontSize: '0.85rem' }}>{test.requestedBy}</div>
                    </td>
                    <td>
                      <small className="text-muted font-monospace">{test.requestDate}</small>
                    </td>
                    <td>
                      <span className={`badge-status ${test.status === 'Completed' ? 'badge-completed' : 'badge-waiting'}`}>
                        {test.status}
                      </span>
                    </td>
                    <td>
                      {test.status === 'Completed' ? (
                        <button className="btn btn-sm btn-outline-success" onClick={() => handleOpenResultsModal(test)}>
                          <CheckCircle2 size={16} /> View Result
                        </button>
                      ) : (
                        <button className="btn btn-sm btn-hms-primary" onClick={() => handleOpenResultsModal(test)}>
                          <Upload size={16} /> Enter Results & Notify
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">No lab tests found matching query</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lab Result Entry & Upload Modal */}
      {activeTestModal && (
        <div className="hms-modal-backdrop" onClick={() => setActiveTestModal(null)}>
          <div className="hms-modal-content p-4" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="badge bg-primary-subtle text-primary fw-bold mb-1">LAB REPORT PROCESSOR</span>
                <h5 className="fw-bold mb-0">{activeTestModal.testName} - {activeTestModal.patientName}</h5>
              </div>
              <button className="btn btn-outline-secondary border-0 p-1 rounded-circle" onClick={() => setActiveTestModal(null)}>
                ×
              </button>
            </div>

            {notificationSent && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-3">
                <Send size={18} />
                <div>
                  <strong>Lab Report Finalized!</strong> Automated SMS & Email notification dispatched to patient {activeTestModal.patientName}.
                </div>
              </div>
            )}

            <div className="mb-3 p-3 border rounded-3 bg-body-tertiary">
              <h6 className="fw-bold text-primary mb-2">Diagnostic Parameters & Test Values</h6>
              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="hms-form-label">Parameter 1 Name</label>
                  <input type="text" className="hms-form-input" value={testResults.param1Name} onChange={(e) => setTestResults({ ...testResults, param1Name: e.target.value })} />
                </div>
                <div className="col-6">
                  <label className="hms-form-label">Observed Value</label>
                  <input type="text" className="hms-form-input fw-bold" value={testResults.param1Value} onChange={(e) => setTestResults({ ...testResults, param1Value: e.target.value })} />
                </div>
              </div>

              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="hms-form-label">Parameter 2 Name</label>
                  <input type="text" className="hms-form-input" value={testResults.param2Name} onChange={(e) => setTestResults({ ...testResults, param2Name: e.target.value })} />
                </div>
                <div className="col-6">
                  <label className="hms-form-label">Observed Value</label>
                  <input type="text" className="hms-form-input fw-bold" value={testResults.param2Value} onChange={(e) => setTestResults({ ...testResults, param2Value: e.target.value })} />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="hms-form-label">Upload Diagnostic PDF Report Attachment</label>
              <div className="p-3 border border-2 border-dashed rounded-3 text-center bg-body">
                <Paperclip size={24} className="text-primary mb-1" />
                <div className="fw-bold" style={{ fontSize: '0.88rem' }}>{reportFileName}</div>
                <small className="text-muted d-block">PDF / Image scan attachment ready</small>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-hms-outline" onClick={() => setActiveTestModal(null)}>Cancel</button>
              <button className="btn btn-hms-primary" onClick={handleSaveLabReport}>
                <Send size={16} /> Finalize Report & Notify Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LabModule;
