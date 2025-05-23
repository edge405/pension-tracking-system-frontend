import React from 'react';
import { Calendar, Clock, DollarSign, Bell, FileText, Shield, User, Users, UserPlus } from 'lucide-react';

export default function PensionTrackingCoverPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <Shield className="mr-2" />
            Senior Citizens Pension System
          </h1>
          <div className="flex space-x-3">
            <a href="/pensioner-login" className="bg-white text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center">
              <User className="mr-1" size={16} />
              Pensioner Login
            </a>
            <a href="/admin-login" className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center">
              <Users className="mr-1" size={16} />
              Admin Login
            </a>
            <a href="/register" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
              <UserPlus className="mr-1" size={16} />
              Register
            </a>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4 text-center shadow-xl relative overflow-hidden">
        {/* Background pattern with subtle grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }}></div>
        </div>

       <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full opacity-10 translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20 shadow-2xl">
            <div className="bg-blue-800/30 mx-auto w-24 h-1 mb-6 rounded-full"></div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                Senior Citizen's Information and Pension Tracking System
              </span>
            </h2>

            <div className="w-36 h-1 bg-blue-300/50 mx-auto mb-6 rounded-full"></div>

            <p className="text-blue-50 text-xl md:text-2xl font-light italic">
              A Comprehensive Solution for Senior Citizen Management
            </p>
            
            <div className="flex justify-center mt-8">
              <div className="bg-blue-600/30 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-300/20 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-blue-100">Secure • Reliable • Efficient</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with improved design */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 p-6 rounded-full mx-auto mb-6 w-24 h-24 flex items-center justify-center">
                <Calendar size={48} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">Track Your Pension Payouts</h3>
              <p className="text-gray-600 text-center mb-4">
                Stay informed about your scheduled pension payments as arranged by the administration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Payment Schedule</h3>
              <p className="text-gray-600">View upcoming payment dates and schedules at a glance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Payment Amounts</h3>
              <p className="text-gray-600">Check your pension payment amounts accurately.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Bell className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Notifications</h3>
              <p className="text-gray-600">Receive notifications about upcoming pension payouts.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="text-blue-600" size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Payment History</h3>
              <p className="text-gray-600">Access your complete pension payment history.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - with enhanced visuals */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Login to Your Account</h3>
              <p className="text-gray-600">Use your Senior Citizen ID and password to securely access the system.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">View Your Dashboard</h3>
              <p className="text-gray-600">Access your personalized dashboard</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Track Payouts</h3>
              <p className="text-gray-600">Check your scheduled payouts as arranged by the administration.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-8 mt-auto">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">&copy; 2025 Alimodian Senior Citizens Pension System</p>
          <p className="text-gray-500 mt-2">A secure platform for pension payout tracking</p>
        </div>
      </footer>
    </div>
  );
}