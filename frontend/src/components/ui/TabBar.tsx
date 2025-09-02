import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: LucideIcon;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  variant?: 'pills' | 'underline';
  darkMode?: boolean;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  className = '',
  variant = 'pills',
  darkMode = false
}) => {
  const truncateLabel = (label: string) => {
    return label.length > 8 ? label.substring(0, 6) + '...' : label;
  };

  if (variant === 'underline') {
    return (
      <div className={`border-b ${darkMode ? 'border-gray-600' : 'border-gray-200'} ${className}`}>
        <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base transition-colors cursor-pointer whitespace-nowrap min-h-[44px] ${
                activeTab === tab.id
                  ? 'border-blue-300 text-blue-300'
                  : darkMode 
                    ? 'border-transparent text-white hover:text-gray-200 hover:border-gray-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="flex items-center">
                {tab.icon && <tab.icon className="w-4 h-4 mr-1 sm:mr-2" />}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{truncateLabel(tab.label)}</span>
                {typeof tab.count === 'number' && (
                  <span className={`ml-1 sm:ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? darkMode 
                        ? 'bg-blue-900/30 text-blue-400'
                        : 'bg-blue-100 text-blue-600'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count} 
                  </span>
                )}
              </span>
            </button>
          ))}
        </nav>
      </div>
    );
  }

  // Pills variant
  return (
    <div className={`flex items-center space-x-1 overflow-x-auto ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            inline-flex items-center px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[44px]
            ${activeTab === tab.id
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }
          `}
        >
          {tab.icon && <tab.icon className="w-4 h-4 mr-1 sm:mr-2" />}
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{truncateLabel(tab.label)}</span>
          {typeof tab.count === 'number' && (
            <span className={`ml-1 sm:ml-2 px-2 py-1 text-xs rounded-full ${
              activeTab === tab.id
                ? 'bg-blue-200 text-blue-800'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};