import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router'; // Correct hooks for route params and navigation
import axios from 'axios'; // For making API requests
import Swal from 'sweetalert2'; // For elegant toast notifications

const UpdateGroup = () => {
    const { id } = useParams(); // Get the group ID from the URL
    const navigate = useNavigate(); // For redirection after update

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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define handleChange at the top level of the component
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // useEffect to fetch existing group data when the component mounts or ID changes
    useEffect(() => {
        const fetchGroupData = async () => {
            try {
                // Ensure this URL matches your backend's GET /hobbies/:id endpoint
                const response = await axios.get(`https://hobby-hub-server-kohl.vercel.app/hobbies/${id}`);
                const groupData = response.data;

                // Format startDate to 'YYYY-MM-DD' for date input
                // Check if groupData exists and has startDate
                if (groupData && groupData.startDate) {
                    groupData.startDate = new Date(groupData.startDate).toISOString().split('T')[0];
                }

                setFormData(groupData);
            } catch (err) {
                console.error("Failed to fetch group data for update:", err);
                setError("Failed to load group data for editing. Please try again.");
                Swal.fire('Error', 'Failed to load group data for editing.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchGroupData();
    }, [id]); // Re-run effect if the ID changes

    // Handle form submission for updating
    const handleUpdateGroup = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!formData.groupName || !formData.hobbyCategory || !formData.description ||
            !formData.meetingLocation || !formData.startDate) {
            Swal.fire('Warning', 'Please fill in all required fields.', 'warning');
            return;
        }

        Swal.fire({
            title: 'Confirm Update?',
            text: "Are you sure you want to update this group?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Send PUT request to update the group
                    // Ensure this URL matches your backend's PUT /hobbies/:id endpoint
                    const response = await axios.put(`https://hobby-hub-server-kohl.vercel.app/hobbies/${id}`, formData);

                    if (response.data.matchedCount > 0 || response.data.acknowledged) { // MongoDB update success check
                        Swal.fire(
                            'Updated!',
                            'Your group has been updated successfully.',
                            'success'
                        );
                        // Redirect to the group details page or my groups page
                        navigate(`/group/${id}`);
                    } else {
                        // This might happen if no fields actually changed, or if ID is wrong
                        Swal.fire(
                            'Info',
                            'Group data is the same or could not be updated.',
                            'info'
                        );
                    }
                } catch (err) {
                    console.error("Error updating group:", err);
                    Swal.fire(
                        'Error!',
                        `Failed to update the group. ${err.response?.data?.message || err.message}`,
                        'error'
                    );
                }
            }
        });
    };

    if (loading) {
        return <div className="text-center mt-8 text-xl font-semibold">Loading group data...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-600 font-bold">{error}</div>;
    }

    // This case handles if the group is not found after loading
    if (!formData || Object.keys(formData).length === 0) {
        return <div className="text-center mt-8 text-red-600 font-bold">Group data could not be loaded.</div>;
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Hobby Group</h1>
                <form onSubmit={handleUpdateGroup} className="space-y-5">
                    {/* Group Name */}
                    <div>
                        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">Group Name:</label>
                        <input
                            type="text"
                            id="groupName"
                            name="groupName"
                            value={formData.groupName}
                            onChange={handleChange} // Correctly calling handleChange
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
                            onChange={handleChange} // Correctly calling handleChange
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
                            {/* Add more categories as needed */}
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
                            onChange={handleChange} // Correctly calling handleChange
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
                            onChange={handleChange} // Correctly calling handleChange
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
                            onChange={handleChange} // Correctly calling handleChange
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Start Date (Deadline) */}
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange} // Correctly calling handleChange
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
                            onChange={handleChange} // Correctly calling handleChange
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

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Update Group
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateGroup;