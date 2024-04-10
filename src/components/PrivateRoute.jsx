import { Outlet, Navigate } from 'react-router-dom';
import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'

export default function PrivateRoute() {
    const {currentUser} = useContext(UserContext);
  return currentUser ? <Outlet /> : <Navigate to='/' />;
}