
import { Navigate, Outlet } from 'react-router-dom';
import './App.css'
import { Button } from "./components/ui/button";
import Home from './pages/Home/Home';
import { useUser } from '@clerk/clerk-react';
import Header from './components/header/Header'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Toaster } from 'sonner';


function App() {
 
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isSignedIn&& isLoaded) {
    return <Navigate to ={'/auth/sign-in'} />
  }
  

  
  return (
    <>
    <Header />
    <Outlet/>               
    <Toaster />
   </>
  )
}

export default App
