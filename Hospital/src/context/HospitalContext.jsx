import React, { createContext, useContext, useState, useEffect } from 'react';

const HospitalContext = createContext();

// Sample Initial Seed Data with Indian Phone Numbers (+91) & Rupees (₹)
const initialPatients = [
  {
    id: 'PAT-2026-1001',
    name: 'Rajesh Sharma',
    age: 42,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+91 98765 43210',
    email: 'rajesh.sharma@example.com',
    address: '42 MG Road, Indiranagar, Bengaluru, Karnataka',
    emergencyContact: 'Sunita Sharma (+91 98765 43211)',
    allergies: 'Penicillin, Shellfish',
    chronicConditions: 'Mild Hypertension',
    insuranceProvider: 'Star Health Insurance',
    policyNumber: 'SH-8839201',
    registeredDate: '2026-01-15'
  },
  {
    id: 'PAT-2026-1002',
    name: 'Priya Sundaram',
    age: 31,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '+91 98123 45678',
    email: 'priya.sundaram@example.com',
    address: '104 Anna Salai, T. Nagar, Chennai, Tamil Nadu',
    emergencyContact: 'Karthik Sundaram (+91 98123 45679)',
    allergies: 'None',
    chronicConditions: 'Asthma',
    insuranceProvider: 'HDFC ERGO Health',
    policyNumber: 'HE-4421098',
    registeredDate: '2026-02-10'
  },
  {
    id: 'PAT-2026-1003',
    name: 'Amitabh Verma',
    age: 58,
    gender: 'Male',
    bloodGroup: 'B-',
    phone: '+91 94567 89012',
    email: 'amitabh.verma@example.com',
    address: '88 Tech Park, Cyber City, Gurugram, Haryana',
    emergencyContact: 'Meena Verma (+91 94567 89013)',
    allergies: 'Sulfa Drugs',
    chronicConditions: 'Type 2 Diabetes',
    insuranceProvider: 'ICICI Lombard Care',
    policyNumber: 'IL-9920144',
    registeredDate: '2026-03-04'
  },
  {
    id: 'PAT-2026-1004',
    name: 'Ananya Deshmukh',
    age: 27,
    gender: 'Female',
    bloodGroup: 'AB+',
    phone: '+91 97110 22334',
    email: 'ananya.d@example.com',
    address: '512 Marine Drive, Fort, Mumbai, Maharashtra',
    emergencyContact: 'Rohan Deshmukh (+91 97110 22335)',
    allergies: 'Latex',
    chronicConditions: 'Migraine',
    insuranceProvider: 'Max Bupa Health',
    policyNumber: 'MB-1123987',
    registeredDate: '2026-04-18'
  }
];

const initialDoctors = [
  {
    id: 'DOC-101',
    name: 'Dr. Alex Morgan',
    department: 'Cardiology',
    qualification: 'MD, DM (Cardiology)',
    experience: '15 Years',
    email: 'dr.morgan@hospital.org',
    phone: '+91 98100 11001',
    fee: 1200,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timing: '09:00 AM - 05:00 PM',
    roomNo: 'Cardio OPD - Room 302',
    status: 'Active'
  },
  {
    id: 'DOC-102',
    name: 'Dr. Elena Rostova',
    department: 'Neurology',
    qualification: 'MD, MCh (Neuro)',
    experience: '12 Years',
    email: 'dr.rostova@hospital.org',
    phone: '+91 98100 11002',
    fee: 1500,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu'],
    timing: '10:00 AM - 04:00 PM',
    roomNo: 'Neuro OPD - Room 405',
    status: 'Active'
  },
  {
    id: 'DOC-103',
    name: 'Dr. Marcus Vance',
    department: 'Orthopedics',
    qualification: 'MS (Orthopedics)',
    experience: '10 Years',
    email: 'dr.vance@hospital.org',
    phone: '+91 98100 11003',
    fee: 1100,
    availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timing: '08:00 AM - 02:00 PM',
    roomNo: 'Ortho OPD - Room 201',
    status: 'Active'
  },
  {
    id: 'DOC-104',
    name: 'Dr. Priya Sharma',
    department: 'Pediatrics',
    qualification: 'MD (Pediatrics)',
    experience: '8 Years',
    email: 'dr.sharma@hospital.org',
    phone: '+91 98100 11004',
    fee: 900,
    availableDays: ['Mon', 'Wed', 'Fri', 'Sat'],
    timing: '09:00 AM - 03:00 PM',
    roomNo: 'Pedia OPD - Room 108',
    status: 'Active'
  }
];

