import React, { useEffect } from 'react';
import { Route, Navigate, useNavigate } from 'react-router-dom';

// function ProtectedRoute({ element, isAuthenticated }) {
//   return isAuthenticated ? element : <Navigate to="/login" replace/>;
// }

// export default ProtectedRoute;

function ProtectedRoute(props){
let Cmp=props.Cmp
const navigate = useNavigate();

useEffect(()=>{
  if (!localStorage.getItem('authToken'))
  navigate('/AdminSignin')
})
return localStorage.getItem('authToken') ? <Cmp /> : <Navigate to="/AdminSignin" />;
}

export default ProtectedRoute