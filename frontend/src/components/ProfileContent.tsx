// src/components/ProfileContent.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Calendar, Shield, Eye, EyeOff, Settings, Key } from 'lucide-react';
import { Person } from '../types';

interface MyInfo {
  userId: string;
  username: string;
  email: string | null;
  role: string;
  joinedAt: string | null;
  createdAt: string | null;
  lastLogin: string;
}

interface SystemInfo {
  buildInfo: any;
  serverTime: string;
  environment: string;
}

export const ProfileContent: React.FC = () => {
  const { user } = useAuth();
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [hiddenPeople, setHiddenPeople] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [isRequestingReset, setIsRequestingReset] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    fetchMyInfo();
    fetchSystemInfo();
    fetchPeople();
    loadHiddenPeople();
  }, []);

  const fetchMyInfo = async () => {
    try {
      const response = await fetch('/api/v1/profile/my-info', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setMyInfo(data);
      }
    } catch (error) {
      console.error('Failed to fetch my info:', error);
    }
  };

  const fetchSystemInfo = async () => {
    try {
      const response = await fetch('/api/v1/profile/system-info', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setSystemInfo(data);
      }
    } catch (error) {
      console.error('Failed to fetch system info:', error);
    }
  };

  const fetchPeople = async () => {
    try {
      const response = await fetch('/api/v1/people', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setPeople(data.people || data);
      }
    } catch (error) {
      console.error('Failed to fetch people:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHiddenPeople = () => {
    try {
      const storedHidden = localStorage.getItem('StatsAware_ignoredPeople');
      if (storedHidden) {
        const personIds: string[] = JSON.parse(storedHidden);
        setHiddenPeople(new Set(personIds));
      }
    } catch (error) {
      console.warn('Error loading hidden people from localStorage:', error);
    }
  };

  const saveHiddenPeople = (hiddenSet: Set<string>) => {
    try {
      localStorage.setItem('StatsAware_ignoredPeople', JSON.stringify(Array.from(hiddenSet)));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('hiddenPeopleChanged'));
    } catch (error) {
      console.warn('Error saving hidden people to localStorage:', error);
    }
  };

  const togglePersonVisibility = (personId: string) => {
    setHiddenPeople(prev => {
      const newHidden = new Set(prev);
      if (newHidden.has(personId)) {
        newHidden.delete(personId);
      } else {
        newHidden.add(personId);
      }
      saveHiddenPeople(newHidden);
      return newHidden;
    });
  };

  const showAllPeople = () => {
    setHiddenPeople(new Set());
    saveHiddenPeople(new Set());
  };

  const hideAllPeople = () => {
    const allPersonIds = new Set(people.map(person => person.id));
    setHiddenPeople(allPersonIds);
    saveHiddenPeople(allPersonIds);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      case 'disabled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRequestPasswordReset = async () => {
    if (!user?.email) return;
    
    setIsRequestingReset(true);
    try {
      const response = await fetch('/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
        credentials: 'include',
      });

      const result = await response.json();
      
      if (result.success) {
        setResetPasswordMessage({
          type: 'success',
          text: 'Password reset link sent! Please check your email.'
        });
        setShowResetPasswordModal(false);
        // Auto-hide message after 5 seconds
        setTimeout(() => setResetPasswordMessage(null), 5000);
      } else {
        setResetPasswordMessage({
          type: 'error',
          text: result.message || 'Failed to send reset email. Please try again.'
        });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setResetPasswordMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsRequestingReset(false);
    }
  };

  // Separate visible and hidden people
  const visiblePeople = (people || []).filter(person => !hiddenPeople.has(person.id));
  const hiddenPeopleList = (people || []).filter(person => hiddenPeople.has(person.id));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Reset Password Message */}
      {resetPasswordMessage && (
        <div className={`rounded-md p-4 ${
          resetPasswordMessage.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${
              resetPasswordMessage.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}>
              {resetPasswordMessage.type === 'success' ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="ml-3 flex-1">
              <p className={`text-sm font-medium ${
                resetPasswordMessage.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {resetPasswordMessage.text}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setResetPasswordMessage(null)}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer ${
                  resetPasswordMessage.type === 'success' 
                    ? 'text-green-500 hover:bg-green-100 focus:ring-green-600' 
                    : 'text-red-500 hover:bg-red-100 focus:ring-red-600'
                }`}
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Information */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <User className="w-5 h-5 mr-2" />
              User Information
            </h2>
            <button
              onClick={() => setShowResetPasswordModal(true)}
              className="inline-flex items-center px-3 py-2 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors cursor-pointer"
            >
              <Key className="w-4 h-4 mr-2" />
              Reset Password
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-2xl">
                {(user?.email?.charAt(0) || 'U').toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center text-lg text-gray-900">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    {myInfo?.email || user?.email}
                  </div>
                </div>
                {myInfo && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                    <div className="flex items-center text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      {formatDate(myInfo.lastLogin)}
                    </div>
                  </div>
                )}
                {myInfo && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getRoleColor(myInfo.role)}`}>
                        <Shield className="w-3 h-3 mr-1" />
                        {myInfo.role}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                      <div className="flex items-center text-gray-900">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        {myInfo.createdAt ? formatDate(myInfo.createdAt) : 'Unknown'}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Visibility Settings */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <EyeOff className="w-5 h-5 mr-2" />
                Timeline Visibility
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Control which people are visible in your timeline view
              </p>
            </div>
            {people.length > 0 && (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={showAllPeople}
                  className="inline-flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Show All
                </button>
                <button 
                  onClick={hideAllPeople}
                  className="inline-flex items-center px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <EyeOff className="w-4 h-4 mr-1" />
                  Hide All
                </button>
              </div>
            )}
          </div>
        </div>

        {people.length === 0 ? (
          <div className="p-6 text-center">
            <EyeOff className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No people found</h3>
            <p className="text-gray-600">People will appear here when they're tracked through your integrations</p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600">{visiblePeople.length}</div>
                <div className="text-sm text-green-800">Visible in Timeline</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-2xl font-bold text-red-600">{hiddenPeopleList.length}</div>
                <div className="text-sm text-red-800">Hidden from Timeline</div>
              </div>
            </div>

            {/* Visible People */}
            {visiblePeople.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <Eye className="w-4 h-4 mr-2 text-green-600" />
                  Visible People ({visiblePeople.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {visiblePeople.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-medium text-sm">
                            {(person.name || person.email || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate max-w-32">
                            {person.name || person.email || 'Unknown'}
                          </div>
                          {person.isOnline && (
                            <div className="flex items-center text-xs text-green-600">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              Online
                            </div>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => togglePersonVisibility(person.id)}
                        className="p-1 text-green-600 hover:text-red-600 transition-colors cursor-pointer"
                        title="Hide from timeline"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hidden People */}
            {hiddenPeopleList.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <EyeOff className="w-4 h-4 mr-2 text-red-600" />
                  Hidden People ({hiddenPeopleList.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hiddenPeopleList.map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-600 font-medium text-sm">
                            {(person.name || person.email || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-700 truncate max-w-32">
                            {person.name || person.email || 'Unknown'}
                          </div>
                          <div className="text-xs text-red-600">
                            Hidden from timeline
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => togglePersonVisibility(person.id)}
                        className="p-1 text-red-600 hover:text-green-600 transition-colors cursor-pointer"
                        title="Show in timeline"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* System Information */}
      {systemInfo && (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              System Information
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                <div className="flex items-center text-gray-900">
                  {systemInfo.environment}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Server Time</label>
                <div className="flex items-center text-gray-900">
                  {formatDate(systemInfo.serverTime)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <Key className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Reset Password</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              We will send you a link with which you can reset your password. Continue?
            </p>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowResetPasswordModal(false)}
                disabled={isRequestingReset}
                className="px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestPasswordReset}
                disabled={isRequestingReset}
                className="px-4 py-2 text-sm bg-orange-600 text-white hover:bg-orange-700 rounded-md transition-colors disabled:opacity-50 flex items-center cursor-pointer"
              >
                {isRequestingReset ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};