const initialAppointments = [
  {
    id: 'APP-301',
    patientId: 'PAT-2026-1001',
    patientName: 'Rajesh Sharma',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Alex Morgan',
    department: 'Cardiology',
    date: '2026-07-30',
    time: '09:30 AM',
    tokenNo: 'TK-001',
    type: 'Routine Consultation',
    status: 'Completed',
    notes: 'Patient responded well to preliminary medication.'
  },
  {
    id: 'APP-302',
    patientId: 'PAT-2026-1002',
    patientName: 'Priya Sundaram',
    doctorId: 'DOC-101',
    doctorName: 'Dr. Alex Morgan',
    department: 'Cardiology',
    date: '2026-07-30',
    time: '10:30 AM',
    tokenNo: 'TK-002',
    type: 'Follow-up',
    status: 'In Consultation',
    notes: 'Reviewing recent ECG & Lipid panel.'
  },
  {
    id: 'APP-303',
    patientId: 'PAT-2026-1003',
    patientName: 'Amitabh Verma',
    doctorId: 'DOC-102',
    doctorName: 'Dr. Elena Rostova',
    department: 'Neurology',
    date: '2026-07-30',
    time: '11:15 AM',
    tokenNo: 'TK-003',
    type: 'First Visit',
    status: 'Waiting',
    notes: 'Severe chronic headaches.'
  },
  {
    id: 'APP-304',
    patientId: 'PAT-2026-1004',
    patientName: 'Ananya Deshmukh',
    doctorId: 'DOC-103',
    doctorName: 'Dr. Marcus Vance',
    department: 'Orthopedics',
    date: '2026-07-31',
    time: '02:00 PM',
    tokenNo: 'TK-004',
    type: 'Consultation',
    status: 'Scheduled',
    notes: 'Right knee joint pain.'
  }
];

const initialMedicalRecords = [
  {
    id: 'REC-801',
    patientId: 'PAT-2026-1001',
    date: '2026-07-28',
    doctorName: 'Dr. Alex Morgan',
    department: 'Cardiology',
    diagnosis: 'Essential Hypertension',
    vitals: { bp: '138/88 mmHg', hr: '74 bpm', temp: '98.6 °F', weight: '82 kg', spo2: '98%' },
    clinicalNotes: 'Patient complains of mild morning dizziness and chest tightness. Heart sounds regular. No murmur.',
    prescriptions: [
      { name: 'Lisinopril', dosage: '10 mg', frequency: 'Once Daily (Morning)', duration: '30 Days' },
      { name: 'Aspirin', dosage: '81 mg', frequency: 'Once Daily (After Lunch)', duration: '30 Days' }
    ],
    labRequests: ['Lipid Profile', 'ECG 12-Lead'],
    reportFile: 'Cardiology_Initial_Evaluation.pdf'
  },
  {
    id: 'REC-802',
    patientId: 'PAT-2026-1002',
    date: '2026-07-25',
    doctorName: 'Dr. Elena Rostova',
    department: 'Neurology',
    diagnosis: 'Tension Type Headache',
    vitals: { bp: '120/80 mmHg', hr: '68 bpm', temp: '98.4 °F', weight: '62 kg', spo2: '99%' },
    clinicalNotes: 'Recurrent bilateral temporal tightness. Neurological examination completely intact. No focal deficits.',
    prescriptions: [
      { name: 'Ibuprofen', dosage: '400 mg', frequency: 'As needed for pain', duration: '7 Days' },
      { name: 'Magnesium Glycinate', dosage: '400 mg', frequency: 'At bedtime', duration: '60 Days' }
    ],
    labRequests: ['Brain MRI T2 Axial'],
    reportFile: 'Neurology_Consultation_Notes.pdf'
  }
];

