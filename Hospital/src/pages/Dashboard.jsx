import React from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  Users,
  Calendar,
  IndianRupee,
  FlaskConical,
  Activity,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const revenueData = [
  { month: 'Jan', revenue: 840000, visits: 310 },
  { month: 'Feb', revenue: 920000, visits: 380 },
  { month: 'Mar', revenue: 1050000, visits: 450 },
  { month: 'Apr', revenue: 980000, visits: 420 },
  { month: 'May', revenue: 1180000, visits: 510 },
  { month: 'Jun', revenue: 1285000, visits: 580 },
];

const departmentData = [
  { name: 'Cardiology', value: 35, color: '#0284c7' },
  { name: 'Neurology', value: 25, color: '#7c3aed' },
  { name: 'Orthopedics', value: 20, color: '#10b981' },
  { name: 'Pediatrics', value: 20, color: '#f59e0b' },
];

const Dashboard = () => {
  const { patients, appointments, labTests, auditLogs, currentUser } = useHospital();
  const navigate = useNavigate();

  const todayAppointments = appointments.filter(a => a.date === '2026-07-30');
  const pendingLabs = labTests.filter(l => l.status === 'Pending');

  return (
    <div className="container-fluid py-3">
      {/* Welcome Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">Executive Hospital Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, <strong className="text-primary">{currentUser?.name}</strong> • Real-time Operations Overview</p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button className="btn btn-hms-outline" onClick={() => navigate('/appointments')}>
            <Calendar size={16} /> Schedule OP
          </button>
          <button className="btn btn-hms-primary" onClick={() => navigate('/patients/new')}>
            <Users size={16} /> New Patient
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="row g-3 mb-4">
        {/* Total Patients */}
        <div className="col-sm-6 col-xl-3">
          <div className="hms-card p-3 hms-card-interactive">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-bold" style={{ fontSize: '0.8rem' }}>TOTAL PATIENTS</span>
              <div className="p-2 bg-primary-subtle text-primary rounded-3">
                <Users size={20} />
              </div>
            </div>
            <h3 className="fw-bold mb-1">{patients.length + 1240}</h3>
            <div className="d-flex align-items-center gap-1 text-success" style={{ fontSize: '0.78rem' }}>
              <TrendingUp size={14} /> <span>+12.4% from last month</span>
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="col-sm-6 col-xl-3">
          <div className="hms-card p-3 hms-card-interactive">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-bold" style={{ fontSize: '0.8rem' }}>TODAY'S OP QUEUE</span>
              <div className="p-2 bg-info-subtle text-info rounded-3">
                <Calendar size={20} />
              </div>
            </div>
            <h3 className="fw-bold mb-1">{todayAppointments.length + 18}</h3>
            <div className="d-flex align-items-center gap-1 text-primary" style={{ fontSize: '0.78rem' }}>
              <Clock size={14} /> <span>Avg wait time: 14 mins</span>
            </div>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="col-sm-6 col-xl-3">
          <div className="hms-card p-3 hms-card-interactive">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-bold" style={{ fontSize: '0.8rem' }}>MONTHLY REVENUE</span>
              <div className="p-2 bg-success-subtle text-success rounded-3">
                <IndianRupee size={20} />
              </div>
            </div>
            <h3 className="fw-bold mb-1">₹12,85,000</h3>
            <div className="d-flex align-items-center gap-1 text-success" style={{ fontSize: '0.78rem' }}>
              <ArrowUpRight size={14} /> <span>+8.2% revenue growth</span>
            </div>
          </div>
        </div>

        {/* Pending Lab Reports */}
        <div className="col-sm-6 col-xl-3">
          <div className="hms-card p-3 hms-card-interactive">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted fw-bold" style={{ fontSize: '0.8rem' }}>PENDING LAB TESTS</span>
              <div className="p-2 bg-warning-subtle text-warning rounded-3">
                <FlaskConical size={20} />
              </div>
            </div>
            <h3 className="fw-bold mb-1">{pendingLabs.length + 5}</h3>
            <div className="d-flex align-items-center gap-1 text-warning" style={{ fontSize: '0.78rem' }}>
              <AlertCircle size={14} /> <span>Requires Lab Tech sign-off</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Live Queue Row */}
      <div className="row g-4 mb-4">
        {/* Revenue & Visit Trend Chart */}
        <div className="col-lg-8">
          <div className="hms-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h5 className="fw-bold mb-0">Financial & Patient Growth Trend</h5>
                <small className="text-muted">Monthly Revenue (₹) vs Outpatient Visits</small>
              </div>
              <span className="badge bg-primary-subtle text-primary font-monospace">H1 2026</span>
            </div>

            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="month" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Department Distribution Pie Chart */}
        <div className="col-lg-4">
          <div className="hms-card p-4 h-100">
            <h5 className="fw-bold mb-1">Department Visits</h5>
            <small className="text-muted d-block mb-3">Specialty workload distribution</small>

            <div style={{ width: '100%', height: 220 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card-bg)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="row g-2 text-center" style={{ fontSize: '0.78rem' }}>
              {departmentData.map((dept) => (
                <div key={dept.name} className="col-6">
                  <div className="p-2 border rounded-3 bg-body-tertiary">
                    <span className="d-inline-block rounded-circle me-1" style={{ width: '8px', height: '8px', backgroundColor: dept.color }} />
                    <strong className="d-block">{dept.name}</strong>
                    <span className="text-muted">{dept.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live OP Queue & Audit Feed Row */}
      <div className="row g-4">
        {/* Today's Live OP Token Queue */}
        <div className="col-lg-7">
          <div className="hms-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <Clock className="text-primary" size={20} /> Live OP Consultation Queue
              </h5>
              <button className="btn btn-sm btn-link text-primary text-decoration-none fw-bold" onClick={() => navigate('/appointments')}>
                View All OP Queue <ChevronRight size={16} />
              </button>
            </div>

            <div className="table-responsive">
              <table className="hms-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Patient</th>
                    <th>Doctor / Room</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.slice(0, 4).map((app) => (
                    <tr key={app.id}>
                      <td>
                        <span className="font-monospace fw-bold text-primary bg-primary-subtle px-2 py-1 rounded">
                          {app.tokenNo}
                        </span>
                      </td>
                      <td>
                        <div className="fw-bold">{app.patientName}</div>
                        <small className="text-muted">{app.patientId}</small>
                      </td>
                      <td>
                        <div className="fw-semibold">{app.doctorName}</div>
                        <small className="text-muted">{app.department}</small>
                      </td>
                      <td>
                        <span className={`badge-status badge-${app.status.toLowerCase().replace(' ', '-')}`}>
                          {app.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-hms-outline" onClick={() => navigate(`/emr?patientId=${app.patientId}`)}>
                          View EMR
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Security Audit Feed */}
        <div className="col-lg-5">
          <div className="hms-card p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                <ShieldCheck className="text-success" size={20} /> System Audit Trail
              </h5>
              <button className="btn btn-sm btn-link text-primary text-decoration-none fw-bold" onClick={() => navigate('/security')}>
                Full Audit Logs
              </button>
            </div>

            <div className="d-flex flex-column gap-3">
              {auditLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="p-2 border rounded-3 bg-body-tertiary d-flex align-items-center justify-content-between">
                  <div>
                    <div className="fw-bold" style={{ fontSize: '0.85rem' }}>{log.action}</div>
                    <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>{log.user} ({log.role})</small>
                  </div>
                  <div className="text-end">
                    <span className="badge bg-success-subtle text-success" style={{ fontSize: '0.68rem' }}>{log.status}</span>
                    <small className="text-muted d-block mt-1" style={{ fontSize: '0.68rem' }}>{log.timestamp.substring(11, 16)}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
