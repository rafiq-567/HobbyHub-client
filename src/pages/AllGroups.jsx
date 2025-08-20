import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllGroups = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch('https://hobby-hub-server-kohl.vercel.app/hobbies')
            .then(res => res.json())
            .then(data => setGroups(data));

    }, []);
    

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Hobby Groups</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map(group => (
                    <div key={group._id} className="border p-4 rounded-lg shadow">
                        <img src={group.imageURL} alt={group.groupName} className="w-full h-40 object-cover mb-2 rounded" />
                        <div className='flex justify-between my-2'>
                            <h2 className="text-lg font-semibold">{group.groupName}</h2>
                            <p><strong>Category:</strong> {group.hobbyCategory}</p>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <p><strong>Members:</strong> {group.maxMembers}</p>
                            <p><strong>By:</strong> {group.userName}</p>
                        </div>
                       <div className='flex justify-between'>
                         <p className='mt-2'><strong>Date:</strong> {group.startDate}</p>

                        <Link to={`/group/${group._id}`}>
                            <button className=" px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                See More
                            </button>
                        </Link>
                       </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllGroups;
