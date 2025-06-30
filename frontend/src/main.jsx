import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx';
import Registration from './components/Registration.jsx';
import Nav from './components/Nav.jsx';
import Sidebar from './components/Sidebar.jsx';
import Singleproject from './components/Singleproject.jsx';
import Accountsetting from './components/Accountsetting.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import VerifyEmail from './components/VerifyEmail.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/App" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
        <Route path="/" element={<Registration />} />
        <Route
          path="/home"
          element={
           
              <Home />
           
          }
        />
        <Route
          path="/nav"
          element={
            <ProtectedRoute>
              <Nav />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sidebar"
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/singleproject/:projectId"
          element={
            <ProtectedRoute>
              <Singleproject />
            </ProtectedRoute>
          }
        />

        <Route
          path="/accountsetting"
          element={
            <ProtectedRoute>
              <Accountsetting />
            </ProtectedRoute>
          }
        />



      </Routes>
    </BrowserRouter>
  </StrictMode>

)
