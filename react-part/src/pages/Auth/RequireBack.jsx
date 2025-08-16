import React from 'react'
import { Outlet } from 'react-router-dom';
import Cookies from "universal-cookie"
import { useEffect } from 'react';


function RequireBack() {
    const cookie =new Cookies()
    const token =cookie.get("Bearer")
   useEffect(() => {
    if (token) {
      window.history.back(); 
    }
  }, [token]);

  return !token && <Outlet /> ;
}

export default RequireBack
