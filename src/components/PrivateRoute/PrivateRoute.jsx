import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { valueContext } from '../../RootLayout/RootLayout';

const PrivateRoute = ({children}) => {
     const {user,loading} = useContext(valueContext)
    const location = useLocation()
    
    if(loading){
        return <div>loading....</div>
    }
    if(!user || !user?.email){
        return <Navigate state={{from:location.pathname}} to="/login"></Navigate>
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default PrivateRoute;