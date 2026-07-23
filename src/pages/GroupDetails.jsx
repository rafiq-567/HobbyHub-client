import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { valueContext } from '../RootLayout/RootLayout';

const GroupDetails = () => {
    
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const { user } = useContext(valueContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await axios.get(`https://hobby-hub-server-kohl.vercel.app/hobbies/${id}`);
                setGroup(response.data);
            } catch (err) {
                setError('Failed to fetch group details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGroupDetails();
    }, [id]);

    const handleJoinGroup = async () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to join this group?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, join it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.post(`https://hobby-hub-server-kohl.vercel.app/hobbies/${id}/join`, {
                        userEmail: user?.email
                    });
                    Swal.fire(
                        'Joined!',
                        'You have successfully joined the group.',
                        'success'
                    );
                } catch (err) {
                    Swal.fire(
                        'Error!',
                        'Failed to join the group. Please try again.',
                        'error'
                    );
                    console.error(err);
                }
            }
        });
    };

    if (loading) {
        return <div className="text-center mt-8">Loading group details...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-600">{error}</div>;
    }

    if (!group) {
        return <div className="text-center mt-8">Group not found.</div>;
    }

    return (
        <div className="container mx-auto p-4 max-w-2xl bg-white shadow-md rounded-lg mt-8">
            <h1 className="text-3xl font-bold mb-4 text-center">{group.groupName}</h1>
            <div className="flex justify-center mb-6">
                <img src={group.imageURL || 'https://via.placeholder.com/400x200?text=No+Image'} alt={group.groupName} className="rounded-lg shadow-sm max-w-full h-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                <p><strong>Category:</strong> <span className="font-medium">{group.hobbyCategory}</span></p>
                <p><strong>Max Members:</strong> <span className="font-medium">{group.maxMembers}</span></p>
                <p><strong>Meeting Location:</strong> <span className="font-medium">{group.meetingLocation}</span></p>
                <p><strong>Start Date:</strong> <span className="font-medium">{new Date(group.startDate).toLocaleDateString()}</span></p>
                <p className="col-span-full"><strong>Created By:</strong> <span className="font-medium">{group.userName} ({group.userEmail})</span></p>
                <div className="col-span-full mt-4">
                    <p className="font-bold mb-2">Description:</p>
                    <p className="bg-gray-100 p-3 rounded-md leading-relaxed">{group.description}</p>
                </div>
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={handleJoinGroup}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Join Group
                </button>
            </div>
        </div>
    );
};

export default GroupDetails;