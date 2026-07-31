import React from 'react';

const PatientHistory = () => {
  return (
    <div className="container-fluid py-2">
      <h2 className="mb-4">Patient History</h2>
      <div className="card border-0 p-4 mb-4">
        <div className="row align-items-center">
          <div className="col-md-4 border-end">
            <h5 className="fw-bold text-primary mb-1">Jane Doe</h5>
            <p className="text-muted mb-0">ID: PT-10492 | Age: 34 | Blood: O+</p>
          </div>
          <div className="col-md-8 px-4">
            <div className="input-group">
              <span className="input-group-text bg-transparent"><i className="fa-solid fa-magnifying-glass text-muted"></i></span>
              <input type="text" className="form-control border-start-0 ps-0" placeholder="Search for another patient (by ID or Name)" />
              <button className="btn btn-primary px-4">Search</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 p-4 h-100">
            <h5 className="fw-bold mb-4">Previous Visits</h5>
            <div className="timeline position-relative ps-4" style={{borderLeft: '2px solid var(--border-color)'}}>
              <div className="timeline-item mb-4 position-relative">
                <span className="position-absolute bg-primary rounded-circle" style={{width: '12px', height: '12px', left: '-29px', top: '5px'}}></span>
                <h6 className="fw-bold mb-1">General Checkup <span className="badge bg-light text-dark ms-2">Dr. Smith</span></h6>
                <p className="text-muted small mb-2"><i className="fa-regular fa-calendar me-2"></i> Oct 15, 2023</p>
                <p className="mb-0">Patient complained of mild fever and body ache. Prescribed paracetamol.</p>
              </div>
              <div className="timeline-item position-relative">
                <span className="position-absolute bg-secondary rounded-circle" style={{width: '12px', height: '12px', left: '-29px', top: '5px', backgroundColor: '#6c757d'}}></span>
                <h6 className="fw-bold mb-1">Follow-up <span className="badge bg-light text-dark ms-2">Dr. Smith</span></h6>
                <p className="text-muted small mb-2"><i className="fa-regular fa-calendar me-2"></i> Sep 01, 2023</p>
                <p className="mb-0">Routine follow up after viral infection. Fully recovered.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 p-4 mb-4">
            <h5 className="fw-bold mb-4">Previous Reports</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-color">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-file-pdf text-danger fs-4 me-3"></i>
                  <div>
                    <h6 className="mb-0">Complete Blood Count</h6>
                    <small className="text-muted">Oct 15, 2023</small>
                  </div>
                </div>
                <button className="btn btn-sm btn-light"><i className="fa-solid fa-download"></i></button>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 border-color">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-image text-primary fs-4 me-3"></i>
                  <div>
                    <h6 className="mb-0">Chest X-Ray</h6>
                    <small className="text-muted">Sep 01, 2023</small>
                  </div>
                </div>
                <button className="btn btn-sm btn-light"><i className="fa-solid fa-download"></i></button>
              </li>
            </ul>
          </div>
          <div className="card border-0 p-4">
            <h5 className="fw-bold mb-4">Billing History</h5>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-semibold">INV-2023-098</span>
              <span className="text-success fw-bold">₹590.00</span>
            </div>
            <p className="text-muted small border-bottom pb-2" style={{borderColor: 'var(--border-color)'}}>Paid on Oct 15, 2023 via UPI</p>
            <div className="d-flex justify-content-between align-items-center mb-2 mt-3">
              <span className="fw-semibold">INV-2023-045</span>
              <span className="text-success fw-bold">₹1,200.00</span>
            </div>
            <p className="text-muted small mb-0">Paid on Sep 01, 2023 via Card</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientHistory;
