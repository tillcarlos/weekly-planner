import React from 'react';
import { Link } from 'react-router-dom';

export const MainNav: React.FC = () => {
  return (
    <nav className="h-8 bg-black border-b border-gray-800 px-4 flex items-center space-x-6">
      <Link 
        to="/" 
        className="text-cyan-400 hover:text-cyan-300 text-xs font-medium transition"
      >
        Home
      </Link>
      <Link 
        to="/daily" 
        className="text-cyan-400 hover:text-cyan-300 text-xs font-medium transition"
      >
        Daily
      </Link>
      <Link 
        to="/weekly" 
        className="text-cyan-400 hover:text-cyan-300 text-xs font-medium transition"
      >
        Weekly
      </Link>
      <Link 
        to="/me" 
        className="text-cyan-400 hover:text-cyan-300 text-xs font-medium transition"
      >
        My Week
      </Link>
      <Link 
        to="/profile" 
        className="text-cyan-400 hover:text-cyan-300 text-xs font-medium transition"
      >
        Profile
      </Link>
    </nav>
  );
};