import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import './Header.css';
import toast from 'react-hot-toast';


const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-title">
          <h1>Bog, Blog, Blawg... idk we post stuff i guess</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
         
          {user ? (
            <>
              <span className="user-welcome">Hello, {user.name || 'User'}</span>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Header;