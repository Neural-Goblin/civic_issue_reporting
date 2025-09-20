// src/components/IssueReport.jsx
import React, { useState } from 'react';
import { Camera, MapPin, X, Upload, AlertCircle } from 'lucide-react';
import MapComponent from './MapComponent';
import { useIssues } from '../context/IssuesContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const IssueReport = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'medium',
    location: null,
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { addIssue } = useIssues();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setFormData({
        ...formData,
        image: file
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null
    });
    setImagePreview(null);
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      location: location
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.location) {
      setError('Please select a location on the map');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Convert image to base64 for storage
      let imageBase64 = null;
      if (formData.image) {
        imageBase64 = await convertImageToBase64(formData.image);
      }
      
      const newIssue = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        urgency: formData.urgency,
        location: formData.location,
        image: imageBase64,
        reportedBy: user?.name || 'Anonymous',
        userEmail: user?.email || '',
        userId: user?.id || null
      };
      
      addIssue(newIssue);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        urgency: 'medium',
        location: null,
        image: null
      });
      setImagePreview(null);
      
      alert('Issue reported successfully!');
      navigate('/user-dashboard');
      
    } catch (err) {
      setError('Failed to submit issue: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Report a Civic Issue</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
          <AlertCircle className="mr-2" size={20} />
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Issue Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Pothole on Main Road"
              value={formData.title}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.category}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Select a category</option>
              <option value="roads">Roads & Infrastructure</option>
              <option value="sanitation">Sanitation & Waste</option>
              <option value="water">Water Supply</option>
              <option value="electricity">Electricity Issues</option>
              <option value="parks">Parks & Public Spaces</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please provide detailed information about the issue..."
            value={formData.description}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Urgency Level
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="urgency"
                value="low"
                checked={formData.urgency === 'low'}
                onChange={handleChange}
                className="text-blue-600 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              <span className="ml-2">Low</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="urgency"
                value="medium"
                checked={formData.urgency === 'medium'}
                onChange={handleChange}
                className="text-blue-600 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              <span className="ml-2">Medium</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="urgency"
                value="high"
                checked={formData.urgency === 'high'}
                onChange={handleChange}
                className="text-blue-600 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              <span className="ml-2">High</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Photo
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="max-h-48 rounded-md" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 -mt-2 -mr-2"
                  disabled={isSubmitting}
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="space-y-1 text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="image-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input
                      id="image-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isSubmitting}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pinpoint Location on Map
          </label>
          <p className="text-sm text-gray-500 mb-2">Click on the map to mark the exact location of the issue</p>
          <MapComponent onLocationSelect={handleLocationSelect} />
          {formData.location && (
            <p className="mt-2 text-sm text-gray-600">
              Selected location: {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
            </p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            ) : (
              <Upload className="mr-2" size={20} />
            )}
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

// MAKE SURE THIS EXPORT STATEMENT IS AT THE END
export default IssueReport;