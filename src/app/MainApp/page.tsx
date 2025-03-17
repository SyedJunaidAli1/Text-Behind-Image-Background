'use client';
import React, { useState } from 'react';
import Nav from '../components/Nav';

const MainApp = () => {
  const [opacity, setOpacity] = useState(100);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [horizontal, setHorizontal] = useState(0);
  const [vertical, setVertical] = useState(0);
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
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
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen p-8 w-full mx-auto flex gap-6">
        {/* Left Side - Image Preview */}
        <div className="flex-1 flex justify-center items-center border rounded-lg p-4 ">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded"
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

        {/* Right Side - Control Panel */}
        <div className="w-80 border rounded-lg p-6 shadow-sm">
          <label className="block mb-4">
            <span className="block text-sm font-medium mb-2">Choose File</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </label>

          {/* Text Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Text</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border rounded-md min-h-[60px]"
            />
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">Opacity ({opacity}%)</label>
            <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full" />

            <label className="block text-sm font-medium mb-2">Brightness ({brightness}%)</label>
            <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full" />

            <label className="block text-sm font-medium mb-2">Contrast ({contrast}%)</label>
            <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full" />

            <label className="block text-sm font-medium mb-2">Rotation ({rotation}°)</label>
            <input type="range" min="-180" max="180" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full" />

            <label className="block text-sm font-medium mb-2">Horizontal ({horizontal}px)</label>
            <input type="range" min="-100" max="100" value={horizontal} onChange={(e) => setHorizontal(Number(e.target.value))} className="w-full" />

            <label className="block text-sm font-medium mb-2">Vertical ({vertical}px)</label>
            <input type="range" min="-100" max="100" value={vertical} onChange={(e) => setVertical(Number(e.target.value))} className="w-full" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end mt-4">
            <button onClick={handleReset} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Reset</button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Download</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainApp;
