import React from 'react';

const doctorsList = [
  { id: 1, name: 'Dr. Sarah Smith', dept: 'Cardiology', exp: '10 Years', avail: 'Mon - Fri', img: 'https://ui-avatars.com/api/?name=Sarah+Smith&background=0D6EFD&color=fff' },
  { id: 2, name: 'Dr. John Doe', dept: 'General Medicine', exp: '15 Years', avail: 'Mon - Sat', img: 'https://ui-avatars.com/api/?name=John+Doe&background=0D6EFD&color=fff' },
  { id: 3, name: 'Dr. Emily Chen', dept: 'Neurology', exp: '8 Years', avail: 'Tue - Sun', img: 'https://ui-avatars.com/api/?name=Emily+Chen&background=0D6EFD&color=fff' },
  { id: 4, name: 'Dr. Michael Brown', dept: 'Orthopedics', exp: '12 Years', avail: 'Mon - Wed, Fri', img: 'https://ui-avatars.com/api/?name=Michael+Brown&background=0D6EFD&color=fff' },
];

const Doctors = () => {
  return (
    <div className="container-fluid py-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Doctors Directory</h2>
        <div className="input-group" style={{maxWidth: '250px'}}>
          <input type="text" className="form-control" placeholder="Search doctor..." />
          <button className="btn btn-primary px-3"><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>

      <div className="row g-4">
        {doctorsList.map(doc => (
          <div className="col-md-6 col-lg-3" key={doc.id}>
            <div className="card border-0 text-center p-4 h-100 d-flex flex-column">
              <img src={doc.img} alt={doc.name} className="rounded-circle mx-auto mb-3 border border-3 border-light shadow-sm" style={{width: '90px', height: '90px', objectFit: 'cover'}} />
              <h5 className="fw-bold mb-1">{doc.name}</h5>
              <p className="text-primary fw-semibold small mb-4">{doc.dept}</p>
              
              <div className="d-flex justify-content-between text-muted small mb-4 px-2">
                <div className="text-center">
                  <div className="fw-bold text-dark fs-6">{doc.exp}</div>
                  <div>Experience</div>
                </div>
                <div className="text-center">
                  <div className="fw-bold text-dark fs-6"><i className="fa-solid fa-star text-warning"></i> 4.9</div>
                  <div>Rating</div>
                </div>
              </div>
              
              <div className="bg-light rounded p-2 mb-4 small text-dark fw-medium">
                <i className="fa-regular fa-clock text-primary me-2"></i> {doc.avail}
              </div>
              
              <button className="btn btn-outline-primary w-100 mt-auto fw-semibold">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
