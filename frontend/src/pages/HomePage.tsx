import React from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from '../components/MainNav';
import { Calendar, Users, Target, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export const HomePage: React.FC = () => {
  const currentWeek = 'Sept 2-7, 2024';

  return (
    <div className="min-h-screen bg-black text-white">
      <MainNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Team Dashboard</h1>
          <div className="text-gray-300">
            <div className="text-xl">Current Week</div>
            <div className="text-lg">{currentWeek}</div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div>
            <h2 className="text-base font-bold text-white mb-4">Team Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-cyan-400 mr-2" />
                  <span className="text-sm text-gray-400">Team Members</span>
                </div>
                <p className="text-xl font-bold text-white">4</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-orange-400 mr-2" />
                  <span className="text-sm text-gray-400">Active Goals</span>
                </div>
                <p className="text-xl font-bold text-white">8</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-lime-400 mr-2" />
                  <span className="text-sm text-gray-400">Completed Goals</span>
                </div>
                <p className="text-xl font-bold text-white">4</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
                  <span className="text-sm text-gray-400">Week Progress</span>
                </div>
                <p className="text-xl font-bold text-white">67%</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-base font-bold text-white mb-4">Views</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Link 
                to="/weekly" 
                className="flex items-center justify-between p-4 border border-gray-800 hover:border-gray-700 transition"
              >
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-cyan-400 mr-3" />
                  <div>
                    <span className="text-base font-medium text-white">Weekly Overview</span>
                    <p className="text-sm text-gray-400">See all team goals & daily progress</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                to="/daily" 
                className="flex items-center justify-between p-4 border border-gray-800 hover:border-gray-700 transition"
              >
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-orange-400 mr-3" />
                  <div>
                    <span className="text-base font-medium text-white">Daily Overview</span>
                    <p className="text-sm text-gray-400">Today's team status and checkouts</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Today's Status */}
          <div>
            <h2 className="text-base font-bold text-white mb-4">Today's Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Checked Out</span>
                <span className="text-green-400 font-medium">3/4</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Missed Checkouts</span>
                <span className="text-red-400 font-medium">1</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Goals Completed Today</span>
                <span className="text-yellow-400 font-medium">2</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-base font-bold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-black font-bold text-xs mr-3">
                  T
                </div>
                <div className="flex-1">
                  <span className="text-sm text-white">Till completed </span>
                  <span className="text-sm text-yellow-400 font-medium">Ship user auth system</span>
                  <span className="text-xs text-gray-500 ml-2">2 hours ago</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center text-black font-bold text-xs mr-3">
                  A
                </div>
                <div className="flex-1">
                  <span className="text-sm text-white">Abel completed </span>
                  <span className="text-sm text-yellow-400 font-medium">Database optimization</span>
                  <span className="text-xs text-gray-500 ml-2">4 hours ago</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 bg-purple-400 rounded-full flex items-center justify-center text-black font-bold text-xs mr-3">
                  F
                </div>
                <div className="flex-1">
                  <span className="text-sm text-white">Fred completed </span>
                  <span className="text-sm text-yellow-400 font-medium">CI/CD pipeline</span>
                  <span className="text-xs text-gray-500 ml-2">Yesterday</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};