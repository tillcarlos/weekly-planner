import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Weekly Planner</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Weekly Planner</h2>
          <p className="text-gray-600 mb-6">
            Plan your week, set daily goals, and track your progress with our team planning tool.
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/daily" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Daily Overview
            </Link>
            
            <Link 
              to="/login" 
              className="inline-block ml-4 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Login
            </Link>
            
            <Link 
              to="/profile" 
              className="inline-block ml-4 bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};