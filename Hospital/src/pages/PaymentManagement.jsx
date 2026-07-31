import React, { useState } from 'react';
import { useHospital } from '../context/HospitalContext';
import {
  CreditCard,
  Printer,
  Download,
  IndianRupee,
  Receipt,
  Search,
  CheckCircle2,
  Plus,
  Clock,
  ShieldCheck
} from 'lucide-react';

const PaymentManagement = () => {
  const { patients } = useHospital();

  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id || 'PAT-2026-1001');
  const [consultationFee, setConsultationFee] = useState(1200);
  const [labFee, setLabFee] = useState(750);
  const [pharmacyFee, setPharmacyFee] = useState(450);
  const [scanFee, setScanFee] = useState(1500);
  const [paymentMethod, setPaymentMethod] = useState('UPI / PhonePe / GPay');
  const [discountPercent, setDiscountPercent] = useState(5);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const subtotal = Number(consultationFee) + Number(labFee) + Number(pharmacyFee) + Number(scanFee);
  const discountAmount = (subtotal * Number(discountPercent)) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * 0.18; // 18% GST
  const grandTotal = taxableAmount + taxAmount;

  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-091', patientName: 'Rajesh Sharma', patientId: 'PAT-2026-1001', date: '2026-07-30', amount: '₹3,900.00', method: 'UPI / PhonePe', status: 'Paid' },
    { id: 'INV-2026-092', patientName: 'Priya Sundaram', patientId: 'PAT-2026-1002', date: '2026-07-29', amount: '₹2,450.00', method: 'Star Health Claim', status: 'Paid' },
    { id: 'INV-2026-093', patientName: 'Amitabh Verma', patientId: 'PAT-2026-1003', date: '2026-07-28', amount: '₹1,800.00', method: 'Cash', status: 'Pending' },
  ]);

  const handleGenerateInvoice = (e) => {
    e.preventDefault();
    const newInv = {
      id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      patientName: selectedPatient.name,
      patientId: selectedPatient.id,
      date: new Date().toISOString().split('T')[0],
      amount: `₹${grandTotal.toFixed(2)}`,
      method: paymentMethod,
      status: 'Paid'
    };
    setInvoices([newInv, ...invoices]);
    window.print();
  };

  return (
    <div className="container-fluid py-3">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1">Hospital Billing & Invoice Management</h2>
          <p className="text-muted mb-0">Patient OPD billing, GST itemized invoices, insurance claim receipts, and payment logs</p>
        </div>
        <div className="mt-3 mt-md-0">
          <button className="btn btn-hms-primary" onClick={() => window.print()}>
            <Printer size={16} /> Print Current Receipt
          </button>
        </div>
      </div>

      <div className="row g-4 mb-4">
        {/* Left Side: Invoice Generator */}
        <div className="col-lg-7">
          <div className="hms-card p-4 printable-area">
            <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
              <div>
                <span className="badge bg-primary text-white mb-1">APEX HEALTH BILLING</span>
                <h4 className="fw-bold mb-0 text-primary">Patient Service Tax Invoice</h4>
                <small className="text-muted">GSTIN: 29AAAAA0000A1Z5 • NABH Accredited</small>
              </div>
              <div className="text-end">
                <span className="font-monospace fw-bold fs-6 text-muted">INV-2026-094</span>
                <small className="text-muted d-block">Date: {new Date().toISOString().split('T')[0]}</small>
              </div>
            </div>

            <form onSubmit={handleGenerateInvoice}>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="hms-form-label">Select Patient *</label>
                  <select
                    className="hms-form-select fw-bold"
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                  >
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="hms-form-label">Payment Method</label>
                  <select
                    className="hms-form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="UPI / PhonePe / GPay">UPI / PhonePe / GPay</option>
                    <option value="Net Banking">Net Banking (NEFT/RTGS)</option>
                    <option value="Insurance Claim">Star / HDFC ERGO Direct Claim</option>
                    <option value="Credit / Debit Card">Credit / Debit Card</option>
                    <option value="Cash">Cash Payment</option>
                  </select>
                </div>
              </div>

              <h6 className="fw-bold text-primary mb-3">Itemized Medical Charges (₹)</h6>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="hms-form-label">Physician Consultation Fee (₹)</label>
                  <input
                    type="number"
                    className="hms-form-input"
                    value={consultationFee}
                    onChange={(e) => setConsultationFee(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="hms-form-label">Laboratory Diagnostic Tests (₹)</label>
                  <input
                    type="number"
                    className="hms-form-input"
                    value={labFee}
                    onChange={(e) => setLabFee(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="hms-form-label">Pharmacy Medications (₹)</label>
                  <input
                    type="number"
                    className="hms-form-input"
                    value={pharmacyFee}
                    onChange={(e) => setPharmacyFee(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="hms-form-label">Imaging & Scan Charges (₹)</label>
                  <input
                    type="number"
                    className="hms-form-input"
                    value={scanFee}
                    onChange={(e) => setScanFee(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 no-print">
                <button type="submit" className="btn btn-hms-primary px-4 py-2">
                  <Receipt size={18} /> Generate & Process Payment
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side: Invoice Summary & Receipt */}
        <div className="col-lg-5">
          <div className="hms-card p-4 bg-gradient-hospital text-white h-100 d-flex flex-column justify-content-between">
            <div>
              <span className="badge bg-white text-primary fw-bold mb-2">BILLING SUMMARY</span>
              <h4 className="fw-bold mb-3">{selectedPatient.name}</h4>
              <p className="text-white-50 mb-3" style={{ fontSize: '0.85rem' }}>
                Insurance: <strong>{selectedPatient.insuranceProvider}</strong> ({selectedPatient.policyNumber})
              </p>

              <div className="d-flex flex-column gap-2 mb-4" style={{ fontSize: '0.9rem' }}>
                <div className="d-flex justify-content-between border-bottom border-white-50 pb-2">
                  <span>Consultation Fee:</span>
                  <strong>₹{Number(consultationFee).toLocaleString('en-IN')}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom border-white-50 pb-2">
                  <span>Lab Diagnostics:</span>
                  <strong>₹{Number(labFee).toLocaleString('en-IN')}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom border-white-50 pb-2">
                  <span>Pharmacy Rx:</span>
                  <strong>₹{Number(pharmacyFee).toLocaleString('en-IN')}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom border-white-50 pb-2">
                  <span>Imaging / X-Ray:</span>
                  <strong>₹{Number(scanFee).toLocaleString('en-IN')}</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom border-white-50 pb-2 text-warning">
                  <span>Insurance Discount (5%):</span>
                  <strong>-₹{discountAmount.toFixed(2)}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom border-white-50 pb-2 text-white-50">
                  <span>GST (18%):</span>
                  <strong>+₹{taxAmount.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Total Display */}
            <div className="p-3 bg-white text-dark rounded-3 shadow-lg">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="fw-bold text-muted" style={{ fontSize: '0.85rem' }}>GRAND TOTAL DUE</span>
                <span className="badge bg-success text-white fw-bold">GST INCLUDED</span>
              </div>
              <div className="display-6 fw-bold text-primary">₹{grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              <small className="text-muted d-block mt-1">Payment Method: {paymentMethod}</small>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History Table */}
      <div className="hms-card p-4">
        <h5 className="fw-bold mb-3">Recent Issued Invoices</h5>
        <div className="table-responsive">
          <table className="hms-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Patient Details</th>
                <th>Issue Date</th>
                <th>Amount (₹)</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td>
                    <span className="font-monospace fw-bold text-primary bg-primary-subtle px-2 py-1 rounded">
                      {inv.id}
                    </span>
                  </td>
                  <td>
                    <div className="fw-bold">{inv.patientName}</div>
                    <small className="text-muted">{inv.patientId}</small>
                  </td>
                  <td>
                    <small className="text-muted font-monospace">{inv.date}</small>
                  </td>
                  <td>
                    <strong className="text-primary">{inv.amount}</strong>
                  </td>
                  <td>
                    <span className="badge bg-secondary-subtle text-secondary">{inv.method}</span>
                  </td>
                  <td>
                    <span className={`badge-status ${inv.status === 'Paid' ? 'badge-completed' : 'badge-waiting'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => window.print()}>
                      <Printer size={15} /> Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
