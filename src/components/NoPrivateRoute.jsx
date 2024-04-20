import { Outlet, Navigate } from 'react-router-dom';
import React, {useContext} from 'react'
import UserContext from '../../context/UserContext'

export default function NoPrivateRoute() {
    const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to='/' />;
}