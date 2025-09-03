import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MainNav } from '../components/MainNav';
import { User, Mail, Shield, Calendar } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <div className="text-gray-300">
            <div className="text-xl">Account Settings</div>
            <div className="text-lg">Manage your profile and preferences</div>
          </div>
        </div>

        <div className="space-y-6">
          {/* User Info */}
          <div className="bg-gray-950 border border-gray-900 p-4">
            <h2 className="text-base font-bold text-white mb-4">Account Information</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-cyan-400 mr-3" />
                <div>
                  <span className="text-sm text-gray-400">Email</span>
                  <p className="text-base text-white">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <User className="h-4 w-4 text-orange-400 mr-3" />
                <div>
                  <span className="text-sm text-gray-400">Username</span>
                  <p className="text-base text-white">{user.username}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-400 mr-3" />
                <div>
                  <span className="text-sm text-gray-400">Role</span>
                  <p className="text-base text-white">{user.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-gray-950 border border-gray-900 p-4">
            <h2 className="text-base font-bold text-white mb-4">Preferences</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Default view</span>
                <span className="text-cyan-400 font-medium">Weekly</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Timezone</span>
                <span className="text-white">UTC-8 (PST)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Daily checkout reminder</span>
                <span className="text-green-400 font-medium">Enabled</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-950 border border-gray-900 p-4">
            <h2 className="text-base font-bold text-white mb-4">Your Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Goals This Week</span>
                <span className="text-yellow-400 font-medium">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Tasks Completed</span>
                <span className="text-lime-400 font-medium">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Checkout Streak</span>
                <span className="text-green-400 font-medium">3 days</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-gray-950 border border-gray-900 p-4">
            <h2 className="text-base font-bold text-white mb-4">Actions</h2>
            <div className="flex items-center space-x-4">
              <button 
                onClick={logout}
                className="text-red-400 hover:text-red-300 text-sm font-medium transition"
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