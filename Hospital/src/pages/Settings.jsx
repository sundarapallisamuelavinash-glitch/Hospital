import React from 'react';

const Settings = () => {
  return (
    <div className="container-fluid py-2">
      <h2 className="mb-4">Settings</h2>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 p-4 mb-4">
            <h5 className="fw-bold mb-4">Hospital Information</h5>
            <form className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Hospital Name</label>
                <input type="text" className="form-control" defaultValue="MediCare Hospital" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" defaultValue="contact@medicare.com" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-control" defaultValue="+1 800 123 4567" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Registration Number</label>
                <input type="text" className="form-control" defaultValue="REG-9920192" />
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <textarea className="form-control" rows="2" defaultValue="123 Health Avenue, Medical District, NY 10001"></textarea>
              </div>
              <div className="col-12 mt-4">
                <button type="button" className="btn btn-primary px-4">Save Changes</button>
              </div>
            </form>
          </div>

          <div className="card border-0 p-4">
            <h5 className="fw-bold mb-4">System Settings</h5>
            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3" style={{borderColor: 'var(--border-color)'}}>
              <div>
                <h6 className="mb-1 fw-bold">Email Notifications</h6>
                <p className="text-muted small mb-0">Receive email alerts for new appointments and payments.</p>
              </div>
              <div className="form-check form-switch fs-4">
                <input className="form-check-input" type="checkbox" defaultChecked />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div>
                <h6 className="mb-1 fw-bold">SMS Alerts</h6>
                <p className="text-muted small mb-0">Send SMS notifications to patients automatically.</p>
              </div>
              <div className="form-check form-switch fs-4">
                <input className="form-check-input" type="checkbox" defaultChecked />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 p-4 mb-4 text-center">
            <h5 className="fw-bold mb-4 text-start">Hospital Logo</h5>
            <div className="bg-primary-soft rounded mx-auto d-flex align-items-center justify-content-center mb-4" style={{width: '120px', height: '120px', padding: '10px'}}>
              <img src="/logo.png" alt="Logo" style={{maxWidth: '100%', maxHeight: '100%'}} />
            </div>
            <button className="btn btn-outline-primary btn-sm px-4 fw-semibold">Change Logo</button>
            <p className="text-muted small mt-3 mb-0">Recommended size: 200x200px (PNG, JPG)</p>
          </div>
          
          <div className="card border-0 p-4">
            <h5 className="fw-bold mb-4">Theme Preferences</h5>
            <p className="text-muted small mb-4">Theme is controlled via the topbar toggle, but you can also force it here.</p>
            <div className="d-grid gap-3">
              <button className="btn btn-light border py-2 text-start fw-semibold" onClick={() => document.documentElement.setAttribute('data-theme', 'light')}>
                <i className="fa-solid fa-sun me-3 text-warning"></i> Light Mode
              </button>
              <button className="btn btn-dark py-2 text-start fw-semibold" onClick={() => document.documentElement.setAttribute('data-theme', 'dark')}>
                <i className="fa-solid fa-moon me-3 text-white"></i> Dark Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
