import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/navbar'
import Sidebar from './components/view/Sidebar'
import Dashboard from './components/view/components/dashboard'
import Inventory from './components/view/components/inventory'
import Staff from './components/view/components/Staff'
import Home from './components/clientside/home'
import AdminSignUp from './components/AdminSignup'
import AdminSignIn from './components/AdminSignin'
import ClientSignup from './components/clientside/ClientSignup'
import ClientSignin from './components/clientside/ClientSignin'
import ProtectedRoute from './components/ProtectedRoute'
import { Navigate } from 'react-router-dom'


function App() {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to="/sidebar/" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        <Route path="/" element={isAuthenticated ? <Navigate to="/sidebar/" /> : <Navbar />} />
        
        <Route path="/AdminSignup" element={isAuthenticated ? <Navigate to="/sidebar/" /> : <AdminSignUp />} />
        <Route path="/AdminSignin" element={isAuthenticated ? <Navigate to="/sidebar/" /> : <AdminSignIn />} />
        <Route path="/ClientSignup" element={isAuthenticated ? <Navigate to="/sidebar/" /> : <ClientSignup />} />
        <Route path="/ClientSignin" element={isAuthenticated ? <Navigate to="/sidebar/" /> : <ClientSignin />} />
        <Route path="/sidebar/*" element={<ProtectedRoute Cmp={Sidebar} />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="staff" element={<Staff/>} />
        </Route>

        {/* client Routings */}
        <Route path="/client" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
