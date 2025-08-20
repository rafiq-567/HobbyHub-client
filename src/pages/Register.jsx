import React, { useContext, useState, } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { valueContext } from '../RootLayout/RootLayout';
import { toast } from 'react-toastify';

const Register = () => {
    const { handleRegister, setUser } = useContext(valueContext)
    const [nameError, setNameError] = useState("")
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        setNameError(""); 
        setPasswordError(""); 
        setGeneralError(""); 

        const fullname = e.target.fullname.value;
        if (fullname.length < 5) {
            setNameError("name should be at least 5 character");
            toast.error("Name should be at least 5 characters.");
            return;
        } else {
            setNameError("")
        }
        const photoUrl = e.target.photoUrl.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmpassword = e.target.confirmpassword.value;

        if (password.length < 6) {
             setPasswordError('Password must be at least 6 characters long.');
            toast.error('Password must be at least 6 characters long.');
            return
        };
        if (password !== confirmpassword) {
            setPasswordError('Password and confirm password must be the same.');
             toast.error('Password and confirm password must be the same.');
            return
        };
        if (!/[a-z]/.test(password)) {
            setPasswordError("Password must contain at least one lowercase letter.");
              toast.error("Password must contain at least one lowercase letter.");
            return
        };
        if (!/[A-Z]/.test(password)) {
             setPasswordError("Password must contain at least one uppercase letter.");
            toast.error("Password must contain at least one uppercase letter.");
            return
        };
        if (!/\d/.test(password)) {
            setPasswordError("Password must contain at least one number.");
             toast.error("Password must contain at least one number.");
            return
        };
        if (!/[!@#$%^&*]/.test(password)) {
            setPasswordError("Password must contain at least one special character (!@#$%^&*).");
             toast.error("Password must contain at least one special character (!@#$%^&*).");
            return
        };


        handleRegister(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                updateProfile(user, {
                    displayName: fullname,
                    photoURL: photoUrl,
                }).then(() => {

                    auth.currentUser.reload().then(() => {
                        setUser(auth.currentUser);
                         toast.success("Registration successful and profile updated!");
                         navigate('/');
                    });
                }).catch((error) => {
                    console.error("Error updating profile: ", error);
                });
            })
            .catch((error) => {
                console.error("Registration error: ", error);
            });



    }


    return (
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800 bg-black mt-[100px] text-white mx-auto">
            <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Register</h1>
                <p className="text-sm dark:text-gray-600">Please register a new account</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="fullname" className="block mb-2 text-sm">Full Name</label>
                        <input type="text" name="fullname" id="fullname" placeholder="John Doe" required className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        {nameError && <p className='text-xs text-error'>{nameError}</p>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Photo URL:</label>
                        <input type="text" name="photoUrl" id="photoUrl" placeholder="Photo Url" required className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />

                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                        <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" required className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm">Password</label>

                        </div>
                        <input type="password" name="password" id="password" placeholder="*****" required className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label htmlFor="confirmpassword" className="text-sm">Confirm Password</label>

                        </div>
                        <input type="password" name="confirmpassword" id="confirmpassword" placeholder="*****" required className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                    </div>
                </div>
                <div className="space-y-2">
                    <div>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-gray-50">Register</button>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-600">Already have an account?
                        <NavLink to="/login" rel="noopener noreferrer" href="#" className="hover:underline text-violet-600">Login</NavLink>.
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;