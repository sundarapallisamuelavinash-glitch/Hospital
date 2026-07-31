import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  Calendar,
  Clock,
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock3,
  Stethoscope,
  Send,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const { appointments, doctors, patients, bookAppointment, updateAppointmentStatus } = useHospital();
  const navigate = useNavigate();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Booking Form State
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || '');
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const [appDate, setAppDate] = useState('2026-07-30');
  const [appTime, setAppTime] = useState('11:30 AM');
  const [appType, setAppType] = useState('Outpatient Consultation');

  const [simulatedSMSLog, setSimulatedSMSLog] = useState(null);

  const filteredAppointments = appointments.filter(a => {
    const matchesDoc = filterDoctor ? a.doctorId === filterDoctor : true;
    const matchesStatus = filterStatus ? a.status === filterStatus : true;
    return matchesDoc && matchesStatus;
  });

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    const patient = patients.find(p => p.id === selectedPatientId);
    const doctor = doctors.find(d => d.id === selectedDoctorId);

    const newApp = bookAppointment({
      patientId: patient.id,
      patientName: patient.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      department: doctor.department,
      date: appDate,
      time: appTime,
      type: appType,
      notes: 'Booked via Outpatient Portal'
    });

    setSimulatedSMSLog({
      recipient: patient.phone,
      message: `[Apex Health SMS] Your OP Appointment with ${doctor.name} is confirmed for ${appDate} at ${appTime}. Token: ${newApp.tokenNo}`
    });

    setShowBookingModal(false);
  };

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">OP Appointment System & Live Queue</h2>
          <p className="text-muted mb-0">Doctor scheduling, token queue management, and SMS/Email appointment confirmations</p>
        </div>
        <div className="mt-3 mt-md-0">
          <button className="btn btn-hms-primary" onClick={() => setShowBookingModal(true)}>
            <Calendar size={16} /> Book OP Appointment
          </button>
        </div>
      </div>

      {/* Live Token Queue Status Widget Banner */}
      <div className="hms-card p-3 mb-4 bg-gradient-hospital text-white">
        <div className="row align-items-center">
          <div className="col-md-4 border-end border-white-50">
            <small className="text-white-50 font-monospace fw-bold">NOW SERVING (CARDIOLOGY OPD)</small>
            <div className="d-flex align-items-center gap-3 mt-1">
              <span className="display-6 fw-bold text-warning font-monospace">TK-002</span>
              <div>
                <strong className="d-block">Priya Sundaram</strong>
                <small className="text-white-50">Dr. Alex Morgan • Room 302</small>
              </div>
            </div>
          </div>

          <div className="col-md-4 border-end border-white-50 mt-3 mt-md-0">
            <small className="text-white-50 font-monospace fw-bold">NEXT IN QUEUE</small>
            <div className="d-flex align-items-center gap-3 mt-1">
              <span className="fs-3 fw-bold font-monospace">TK-003</span>
              <div>
                <strong className="d-block">Amitabh Verma</strong>
                <small className="text-white-50">Estimated Wait: 12 Mins</small>
              </div>
            </div>
          </div>

          <div className="col-md-4 text-md-end mt-3 mt-md-0">
            <span className="badge bg-white text-primary fw-bold px-3 py-2 fs-6">
              Total Today Queue: {appointments.length} Patients
            </span>
          </div>
        </div>
      </div>

      {/* Simulated SMS Notification Alert */}
      {simulatedSMSLog && (
        <div className="alert alert-success alert-dismissible fade show d-flex align-items-center gap-2 mb-4" role="alert">
          <Send size={18} className="text-success" />
          <div>
            <strong>SMS Notification Triggered:</strong> Sent to <code>{simulatedSMSLog.recipient}</code> — "{simulatedSMSLog.message}"
          </div>
          <button type="button" className="btn-close" onClick={() => setSimulatedSMSLog(null)} />
        </div>
      )}

      {/* Filter Bar */}
      <div className="hms-card p-3 mb-4">
        <div className="row g-3">
          <div className="col-md-5">
            <select className="hms-form-select" value={filterDoctor} onChange={(e) => setFilterDoctor(e.target.value)}>
              <option value="">Filter by Doctor (All Doctors)</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.department})</option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select className="hms-form-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">Filter by Status (All Statuses)</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Waiting">Waiting</option>
              <option value="In Consultation">In Consultation</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="col-md-3 text-end text-muted d-flex align-items-center justify-content-end" style={{ fontSize: '0.88rem' }}>
            Total <strong>{filteredAppointments.length}</strong> Appointments
          </div>
        </div>
      </div>

      {/* Appointments List Table */}
      <div className="hms-card p-4">
        <div className="table-responsive">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Token #</th>
                <th>Patient Details</th>
                <th>Doctor & Dept</th>
                <th>Date & Time</th>
                <th>OP Type</th>
                <th>Status</th>
                <th>Manage Queue</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((app) => (
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
                      <div className="fw-semibold">{app.date}</div>
                      <small className="text-muted">{app.time}</small>
                    </td>
                    <td>
                      <span className="badge bg-secondary-subtle text-secondary fw-semibold">
                        {app.type}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-status badge-${app.status.toLowerCase().replace(' ', '-')}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                          Update Status
                        </button>
                        <ul className="dropdown-menu shadow">
                          <li>
                            <button className="dropdown-item" onClick={() => updateAppointmentStatus(app.id, 'In Consultation')}>
                              Start Consultation
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item text-success" onClick={() => updateAppointmentStatus(app.id, 'Completed')}>
                              Mark Completed
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item text-danger" onClick={() => updateAppointmentStatus(app.id, 'Cancelled')}>
                              Cancel Appointment
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">No appointments found matching filters</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showBookingModal && (
        <div className="hms-modal-backdrop" onClick={() => setShowBookingModal(false)}>
          <div className="hms-modal-content p-4" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <h5 className="fw-bold mb-3">Book New Outpatient (OP) Appointment</h5>

            <form onSubmit={handleCreateAppointment}>
              <div className="mb-3">
                <label className="hms-form-label">Select Patient *</label>
                <select className="hms-form-select" value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)} required>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id}) - {p.phone}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="hms-form-label">Select Doctor & Specialty *</label>
                <select className="hms-form-select" value={selectedDoctorId} onChange={(e) => setSelectedDoctorId(e.target.value)} required>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.department}) - Fee: ₹{d.fee}</option>
                  ))}
                </select>
              </div>

              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="hms-form-label">Appointment Date</label>
                  <input type="date" className="hms-form-input" value={appDate} onChange={(e) => setAppDate(e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label className="hms-form-label">Preferred Time Slot</label>
                  <select className="hms-form-select" value={appTime} onChange={(e) => setAppTime(e.target.value)}>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="hms-form-label">Consultation Type</label>
                <select className="hms-form-select" value={appType} onChange={(e) => setAppType(e.target.value)}>
                  <option value="Outpatient Consultation">Outpatient Consultation</option>
                  <option value="Follow-up Encounter">Follow-up Encounter</option>
                  <option value="Routine Health Checkup">Routine Health Checkup</option>
                  <option value="Diagnostic Review">Diagnostic Review</option>
                </select>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-hms-outline" onClick={() => setShowBookingModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-hms-primary">Confirm & Issue Token</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
