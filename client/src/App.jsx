import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import RegisterPage from './pages/RegisterPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import LoginPage from './pages/LoginPage';
import './App.css';
import { Toaster } from 'react-hot-toast';
//Toaster position adds toast notifications to the top center 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position = "top-center"/>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path = "/posts/create"
              element ={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
              />
              <Route
              path ="/posts/:id/edit"
              element = {
                <ProtectedRoute>
                  <EditPost/>
                </ProtectedRoute>
              }
              />
            
            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

