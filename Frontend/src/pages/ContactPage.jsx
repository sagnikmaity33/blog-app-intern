import { useState } from "react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="display-4">Contact Us</h1>
        <p className="lead">We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <h4>Send Us a Message</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input type="text" className="form-control" id="subject" value={formData.subject} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
