import { useState } from 'react';
import './contactUs.css'; 

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    email: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name,
      phone: !formData.phone,
      email: !formData.email
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData); // Display form data in the console
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>
        We have a dedicated team available 24/7 to assist you. Please fill in
        the form below, and we will get back to you as soon as possible.
      </p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className={`form-field ${errors.name ? 'error' : ''}`}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error-message">This field is required</span>}
        </div>

        <div className={`form-field ${errors.phone ? 'error' : ''}`}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
          {errors.phone && <span className="error-message">This field is required</span>}
        </div>

        <div className={`form-field ${errors.email ? 'error' : ''}`}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
          />
          {errors.email && <span className="error-message">This field is required</span>}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
