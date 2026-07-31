import React from 'react';

const MedicalReports = () => {
  return (
    <div className="container-fluid py-2">
      <h2 className="mb-4">Medical Reports</h2>
      
      <div className="card border-0 p-4 mb-4">
        <h5 className="fw-bold mb-3">Upload Report</h5>
        <div className="border border-2 border-dashed rounded-3 p-5 text-center" style={{borderColor: 'var(--border-color)', backgroundColor: 'var(--card-bg)', borderStyle: 'dashed'}}>
          <i className="fa-solid fa-cloud-arrow-up text-primary mb-3" style={{fontSize: '3rem'}}></i>
          <h5>Drag & Drop your files here</h5>
          <p className="text-muted">or click to browse (Scan, X-ray, MRI, CT Scan, Blood Reports)</p>
          <button className="btn btn-primary mt-2 px-4">Browse Files</button>
        </div>
      </div>

      <div className="card border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">Recent Reports</h5>
          <div className="input-group" style={{maxWidth: '300px'}}>
            <span className="input-group-text bg-transparent"><i className="fa-solid fa-magnifying-glass text-muted"></i></span>
            <input type="text" className="form-control border-start-0 ps-0" placeholder="Search by Patient ID" />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Report Type</th>
                <th>Date Uploaded</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="fw-semibold">PT-10492</span></td>
                <td>John Doe</td>
                <td><span className="badge bg-primary-soft text-primary p-2">Blood Report</span></td>
                <td>Oct 24, 2023</td>
                <td>
                  <button className="btn btn-sm btn-light me-2"><i className="fa-solid fa-eye"></i></button>
                  <button className="btn btn-sm btn-light"><i className="fa-solid fa-download"></i></button>
                </td>
              </tr>
              <tr>
                <td><span className="fw-semibold">PT-10331</span></td>
                <td>Jane Smith</td>
                <td><span className="badge bg-primary-soft text-primary p-2">MRI Scan</span></td>
                <td>Oct 23, 2023</td>
                <td>
                  <button className="btn btn-sm btn-light me-2"><i className="fa-solid fa-eye"></i></button>
                  <button className="btn btn-sm btn-light"><i className="fa-solid fa-download"></i></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MedicalReports;
