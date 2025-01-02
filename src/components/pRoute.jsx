import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ chldrn }) => {
    const token = localStorage.getItem('token');

    if (!token) {
    console.log("nah");
    }
    return chldrn;

};