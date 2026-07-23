import React, { useContext } from 'react';
import { valueContext } from '../RootLayout/RootLayout';

const MyProfile = () => {
    const { user } = useContext(valueContext);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
                <img
                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                    alt={user?.displayName || 'User'}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h1 className="text-2xl font-bold text-gray-800 mb-2">{user?.displayName || 'User'}</h1>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                <p className="text-sm text-gray-500">Member since: {user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
            </div>
        </div>
    );
};

export default MyProfile;
