import {useState} from 'react';
import './Login.css';
import toast from 'react-hot-toast';


const Login = ({ onLogin, error: authError }) => {
    const [formData, setFormData] = useState({ 
        username: '',
        password: '' 
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const {email, password} = formData;

    const onChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
        //clear error for this field when user starts typing
        if(errors[e.target.name]){
            setErrors({...errors, [e.target.name]: ' '});
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
  }

  setErrors(newErrors);
  return { isValid: Object.keys(newErrors).length === 0, newErrors };
};


    const onSubmit = async (e) => {
  e.preventDefault();

  const { isValid, newErrors } = validateForm();
  if (!isValid) {
    toast.error(newErrors.email || newErrors.password || "Fix the form errors.");
    return;
  }

  try {
    setLoading(true);
    await onLogin(email, password);
    toast.success("Logged in!");
  } catch (err) {
    toast.error("Invalid email or password.");
  } finally {
    setLoading(false);
  }
};


    return (
    <div className="login-form">
      <h2>Welcome Back</h2>
      <p className="login-subtitle">Login to your account</p>

      {authError && <div className="error-message">{authError}</div>}

      <form onSubmit={onSubmit} noValidate>
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
            placeholder="Enter your password"
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;

