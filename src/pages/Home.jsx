// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Shield, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-primary-500 to-primary-700 text-white rounded-xl shadow-lg mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Report Civic Issues Across India</h1>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Help make your city cleaner, safer and better by reporting issues directly to authorities.
        </p>
        <Link 
          to="/auth" 
          className="bg-white text-primary-700 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-100 transition duration-300 inline-flex items-center"
        >
          <MapPin className="mr-2" size={20} />
          Report an Issue
        </Link>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-primary-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pinpoint Location</h3>
            <p className="text-gray-600">Use our interactive map to precisely mark the issue location.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community Reporting</h3>
            <p className="text-gray-600">Citizens across India can report issues in their localities.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-primary-600" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Admin Monitoring</h3>
            <p className="text-gray-600">Authorities can view and address all reported issues efficiently.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary-50 py-12 rounded-xl mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <TrendingUp className="text-primary-700 mr-2" size={24} />
              <div className="text-3xl font-bold text-primary-700">10,000+</div>
            </div>
            <div className="text-gray-600 mt-1">Issues Reported</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <MapPin className="text-primary-700 mr-2" size={24} />
              <div className="text-3xl font-bold text-primary-700">200+</div>
            </div>
            <div className="text-gray-600 mt-1">Cities Covered</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <CheckCircle className="text-primary-700 mr-2" size={24} />
              <div className="text-3xl font-bold text-primary-700">75%</div>
            </div>
            <div className="text-gray-600 mt-1">Issues Resolved</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <Clock className="text-primary-700 mr-2" size={24} />
              <div className="text-3xl font-bold text-primary-700">24h</div>
            </div>
            <div className="text-gray-600 mt-1">Avg. Response Time</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-6">Ready to make a difference?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/auth" 
            className="bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-primary-700 transition duration-300"
          >
            Report an Issue
          </Link>
          <Link 
            to="/admin-login" 
            className="border border-primary-600 text-primary-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-primary-50 transition duration-300"
          >
            Admin Login
          </Link>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Road Repair</h3>
                <p className="text-sm text-gray-500">Mumbai, Maharashtra</p>
              </div>
            </div>
            <p className="text-gray-600">Major pothole on SV Road was repaired within 48 hours of reporting.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Garbage Cleared</h3>
                <p className="text-sm text-gray-500">Bengaluru, Karnataka</p>
              </div>
            </div>
            <p className="text-gray-600">Garbage accumulation in Koramangala was cleared within 24 hours.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Street Lights Fixed</h3>
                <p className="text-sm text-gray-500">Delhi</p>
              </div>
            </div>
            <p className="text-gray-600">Non-functional street lights in South Delhi were repaired within 3 days.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;