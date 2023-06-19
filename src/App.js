import './App.css';
import NoPage from './pages/NoPage.tsx';
import Index from './pages/Index.tsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './customer/pages/Signup';
import Login from './customer/pages/Login';
import AdminSignUp from './admin/pages/SignUp';
import AdminLogin from './admin/pages/Login';
import Dashboard from './admin/pages/Dasboard';
import CustomerHome from './customer/pages/CustomerHome';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/file-server" element={<Index/>} />
        <Route index element={<Index/>} />
        <Route path="/customer/signup" element= {<Signup/>}/>
        <Route path="/customer/login" element={<Login/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/SignUp" element={<AdminSignUp/>}/>
        <Route path="/admin/Dashboard" element={<Dashboard/>}/>
        <Route path="/cusomer/CustomerHome" element={<CustomerHome/>}/>
        <Route path="*" element={<NoPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
