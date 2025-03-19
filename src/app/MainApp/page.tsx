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
  const [textSize, setTextSize] = useState(16);
  const [textColor, setTextColor] = useState('#000000');
  const [textOpacity, setTextOpacity] = useState(100);
  const [textHorizontal, setTextHorizontal] = useState(0);
  const [textVertical, setTextVertical] = useState(0);
  const [textRotation, setTextRotation] = useState(0);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('image');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
    setTextSize(16);
    setTextColor('#000000');
    setTextOpacity(100);
    setTextHorizontal(0);
    setTextVertical(0);
    setTextRotation(0);
    setTextAlign('center');
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
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

  const handleDownload = () => {
    if (!imageRef.current || !processedImage) {
      alert('Please upload an image first!');
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    const img = imageRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.globalAlpha = opacity / 100;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.translate(horizontal, vertical);

    ctx.drawImage(img, 0, 0);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = textOpacity / 100;

    if (text) {
      const fontStyle = `${isItalic ? 'italic ' : ''}${isBold ? 'bold ' : ''}${textSize}px sans-serif`;
      ctx.font = fontStyle;
      ctx.fillStyle = textColor;
      ctx.textAlign = textAlign;
      ctx.textBaseline = 'middle';

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      ctx.translate(canvas.width / 2 + textHorizontal, canvas.height / 2 + textVertical);
      ctx.rotate((textRotation * Math.PI) / 180);

      const lines = text.split('\n');
      const lineHeight = textSize * 1.2;
      const totalHeight = lines.length * lineHeight;
      const startY = -totalHeight / 2 + lineHeight / 2;

      const maxWidth = canvas.width * 0.9;
      lines.forEach((line, index) => {
        if (textSize > 100) {
          const words = line.split(' ');
          let currentLine = '';
          let y = startY + index * lineHeight;

          words.forEach((word) => {
            const testLine = currentLine + word + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && currentLine !== '') {
              ctx.fillText(currentLine, 0, y);
              if (isUnderline) {
                const textWidth = ctx.measureText(currentLine).width;
                const xStart = textAlign === 'left' ? -textWidth / 2 : textAlign === 'right' ? textWidth / 2 : 0;
                ctx.beginPath();
                ctx.moveTo(xStart, y + lineHeight / 3);
                ctx.lineTo(xStart + textWidth, y + lineHeight / 3);
                ctx.strokeStyle = textColor;
                ctx.lineWidth = textSize / 20;
                ctx.stroke();
              }
              currentLine = word + ' ';
              y += lineHeight;
            } else {
              currentLine = testLine;
            }
          });
          if (currentLine) {
            ctx.fillText(currentLine, 0, y);
            if (isUnderline) {
              const textWidth = ctx.measureText(currentLine).width;
              const xStart = textAlign === 'left' ? -textWidth / 2 : textAlign === 'right' ? textWidth / 2 : 0;
              ctx.beginPath();
              ctx.moveTo(xStart, y + lineHeight / 3);
              ctx.lineTo(xStart + textWidth, y + lineHeight / 3);
              ctx.strokeStyle = textColor;
              ctx.lineWidth = textSize / 20;
              ctx.stroke();
            }
          }
        } else {
          ctx.fillText(line, 0, startY + index * lineHeight);
          if (isUnderline) {
            const textWidth = ctx.measureText(line).width;
            const xStart = textAlign === 'left' ? -textWidth / 2 : textAlign === 'right' ? textWidth / 2 : 0;
            ctx.beginPath();
            ctx.moveTo(xStart, startY + index * lineHeight + lineHeight / 3);
            ctx.lineTo(xStart + textWidth, startY + index * lineHeight + lineHeight / 3);
            ctx.strokeStyle = textColor;
            ctx.lineWidth = textSize / 20;
            ctx.stroke();
          }
        }
      });
    }

    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen p-8 w-full mx-auto flex gap-6">
        <div className="flex-1 flex justify-center items-center border rounded-lg p-4 relative">
          {isProcessing ? (
            <span className="text-gray-600 animate-pulse">Processing image...</span>
          ) : processedImage ? (
            <div className="relative">
              <img
                ref={imageRef}
                src={processedImage}
                alt="Processed"
                className="max-w-full max-h-96 object-contain"
                style={{
                  opacity: opacity / 100,
                  filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                  transform: `rotate(${rotation}deg) translate(${horizontal}px, ${vertical}px)`,
                }}
              />
              {text && (
                <div
                  className="absolute top-1/2 left-0 w-full"
                  style={{
                    fontSize: `${textSize}px`,
                    color: textColor,
                    opacity: textOpacity / 100,
                    transform: `translateY(-50%) translate(${textHorizontal}px, ${textVertical}px) rotate(${textRotation}deg)`,
                    whiteSpace: 'pre-wrap',
                    pointerEvents: 'none',
                    textAlign: textAlign,
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textDecoration: isUnderline ? 'underline' : 'none',
                  }}
                >
                  {text}
                </div>
              )}
            </div>
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Text</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text to overlay on the image"
                  className="w-full p-2 border rounded-md min-h-[60px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Font Size</span>
                  <span>{textSize}px</span>
                </label>
                <input
                  type="range"
                  min="16"
                  max="1000"
                  value={textSize}
                  onChange={(e) => setTextSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Text Color</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-10 border rounded-md cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Text Opacity</span>
                  <span>{textOpacity}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={textOpacity}
                  onChange={(e) => setTextOpacity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Text Horizontal Position</span>
                  <span>{textHorizontal}px</span>
                </label>
                <input
                  type="range"
                  min="-200"
                  max="200"
                  value={textHorizontal}
                  onChange={(e) => setTextHorizontal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Text Vertical Position</span>
                  <span>{textVertical}px</span>
                </label>
                <input
                  type="range"
                  min="-200"
                  max="200"
                  value={textVertical}
                  onChange={(e) => setTextVertical(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex justify-between">
                  <span>Text Rotation</span>
                  <span>{textRotation}°</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">↺</span>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={textRotation}
                    onChange={(e) => setTextRotation(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-gray-400">↻</span>
                </div>
              </div>

              {/* Alignment Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setTextAlign('left')}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                    textAlign === 'left' ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span style={{ display: 'inline-block', width: '20px', textAlign: 'left' }}>≡</span>
                </button>
                <button
                  onClick={() => setTextAlign('center')}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                    textAlign === 'center' ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span style={{ display: 'inline-block', width: '20px', textAlign: 'center' }}>≡</span>
                </button>
                <button
                  onClick={() => setTextAlign('right')}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                    textAlign === 'right' ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  <span style={{ display: 'inline-block', width: '20px', textAlign: 'right' }}>≡</span>
                </button>
                <button
                  onClick={() => setIsBold(!isBold)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                    isBold ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  B
                </button>
                <button
                  onClick={() => setIsItalic(!isItalic)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                    isItalic ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  I
                </button>
                <button
                  onClick={() => setIsUnderline(!isUnderline)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${
                    isUnderline ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  U
                </button>
              </div>
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
            <button
              onClick={handleDownload}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Download
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainApp;