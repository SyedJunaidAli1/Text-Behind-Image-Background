'use client';
import React, { useState, useRef } from 'react';
import Nav from '../components/Nav';
import { removeBackground } from '@imgly/background-removal';

const MainApp = () => {
  const [opacity, setOpacity] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("📂 Selected file:", file);
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setIsProcessing(true);
      await setupImage(imageUrl);
      setIsProcessing(false);
    }
  };

  const setupImage = async (imageUrl: string) => {
    try {
      const imageBlob = await removeBackground(imageUrl);
      if (!imageBlob) {
        console.error("❌ ERROR: removeBackground returned undefined!");
        return;
      }
      const url = URL.createObjectURL(imageBlob);
      console.log("🔗 Processed Image URL:", url);
      setProcessedImage(url);
    } catch (error) {
      console.error("❌ Error removing background:", error);
    }
  };

  const handleReset = () => {
    setOpacity(100);
    setBrightness(100);
    setContrast(100);
    setRotation(0);
    setHorizontal(0);
    setVertical(0);
    setText('');
    setSelectedFile(null);
    setProcessedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setActiveSection(null);
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen p-8 w-full mx-auto flex gap-6">
        <div className="flex-1 flex justify-center items-center border rounded-lg p-4">
          {isProcessing ? (
            <span className="text-gray-600 animate-pulse">Processing image...</span>
          ) : processedImage ? (
            <img
              src={processedImage}
              alt="Processed"
              className="max-w-full max-h-96 object-contain"
              style={{
                opacity: opacity / 100,
                filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                transform: `rotate(${rotation}deg) translate(${horizontal}px, ${vertical}px)`,
              }}
            />
          ) : (
            <span className="text-gray-500">No image selected</span>
          )}
        </div>

        <div className="w-80 border rounded-lg p-6 shadow-sm">
          <div className="flex justify-between mb-6">
            <button
              onClick={() => toggleSection('text')}
              className={`flex-1 py-2 text-sm font-medium rounded-full ${
                activeSection === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } flex items-center justify-center gap-1`}
            >
              T Text
            </button>
            <button
              onClick={() => toggleSection('image')}
              className={`flex-1 py-2 text-sm font-medium rounded-full ${
                activeSection === 'image' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } flex items-center justify-center gap-1`}
            >
              📷 Image
            </button>
            <button
              onClick={() => toggleSection('settings')}
              className={`flex-1 py-2 text-sm font-medium rounded-full ${
                activeSection === 'settings' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } flex items-center justify-center gap-1`}
            >
              ⚙️ Settings
            </button>
          </div>

          {activeSection === 'text' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 border rounded-md min-h-[60px]"
              />
            </div>
          )}

          {activeSection === 'image' && (
            <div className="space-y-6">
              <label className="block mb-4">
                <span className="block text-sm font-medium mb-2">Choose File</span>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Rotation</span>
                  <span>{rotation}°</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">↺</span>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-gray-400">↻</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Brightness</span>
                  <span>{brightness}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Contrast</span>
                  <span>{contrast}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Opacity</span>
                  <span>{opacity}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Horizontal</span>
                  <span>{horizontal}px</span>
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={horizontal}
                  onChange={(e) => setHorizontal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Vertical</span>
                  <span>{vertical}px</span>
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={vertical}
                  onChange={(e) => setVertical(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-end mt-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Reset
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Download
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainApp;