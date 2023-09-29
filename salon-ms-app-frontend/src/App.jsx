import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar'
import SignUp from './components/SignUp'
import Sidebar from './components/view/Sidebar'
import Dashboard from './components/view/components/dashboard'
import Inventory from './components/view/components/inventory'
import Staff from './components/view/components/Staff'


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/sidebar/*" element={<Sidebar />}>
          {/* Use index route for Dashboard */}
          <Route index element={<Dashboard />} />
          {/* Use separate route for Inventory */}
          <Route path="inventory" element={<Inventory />} />
          <Route path="staff" element={<Staff/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
