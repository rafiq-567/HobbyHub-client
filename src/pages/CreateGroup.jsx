
import React, { useContext, useState, useEffect } from 'react';

import { useNavigate } from 'react-router'; 
import { valueContext } from '../RootLayout/RootLayout'; 
import { toast } from 'react-toastify'; 

const CreateGroup = () => {
    const { user } = useContext(valueContext); 

    
    const [formData, setFormData] = useState({
        groupName: '',
        hobbyCategory: '',
        description: '',
        meetingLocation: '',
        maxMembers: 1, 
        startDate: '',
        imageURL: '',
        userName: '', 
        userEmail: '' 
    });


    const navigate = useNavigate(); 

    
    useEffect(() => {
        if (user) { 
            setFormData(prevData => ({
                ...prevData,
                userName: user.displayName || '', 
                userEmail: user.email || ''      
            }));
        } else {
            
            setFormData(prevData => ({
                ...prevData,
                userName: '',
                userEmail: ''
            }));
            // You might want to navigate to login if this is a protected route and user is null
            // navigate('/login');
        }
    }, [user]); // Dependency array: run this effect when 'user' object changes

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Show toast message (using react-toastify directly)
    const showToast = (message, type) => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        } else {
            toast(message); // Default toast
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => { 
        e.preventDefault();

        
        if (!formData.groupName || !formData.hobbyCategory || !formData.description ||
            !formData.meetingLocation || !formData.startDate || !formData.userName || !formData.userEmail) { 
            showToast("Please fill in all required fields, including user details.", "error");
            return;
        }

        
        const dataToSend = {
            ...formData,
            userName: user?.displayName || '', 
            userEmail: user?.email || ''      
        };

        console.log("Form Data Collected:", dataToSend);

        try {
            const res = await fetch('https://hobby-hub-server-kohl.vercel.app/hobbies', {
                method: "POST",
                headers: {
                    "Content-type": "application/json" 
                },
                body: JSON.stringify(dataToSend), 
            });

            if (!res.ok) {
               
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to create group');
            }

            const data = await res.json();
            console.log(data);
            showToast("Group created successfully!", "success");

            
            setFormData(prevData => ({
                groupName: '',
                hobbyCategory: '',
                description: '',
                meetingLocation: '',
                maxMembers: 1,
                startDate: '',
                imageURL: '',
                userName: prevData.userName, 
                userEmail: prevData.userEmail
            }));

            
        } catch (error) {
            console.error("Error creating group:", error);
            showToast(`Failed to create group: ${error.message}`, "error");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create New Hobby Group</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Group Name */}
                    <div>
                        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">Group Name:</label>
                        <input
                            type="text"
                            id="groupName"
                            name="groupName"
                            value={formData.groupName}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Hobby Category */}
                    <div>
                        <label htmlFor="hobbyCategory" className="block text-sm font-medium text-gray-700 mb-1">Hobby Category:</label>
                        <select
                            id="hobbyCategory"
                            name="hobbyCategory"
                            value={formData.hobbyCategory}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                            <option value="">Select a Category</option>
                            <option value="Drawing & Painting">Drawing & Painting</option>
                            <option value="Photography">Photography</option>
                            <option value="Video Gaming">Video Gaming</option>
                            <option value="Fishing">Fishing</option>
                            <option value="Running">Running</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Reading">Reading</option>
                            <option value="Writing">Writing</option>
                           
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    {/* Meeting Location */}
                    <div>
                        <label htmlFor="meetingLocation" className="block text-sm font-medium text-gray-700 mb-1">Meeting Location:</label>
                        <input
                            type="text"
                            id="meetingLocation"
                            name="meetingLocation"
                            value={formData.meetingLocation}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Max Members */}
                    <div>
                        <label htmlFor="maxMembers" className="block text-sm font-medium text-gray-700 mb-1">Max Members:</label>
                        <input
                            type="number"
                            id="maxMembers"
                            name="maxMembers"
                            min="1"
                            value={formData.maxMembers}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Start Date (Deadline) */}
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date (Deadline):</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="imageURL" className="block text-sm font-medium text-gray-700 mb-1">Image URL:</label>
                        <input
                            type="url"
                            id="imageURL"
                            name="imageURL"
                            value={formData.imageURL}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., https://example.com/group-image.jpg"
                        />
                    </div>

                    {/* User Name (Readonly) */}
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Your Name:</label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={formData.userName} 
                            readOnly
                            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* User Email (Readonly) */}
                    <div>
                        <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">Your Email:</label>
                        <input
                            type="email"
                            id="userEmail"
                            name="userEmail"
                            value={formData.userEmail} 
                            readOnly
                            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Create Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Create Group
                    </button>
                </form>
            </div>

           
            {/* {toast.show && (
                <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white z-50 transition-opacity duration-300 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} opacity-100`}>
                    {toast.message}
                </div>
            )} */}
        </div>
    );
};

export default CreateGroup;