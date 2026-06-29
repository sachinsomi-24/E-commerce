import React, { useState, useEffect } from 'react';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [validFields, setValidFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    let isValid = false;

    switch (name) {
      case 'username':
        if (!value.trim()) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters';
        } else {
          isValid = true;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Invalid email format';
        } else {
          isValid = true;
        }
        break;

      case 'password':
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
        
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
          error = 'Password must include uppercase, lowercase, number, and special character';
        } else {
          isValid = true;
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        } else {
          isValid = true;
        }
        break;

      default:
        break;
    }

    return { error, isValid };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const { error, isValid } = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setValidFields(prev => ({ ...prev, [name]: isValid }));

    // Re-validate confirm password if password changes
    if (name === 'password') {
      const confirmVal = formData.confirmPassword;
      if (confirmVal) {
        const confirmResult = validateField('confirmPassword', confirmVal);
        setErrors(prev => ({ ...prev, confirmPassword: confirmResult.error }));
        setValidFields(prev => ({ ...prev, confirmPassword: confirmResult.isValid }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Final validation check for all fields
    const newErrors = {};
    const newValidFields = {};
    let isFormValid = true;

    Object.keys(formData).forEach(key => {
      const { error, isValid } = validateField(key, formData[key]);
      newErrors[key] = error;
      newValidFields[key] = isValid;
      if (!isValid) isFormValid = false;
    });

    setErrors(newErrors);
    setValidFields(newValidFields);

    if (isFormValid) {
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        console.log('Form Submitted Successfully:', formData);
      }, 1500);
    } else {
      setIsSubmitting(false);
    }
  };

  const renderInputField = (name, label, type = 'text', placeholder = '') => {
    const hasError = errors[name];
    const isValid = validFields[name];

    return (
      <div className={`form-group ${hasError ? 'has-error' : ''} ${isValid ? 'is-valid' : ''}`}>
        <label htmlFor={name}>{label}</label>
        <div className="input-wrapper">
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="form-input"
          />
          {isValid && <span className="success-icon">✓</span>}
        </div>
        {hasError && <p className="error-message">{hasError}</p>}
      </div>
    );
  };

  if (showSuccess) {
    return (
      <div className="signup-card success-view">
        <div className="success-content">
          <div className="check-badge">✓</div>
          <h2>Account Created!</h2>
          <p>Welcome to our community, {formData.username}. Your account has been successfully registered.</p>
          <button className="primary-button" onClick={() => window.location.reload()}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-card">
      <div className="signup-header">
        <h2>Create Account</h2>
        <p>Join us today and experience the best commerce platform.</p>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        {renderInputField('username', 'Username', 'text', 'johndoe')}
        {renderInputField('email', 'Email Address', 'email', 'john@example.com')}
        {renderInputField('password', 'Password', 'password', '••••••••')}
        {renderInputField('confirmPassword', 'Confirm Password', 'password', '••••••••')}

        <button 
          type="submit" 
          className={`submit-button ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
      <div className="signup-footer">
        <p>Already have an account? <a href="#">Log In</a></p>
      </div>
    </div>
  );
};

export default SignupForm;
