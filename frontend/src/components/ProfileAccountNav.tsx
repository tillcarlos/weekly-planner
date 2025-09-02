// src/components/ProfileAccountNav.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Settings, Users } from 'lucide-react';

export const ProfileAccountNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      path: '/profile'
    },
    {
      id: 'people',
      label: 'People',
      icon: Users,
      path: '/people'
    },
    {
      id: 'account',
      label: 'Account Settings',
      icon: Settings,
      path: '/account'
    }
  ];

  return (
    <div className="flex items-center space-x-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = isActive(tab.path);
        
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`
              inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
              ${active
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }
            `}
          >
            <Icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};