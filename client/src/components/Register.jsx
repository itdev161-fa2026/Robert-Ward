import { useState } from 'react';
import './Register.css';
import toast from 'react-hot-toast';

const Register = ({ onRegister, error: authError }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

const validateForm = () => {
  const newErrors = {};

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    newErrors.email = "Email is invalid";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);

  //  return both validity + the errors that were built
  return { isValid: Object.keys(newErrors).length === 0, newErrors };
};


  const onSubmit = async (e) => {
  e.preventDefault();

 const isValid = validateForm();
if (!isValid) {
  toast.error("Fix the highlighted fields.");
  return;
}

  try {
  setLoading(true);

  const result = await onRegister(name, email, password);

  // this prevents success toast from firing.
  if (result && result.success === false) {
    toast.error(result.message || "Registration failed.");
    return;
  }

  toast.success("Account created successfully!");
} catch (err) {
  const msg =
    err?.response?.data?.errors?.[0]?.msg ||
    err?.response?.data?.msg ||
    "Registration failed. Please try again.";

  toast.error(msg);
} finally {
  setLoading(false);
}
};


  return (
    <div className="register-form">
      <h2>Create an Account</h2>
      <p className="register-subtitle">Join our blog community</p>

      {authError && <div className="error-message">{authError}</div>}

      <form onSubmit={onSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Enter your name"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your password (min 6 characters)"
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
