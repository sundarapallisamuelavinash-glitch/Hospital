import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';
import {
  Activity,
  ShieldCheck,
  Lock,
  User,
  KeyRound,
  Stethoscope,
  Users,
  FlaskConical,
  UserCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const Login = () => {
  const { loginUser } = useHospital();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@hospital.org');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFACode, setTwoFACode] = useState('892014');

  const handleLogin = (e) => {
    e.preventDefault();
    setShow2FAModal(true);
  };

  const verify2FAAndLogin = () => {
    loginUser(email, password, selectedRole);
    setShow2FAModal(false);
    
    if (selectedRole === 'Doctor') navigate('/doctor-workspace');
    else if (selectedRole === 'Patient') navigate('/patient-portal');
    else if (selectedRole === 'Lab Technician') navigate('/lab');
    else navigate('/dashboard');
  };

  const roleProfiles = [
    { role: 'Admin', title: 'Hospital Admin', icon: ShieldCheck, color: 'bg-primary', desc: 'Full system management, analytics & logs' },
    { role: 'Doctor', title: 'Doctor Workspace', icon: Stethoscope, color: 'bg-success', desc: 'Consultations, EMR, prescriptions' },
    { role: 'Receptionist', title: 'Front Desk', icon: Users, color: 'bg-info', desc: 'Patient registration & OP appointment queue' },
    { role: 'Lab Technician', title: 'Laboratory Tech', icon: FlaskConical, color: 'bg-warning', desc: 'Lab report entry & notifications' },
    { role: 'Patient', title: 'Patient Portal', icon: UserCheck, color: 'bg-purple', desc: 'View appointments, reports & prescriptions' }
  ];

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3 bg-gradient-hospital position-relative overflow-hidden">
      {/* Background Decorative Circles */}
      <div className="position-absolute rounded-circle bg-white opacity-10" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px' }} />
      <div className="position-absolute rounded-circle bg-white opacity-10" style={{ width: '300px', height: '300px', bottom: '-80px', left: '-80px' }} />

      <div className="hms-card p-4 p-md-5 shadow-lg border-0 bg-white text-dark" style={{ maxWidth: '950px', width: '100%', borderRadius: '24px' }}>
        <div className="row g-4 align-items-center">
          {/* Left Column: Quick Role Selection */}
          <div className="col-lg-6 border-end pe-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="bg-primary text-white p-2 rounded-3">
                <Activity size={28} />
              </div>
              <div>
                <h3 className="fw-bold mb-0 text-primary">Apex Health System</h3>
                <small className="text-muted fw-bold">SECURE JWT ENTERPRISE PORTAL</small>
              </div>
            </div>
            <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
              Select your staff or patient role to experience role-specific dashboards with full JWT authentication simulation.
            </p>

            <div className="d-flex flex-column gap-2 mb-3">
              {roleProfiles.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedRole === p.role;
                return (
                  <div
                    key={p.role}
                    className={`p-3 rounded-3 border transition-all cursor-pointer d-flex align-items-center justify-content-between ${
                      isSelected ? 'border-primary bg-primary-subtle shadow-sm' : 'border-light-subtle bg-light-subtle'
                    }`}
                    onClick={() => {
                      setSelectedRole(p.role);
                      setEmail(`${p.role.toLowerCase().replace(' ', '')}@hospital.org`);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className={`p-2 rounded-circle text-white ${isSelected ? 'bg-primary' : 'bg-secondary'}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0" style={{ fontSize: '0.92rem' }}>{p.title}</h6>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>{p.desc}</small>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="text-primary" size={20} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: JWT Login Form */}
          <div className="col-lg-6 ps-lg-4">
            <div className="mb-4">
              <span className="badge bg-primary-subtle text-primary fw-bold mb-2">JWT 256-BIT ENCRYPTED</span>
              <h4 className="fw-bold mb-1">Sign In to Dashboard</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem' }}>
                Logging in as <strong className="text-primary">{selectedRole}</strong>
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="hms-form-label">Work Email / User ID</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <User size={18} className="text-muted" />
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0 bg-light"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="hms-form-label d-flex justify-content-between">
                  <span>Password</span>
                  <a href="#forgot" className="text-primary text-decoration-none" style={{ fontSize: '0.78rem' }}>Forgot Password?</a>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Lock size={18} className="text-muted" />
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0 bg-light"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-4" style={{ fontSize: '0.85rem' }}>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="remember" defaultChecked />
                  <label className="form-check-label text-muted" htmlFor="remember">Remember session (JWT)</label>
                </div>
                <span className="text-success fw-bold d-flex align-items-center gap-1">
                  <ShieldCheck size={14} /> HIPAA Compliant
                </span>
              </div>

              <button type="submit" className="btn btn-hms-primary w-100 py-3 justify-content-center fs-6">
                Authenticate & Login <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-4 pt-3 border-top text-center text-muted" style={{ fontSize: '0.78rem' }}>
              Apex HMS v4.2 • Protected under HIPAA Security Rule (45 CFR Part 160)
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Verification Modal Simulation */}
      {show2FAModal && (
        <div className="hms-modal-backdrop">
          <div className="hms-modal-content p-4 text-center" style={{ maxWidth: '420px' }}>
            <div className="bg-primary-subtle text-primary p-3 rounded-circle d-inline-block mb-3">
              <KeyRound size={32} />
            </div>
            <h5 className="fw-bold mb-1">Two-Factor Authentication</h5>
            <p className="text-muted mb-3" style={{ fontSize: '0.85rem' }}>
              We sent a 6-digit security code to your registered authenticator app or SMS for {email}.
            </p>

            <div className="mb-4">
              <input
                type="text"
                className="form-control form-control-lg text-center font-monospace fw-bold letter-spacing-3"
                value={twoFACode}
                onChange={(e) => setTwoFACode(e.target.value)}
                maxLength={6}
                style={{ fontSize: '1.5rem', letterSpacing: '0.3em' }}
              />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary w-50" onClick={() => setShow2FAModal(false)}>Cancel</button>
              <button className="btn btn-hms-primary w-50 justify-content-center" onClick={verify2FAAndLogin}>
                Verify Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
