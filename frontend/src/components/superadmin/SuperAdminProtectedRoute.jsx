import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const SuperAdminProtectedRoute = ({ children }) => {
    const { authUser } = useSelector(store => store.auth);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (authUser === null || authUser?.role !== 'admin') {
            navigate("/");
        }
    }, [authUser, navigate])
    
    return (
        <>{children}</>
    )
}

export default SuperAdminProtectedRoute;
