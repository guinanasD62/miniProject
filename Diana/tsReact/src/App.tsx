import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext'; // Ensure correct import path
import './styles.css';
import HomePage from './Home';
import ContactPage from './Pages/Contact';
import UseEffects from './UseEffect';
import Bank from './Daily/reduxx';
import LoginForm from './Daily/LoginForm';
import RegisterForm from './Daily/RegisterForm';
import ProtectedRoute from './auth/ProtectedRoute'; 
import LoanApplicationForm from './Pages/Loan';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/loan" element={<ProtectedRoute><LoanApplicationForm /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
          <Route path="/useeffect" element={<ProtectedRoute><UseEffects /></ProtectedRoute>} />
          <Route path="/bank" element={<ProtectedRoute><Bank /></ProtectedRoute>} />
          <Route path="/login" element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
