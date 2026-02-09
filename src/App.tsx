import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import RegisterUser from './pages/RegisterUser'
import Login from './pages/Login'
import ResetPasswordRequest from './pages/ResetPasswordRequest'
import OTPVerification from './pages/OTPVerification'
import ConfirmPasswordReset from './pages/ConfirmPasswordReset'
import Dashboard from './pages/Dashboard'
import StartApplication from './pages/scholarship/StartApplication'
import EditApplication from './pages/scholarship/EditApplication'
import "./App.css"
import { Toaster } from 'sonner'
import NewSessionApplication from './pages/NewSessionApplication'
import EditSessionApplication from './pages/EditSessionApplication'
import Homepage from './pages/Homepage'
function App() {
  return (
    <React.Fragment>
      <Toaster richColors position="bottom-center" />
      <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Homepage/>}/>
        <Route path='/signup' index element={<RegisterUser/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/resetpassword' element={<ResetPasswordRequest/>}/>
        <Route path='/verify-otp' element={<OTPVerification/>}/>
        <Route path='/resetpassword/submit' element={<ConfirmPasswordReset/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/applications' element={<StartApplication/>}/>
        <Route path='/scholarship' element={<NewSessionApplication/>}/>
        <Route path='/scholarship/:id' element={<EditSessionApplication/>}/>
        <Route path='/applications/:id' element={<EditApplication/>}/>
      </Routes>
      </BrowserRouter>
      
    </React.Fragment>
  )
}

export default App
