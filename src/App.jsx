import React, { useState } from 'react';
import { useTheme } from './context/ThemeContext';
import { Button } from "@material-tailwind/react";
import { FaSun, FaMoon, FaUpload, FaLeaf } from 'react-icons/fa';

function App() {
  const { darkMode, toggleTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsLoading(true);
      
      // Here you would typically send the image to your model
      // For now, we'll simulate a response
      setTimeout(() => {
        setPrediction({
          disease: "Late Blight",
          confidence: "95%",
          description: "Late blight is a potentially devastating disease of potato and tomato, caused by the fungus-like organism Phytophthora infestans.",
          treatment: "Apply fungicide, remove infected plants, improve air circulation"
        });
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FaLeaf className="h-6 w-6 text-green-500" />
              <h1 className="text-2xl font-bold">Plant Disease Detection</h1>
            </div>
            <Button
              onClick={toggleTheme}
              className="rounded-full p-3 transition-all duration-300 hover:scale-110"
              color={darkMode ? "yellow" : "blue-gray"}
            >
              {darkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className={`p-8 rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800 shadow-gray-700/20' : 'bg-white'}`}>
            {/* Upload Section */}
            <div className="mb-8">
              <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200 
                ${darkMode 
                  ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50' 
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}>
                <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
                  <FaUpload className={`w-10 h-10 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <p className="mb-2 text-lg font-medium">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    PNG, JPG or JPEG (MAX. 800x400px)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            {/* Image Preview */}
            {selectedImage && (
              <div className="mb-8">
                <img
                  src={selectedImage}
                  alt="Selected plant leaf"
                  className="w-full h-auto rounded-lg shadow-lg object-cover"
                />
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                <p className="text-lg font-medium">Analyzing your image...</p>
              </div>
            )}

            {/* Analysis Results */}
            {prediction && (
              <div className={`mt-8 p-6 rounded-xl ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-opacity-50 backdrop-blur-lg
                    ${darkMode ? 'bg-gray-600' : 'bg-white shadow-md'}">
                    <span className="font-semibold">Disease:</span>
                    <span className="text-green-500 font-bold">{prediction.disease}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-opacity-50 backdrop-blur-lg
                    ${darkMode ? 'bg-gray-600' : 'bg-white shadow-md'}">
                    <span className="font-semibold">Confidence:</span>
                    <span className="text-blue-500 font-bold">{prediction.confidence}</span>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-600' : 'bg-white shadow-md'
                  }`}>
                    <p className="font-semibold mb-2">Description:</p>
                    <p className="text-sm leading-relaxed">{prediction.description}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${
                    darkMode ? 'bg-gray-600' : 'bg-white shadow-md'
                  }`}>
                    <p className="font-semibold mb-2">Treatment:</p>
                    <p className="text-sm leading-relaxed">{prediction.treatment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;