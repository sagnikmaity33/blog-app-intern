import React from 'react';

export default function AboutPage() {
  return (
    <div className="container my-5">
      
      <div className="text-center mb-5">
        <h1 className="display-4">About Us</h1>
        <p className="lead">
          Welcome to our Blogger Platform.<br />
          Here, your ideas take center stage,<br />
          and your voice echoes across the digital world.
        </p>
      </div>

      
      <div className="text-center mb-4">
        <h2>Our Team</h2>
      </div>

      <div className="row text-center">
       
        {[
          { name: "Soham Ghosh", image: "/Formal.jpeg" },
          { name: "Tejas Patil", image: "/WhatsApp Image 2025-05-11 at 10.42.57 PM.jpeg" },
          { name: "Yash Rathod", image: "/IMG-20250214-WA0013.jpg" }
        ].map((member, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card shadow-sm p-3">
              <div
                style={{
                  width: '150px',
                  height: '150px',
                  overflow: 'hidden',
                  margin: '0 auto',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'fill', 
                  }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="row mt-5">
        <div className="col text-center">
          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? Reach out to us at{' '}
            <a href="mailto:contact@bloggerapp.com">contact@bloggerapp.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}
