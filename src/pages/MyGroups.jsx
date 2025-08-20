import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { valueContext } from '../RootLayout/RootLayout';

const MyGroups = () => {
    const { user, loading } = useContext(valueContext);
    const [myGroups, setMyGroups] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://hobby-hub-server-kohl.vercel.app/hobbies?email=${user.email}`)
                .then(res => res.json())
                .then(data => setMyGroups(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this group?");
        if (!confirm) return;

        fetch(`https://hobby-hub-server-kohl.vercel.app/hobbies/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => {
                if (result.deletedCount > 0) {
                    alert("Group deleted successfully!");
                    setMyGroups(myGroups.filter(group => group._id !== id));
                }
            });
    };

    if (loading) return <div className="p-4 text-center">Loading...</div>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">My Created Groups</h2>
            {myGroups.length === 0 ? (
                <p>No groups created yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-4 border">Group Name</th>
                                <th className="py-2 px-4 border">Category</th>
                                <th className="py-2 px-4 border">Members</th>
                                <th className="py-2 px-4 border">Start Date</th>
                                <th className="py-2 px-4 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myGroups.map(group => (
                                <tr key={group._id} className="text-center">
                                    <td className="py-2 px-4 border">{group.groupName}</td>
                                    <td className="py-2 px-4 border">{group.hobbyCategory}</td>
                                    <td className="py-2 px-4 border">{group.maxMembers}</td>
                                    <td className="py-2 px-4 border">{group.startDate}</td>
                                    <td className="py-2 px-4 border space-x-2">
                                        <Link to={`/updateGroup/${group._id}`}>
                                            <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                                                Update
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(group._id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyGroups;