const initialLabTests = [
  {
    id: 'LAB-501',
    patientId: 'PAT-2026-1001',
    patientName: 'Rajesh Sharma',
    testName: 'Complete Blood Count (CBC)',
    category: 'Hematology',
    requestedBy: 'Dr. Alex Morgan',
    requestDate: '2026-07-28',
    completedDate: '2026-07-29',
    status: 'Completed',
    results: {
      'Hemoglobin': '14.2 g/dL (Normal: 13.8 - 17.2)',
      'White Blood Cells (WBC)': '6.5 x10^3/uL (Normal: 4.5 - 11.0)',
      'Platelet Count': '240 x10^3/uL (Normal: 150 - 450)',
      'RBC Count': '4.8 M/uL (Normal: 4.7 - 6.1)'
    },
    reportFile: 'CBC_Report_PAT1001.pdf',
    notified: true
  },
  {
    id: 'LAB-502',
    patientId: 'PAT-2026-1002',
    patientName: 'Priya Sundaram',
    testName: 'Lipid Profile',
    category: 'Biochemistry',
    requestedBy: 'Dr. Alex Morgan',
    requestDate: '2026-07-29',
    completedDate: '2026-07-30',
    status: 'Completed',
    results: {
      'Total Cholesterol': '210 mg/dL (High: >200)',
      'HDL Cholesterol': '52 mg/dL (Normal: >50)',
      'LDL Cholesterol': '135 mg/dL (Desirable: <100)',
      'Triglycerides': '145 mg/dL (Normal: <150)'
    },
    reportFile: 'Lipid_Profile_PAT1002.pdf',
    notified: true
  },
  {
    id: 'LAB-503',
    patientId: 'PAT-2026-1003',
    patientName: 'Amitabh Verma',
    testName: 'HbA1c & Fasting Blood Glucose',
    category: 'Endocrinology',
    requestedBy: 'Dr. Elena Rostova',
    requestDate: '2026-07-30',
    completedDate: null,
    status: 'Pending',
    results: null,
    reportFile: null,
    notified: false
  }
];

const initialImagingScans = [
  {
    id: 'IMG-701',
    patientId: 'PAT-2026-1001',
    patientName: 'Rajesh Sharma',
    modality: 'X-Ray',
    bodyPart: 'Chest PA View',
    scanDate: '2026-07-29',
    radiologist: 'Dr. H. Vance',
    status: 'Finalized',
    imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    findings: 'Both lung fields are clear. No focal consolidation or pleural effusion. Mediastinal contours and heart size are within normal limits.'
  },
  {
    id: 'IMG-702',
    patientId: 'PAT-2026-1002',
    patientName: 'Priya Sundaram',
    modality: 'MRI',
    bodyPart: 'Brain T2 & FLAIR',
    scanDate: '2026-07-25',
    radiologist: 'Dr. H. Vance',
    status: 'Finalized',
    imageUrl: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80',
    findings: 'Brain parenchymal signal intensity is unremarkable. Ventricles and sulci are within normal limits for age. No intracranial hemorrhage or mass effect.'
  },
  {
    id: 'IMG-703',
    patientId: 'PAT-2026-1004',
    patientName: 'Ananya Deshmukh',
    modality: 'CT Scan',
    bodyPart: 'Right Knee Joint 3D',
    scanDate: '2026-07-26',
    radiologist: 'Dr. H. Vance',
    status: 'Finalized',
    imageUrl: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1000&q=80',
    findings: 'Minor medial compartment joint space narrowing. No acute fracture or cortical disruption identified. Cruciate ligaments appear intact.'
  }
];

const initialAuditLogs = [
  { id: 'LOG-901', timestamp: '2026-07-30 09:00:12', user: 'Admin User', role: 'Admin', action: 'User Login', details: 'JWT token verified successfully from 192.168.1.45', status: 'Success' },
  { id: 'LOG-902', timestamp: '2026-07-30 09:32:44', user: 'Dr. Alex Morgan', role: 'Doctor', action: 'Access EMR Record', details: 'Opened patient medical profile PAT-2026-1001', status: 'Success' },
  { id: 'LOG-903', timestamp: '2026-07-30 10:14:02', user: 'Lab Tech Sam', role: 'Lab Tech', action: 'Upload Lab Report', details: 'Attached Lipid_Profile_PAT1002.pdf for LAB-502', status: 'Success' },
  { id: 'LOG-904', timestamp: '2026-07-30 10:45:19', user: 'Receptionist Mary', role: 'Receptionist', action: 'Book Appointment', details: 'Created OP Appointment APP-304 for Ananya Deshmukh', status: 'Success' }
];

const initialNotifications = [
  { id: 'NOTIF-1', title: 'Lab Report Ready', message: 'Lipid Profile report for Priya Sundaram (PAT-2026-1002) is ready.', time: '10 mins ago', type: 'lab', read: false },
  { id: 'NOTIF-2', title: 'OP Queue Alert', message: 'Token TK-002 is now serving in Cardiology OPD.', time: '25 mins ago', type: 'appointment', read: false },
  { id: 'NOTIF-3', title: 'Prescription Added', message: 'Dr. Alex Morgan prescribed Lisinopril 10mg for Rajesh Sharma.', time: '1 hour ago', type: 'prescription', read: true }
];

