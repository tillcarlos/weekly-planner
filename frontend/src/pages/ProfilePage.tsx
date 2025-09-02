import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <User className="h-8 w-8 text-gray-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-gray-900">{user.email}</span>
            </div>
            
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            
            <div>
              <strong>Role:</strong> {user.role}
            </div>
            
            <div className="pt-6">
              <button 
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};