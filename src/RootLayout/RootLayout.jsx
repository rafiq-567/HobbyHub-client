import React, { createContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import Footer from '../components/Footer/Footer';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { ToastContainer } from 'react-toastify'; 



export const valueContext = createContext();

const RootLayout = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    const handleLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); 
    };

    const handleGoogleLogin = () => {
        setLoading(true); 
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
            .finally(() => setLoading(false)); 
    };

    const handleRegister = (email, password) => {
        setLoading(true); 
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false)); 
    };

    const handleLogOut = () => {
        setLoading(true); 
        signOut(auth)
            .then(() => {
                
            })
            .catch((error) => {
                console.error("Logout error:", error);
            })
            .finally(() => setLoading(false)); 
    };

    const handleForgetPassword = (email) => {
        
        // sendPasswordResetEmail(auth, email)
        //     .then(() => {
        //         // Password reset email sent!
        //     })
        //     .catch((error) => {
        //         console.error("Forget password error:", error);
        //     });
    };

    const contextValues = {
        handleLogin,
        handleRegister,
        user,
        loading,
        handleLogOut,
        handleForgetPassword,
        setUser,
        handleGoogleLogin,
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); 
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div>
            <valueContext.Provider value={contextValues}>
                {loading && <LoadingSpinner />} 
               
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
                <ToastContainer /> 
            </valueContext.Provider>
        </div>
    );
};

export default RootLayout;