export const HospitalProvider = ({ children }) => {
  // Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('hms_user');
    return saved ? JSON.parse(saved) : {
      id: 'USR-ADMIN',
      name: 'Dr. Arthur Pendelton',
      email: 'admin@hospital.org',
      role: 'Admin', // Roles: Admin, Doctor, Receptionist, Lab Technician, Patient
      avatar: 'AP',
      patientId: 'PAT-2026-1001' // For patient role preview
    };
  });

  const [jwtToken, setJwtToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBRE1JTiIsImV4cCI6MTc4NTM2NDAwMH0.hms_secure_token');
  const [privacyMode, setPrivacyMode] = useState(false); // HIPAA / GDPR mask sensitive fields
  const [language, setLanguage] = useState('en'); // 'en', 'es', 'fr'

  // Domain Data State
  const [patients, setPatients] = useState(initialPatients);
  const [doctors, setDoctors] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [medicalRecords, setMedicalRecords] = useState(initialMedicalRecords);
  const [labTests, setLabTests] = useState(initialLabTests);
  const [imagingScans, setImagingScans] = useState(initialImagingScans);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    localStorage.setItem('hms_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Auth Operations
  const loginUser = (email, password, selectedRole = 'Admin') => {
    const roleNames = {
      'Admin': 'Dr. Arthur Pendelton (Chief Administrator)',
      'Doctor': 'Dr. Alex Morgan (Senior Cardiologist)',
      'Receptionist': 'Mary Watson (Front Desk Specialist)',
      'Lab Technician': 'Sam Rivera (Chief Lab Technologist)',
      'Patient': 'Rajesh Sharma (Patient Portal User)'
    };

    const newUser = {
      id: `USR-${selectedRole.toUpperCase()}`,
      name: roleNames[selectedRole] || 'Hospital User',
      email: email || `${selectedRole.toLowerCase()}@hospital.org`,
      role: selectedRole,
      avatar: selectedRole.substring(0, 2).toUpperCase(),
      patientId: 'PAT-2026-1001'
    };

    setCurrentUser(newUser);
    const mockToken = `eyJhbGciOiJIUzI1NiJ9.${btoa(JSON.stringify({ user: newUser.id, role: selectedRole }))}.sig`;
    setJwtToken(mockToken);

    logAuditAction(newUser.name, selectedRole, 'User Login', `Logged in as ${selectedRole} with JWT authentication`);
    addNotification('Security Alert', `Logged in as ${selectedRole}`, 'system');
  };

  const switchRole = (newRole) => {
    loginUser('', '', newRole);
  };

  const logoutUser = () => {
    logAuditAction(currentUser.name, currentUser.role, 'User Logout', 'Ended user session');
    setCurrentUser(null);
    setJwtToken(null);
  };

  // Audit Log Helper
  const logAuditAction = (user, role, action, details) => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: user || currentUser?.name || 'System',
      role: role || currentUser?.role || 'System',
      action,
      details,
      status: 'Success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Notification Helper
  const addNotification = (title, message, type = 'system') => {
    const newNotif = {
      id: `NOTIF-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type,
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Patient Management Operations
  const registerPatient = (patientData) => {
    const newId = `PAT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPatient = {
      id: newId,
      ...patientData,
      registeredDate: new Date().toISOString().split('T')[0]
    };
    setPatients(prev => [newPatient, ...prev]);
    logAuditAction(currentUser.name, currentUser.role, 'Register Patient', `Registered new patient ${newPatient.name} (${newId})`);
    addNotification('Patient Registered', `Patient ${newPatient.name} registered with ID ${newId}`, 'system');
    return newPatient;
  };

  // Appointment Operations
  const bookAppointment = (appData) => {
    const tokenNum = `TK-00${appointments.length + 1}`;
    const newApp = {
      id: `APP-${Math.floor(300 + Math.random() * 700)}`,
      tokenNo: tokenNum,
      status: 'Scheduled',
      ...appData
    };
    setAppointments(prev => [newApp, ...prev]);
    logAuditAction(currentUser.name, currentUser.role, 'Book Appointment', `Scheduled OP Appointment ${newApp.id} for ${newApp.patientName}`);
    addNotification('Appointment Booked', `Appointment confirmed for ${newApp.patientName} with ${newApp.doctorName}`, 'appointment');
    return newApp;
  };

  const updateAppointmentStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    logAuditAction(currentUser.name, currentUser.role, 'Update Appointment', `Changed appointment ${id} status to ${newStatus}`);
  };

  // Doctor EMR & Prescription Operations
  const addMedicalRecord = (recordData) => {
    const newRec = {
      id: `REC-${Math.floor(800 + Math.random() * 200)}`,
      date: new Date().toISOString().split('T')[0],
      ...recordData
    };
    setMedicalRecords(prev => [newRec, ...prev]);
    logAuditAction(currentUser.name, currentUser.role, 'Add EMR Record', `Added clinical diagnosis & prescription for Patient ${newRec.patientId}`);
    addNotification('New EMR Entry', `Prescription & Notes added for Patient ${newRec.patientId}`, 'prescription');
    return newRec;
  };

  // Laboratory Operations
  const updateLabTest = (labId, updatedData) => {
    setLabTests(prev => prev.map(lab => lab.id === labId ? { ...lab, ...updatedData } : lab));
    logAuditAction(currentUser.name, currentUser.role, 'Update Lab Report', `Updated lab report for test ${labId}`);
    addNotification('Lab Report Updated', `Lab report ready for test ${labId}`, 'lab');
  };

  const addLabTest = (testData) => {
    const newTest = {
      id: `LAB-${Math.floor(500 + Math.random() * 500)}`,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      results: null,
      reportFile: null,
      notified: false,
      ...testData
    };
    setLabTests(prev => [newTest, ...prev]);
    logAuditAction(currentUser.name, currentUser.role, 'Request Lab Test', `Requested test ${newTest.testName} for ${newTest.patientName}`);
    addNotification('Lab Test Ordered', `Lab test ${newTest.testName} ordered for ${newTest.patientName}`, 'lab');
  };

  // Imaging Operations
  const addImagingScan = (scanData) => {
    const newScan = {
      id: `IMG-${Math.floor(700 + Math.random() * 300)}`,
      scanDate: new Date().toISOString().split('T')[0],
      status: 'Finalized',
      ...scanData
    };
    setImagingScans(prev => [newScan, ...prev]);
    logAuditAction(currentUser.name, currentUser.role, 'Upload Imaging Scan', `Uploaded ${newScan.modality} scan for ${newScan.patientName}`);
    addNotification('Medical Imaging Added', `New ${newScan.modality} uploaded for ${newScan.patientName}`, 'system');
  };

  // System Backup & Restore
  const exportSystemData = () => {
    const fullState = {
      patients,
      doctors,
      appointments,
      medicalRecords,
      labTests,
      imagingScans,
      auditLogs,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(fullState, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HMS_Database_Backup_${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    logAuditAction(currentUser.name, currentUser.role, 'Backup Database', 'Exported full JSON system backup');
  };

  const importSystemData = (jsonData) => {
    try {
      if (jsonData.patients) setPatients(jsonData.patients);
      if (jsonData.doctors) setDoctors(jsonData.doctors);
      if (jsonData.appointments) setAppointments(jsonData.appointments);
      if (jsonData.medicalRecords) setMedicalRecords(jsonData.medicalRecords);
      if (jsonData.labTests) setLabTests(jsonData.labTests);
      if (jsonData.imagingScans) setImagingScans(jsonData.imagingScans);
      logAuditAction(currentUser.name, currentUser.role, 'Restore Database', 'Restored system database from JSON file');
      addNotification('Database Restored', 'System data successfully imported from backup file', 'system');
      return true;
    } catch (e) {
      console.error('Import error:', e);
      return false;
    }
  };

  return (
    <HospitalContext.Provider value={{
      currentUser,
      jwtToken,
      privacyMode,
      setPrivacyMode,
      language,
      setLanguage,
      patients,
      doctors,
      appointments,
      medicalRecords,
      labTests,
      imagingScans,
      auditLogs,
      notifications,
      loginUser,
      switchRole,
      logoutUser,
      registerPatient,
      bookAppointment,
      updateAppointmentStatus,
      addMedicalRecord,
      addLabTest,
      updateLabTest,
      addImagingScan,
      exportSystemData,
      importSystemData,
      markNotificationAsRead,
      logAuditAction
    }}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => useContext(HospitalContext);
