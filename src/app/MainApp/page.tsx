'use client';
import React, { useState, useRef, useEffect } from 'react';
import Nav from '../components/Nav';
import { removeBackground } from '@imgly/background-removal';
import { AlignLeft, Underline, AlignCenter, AlignRight, Bold, Italic, Type, Camera, Settings } from 'lucide-react';
import Footer from '../components/Footer';

const MainApp = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotation, setRotation] = useState(0);
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
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>('image');
  const [aspectRatio, setAspectRatio] = useState<'original' | '16:9' | '1:1' | '4:3'>('original');
  const [originalImageWidth, setOriginalImageWidth] = useState<number | null>(null);
  const [previewDimensions, setPreviewDimensions] = useState<{ width: number; height: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const originalImageRef = useRef<HTMLImageElement>(null);
  const previewPanelRef = useRef<HTMLDivElement>(null);

  // Update the preview dimensions and panel height
  useEffect(() => {
    let retryTimeout: NodeJS.Timeout | null = null;
    let loadTimeout: NodeJS.Timeout | null = null;
    let retryCount = 0;
    const maxRetries = 10;

    const updateDimensions = () => {
      if (originalImageRef.current && previewPanelRef.current) {
        const img = originalImageRef.current;
        const panel = previewPanelRef.current;
        const naturalWidth = img.naturalWidth;
        const naturalHeight = img.naturalHeight;

        if (naturalWidth === 0 || naturalHeight === 0) {
          if (retryCount < maxRetries) {
            console.warn(`Image dimensions not available (retry ${retryCount + 1}/${maxRetries}): ${naturalWidth}x${naturalHeight}`);
            retryCount++;
            retryTimeout = setTimeout(updateDimensions, 100);
            return;
          } else {
            console.error('Max retries reached, using fallback dimensions');
            setPreviewDimensions({ width: 100, height: 100 });
            setImageLoaded(true);
            return;
          }
        }

        let width = naturalWidth;
        let height = naturalHeight;

        const maxHeightPx = window.innerHeight * 0.8; // 80vh
        const panelWidth = panel.clientWidth - 32;

        if (aspectRatio !== 'original') {
          const currentAspect = width / height;
          let targetAspect: number;

          switch (aspectRatio) {
            case '16:9':
              targetAspect = 16 / 9;
              break;
            case '1:1':
              targetAspect = 1;
              break;
            case '4:3':
              targetAspect = 4 / 3;
              break;
            default:
              targetAspect = currentAspect;
          }

          if (currentAspect > targetAspect) {
            width = height * targetAspect;
          } else {
            height = width / targetAspect;
          }

          console.log(`Aspect Ratio: ${aspectRatio}, Target Aspect: ${targetAspect}, Calculated Dimensions: ${width}x${height}`);

          const panelHeight = panelWidth * (height / width);
          panel.style.height = `${Math.min(panelHeight, maxHeightPx)}px`;
        } else {
          console.log(`Aspect Ratio: ${aspectRatio}, Using natural dimensions: ${width}x${height}`);

          const aspect = width / height;
          if (height > maxHeightPx) {
            height = maxHeightPx;
            width = height * aspect;
          }
          if (width > panelWidth) {
            width = panelWidth;
            height = width / aspect;
          }

          panel.style.height = `${height}px`;
        }

        setPreviewDimensions({ width, height });
        setImageLoaded(true);

        const rect = img.getBoundingClientRect();
        setOriginalImageWidth(rect.width);
        console.log(`Rendered Image Width: ${rect.width}, Container Dimensions: ${rect.width}x${rect.height}`);
      } else {
        console.warn('Image ref or panel ref not available:', originalImageRef.current, previewPanelRef.current);
      }
    };

    if (originalImage && originalImageRef.current) {
      console.log('Original image set, attempting to update dimensions...');
      if (originalImageRef.current.complete) {
        console.log('Image already loaded, updating dimensions...');
        updateDimensions();
      } else {
        console.log('Image not yet loaded, adding load event listener...');
        const loadHandler = () => {
          console.log('Image load event fired, updating dimensions...');
          updateDimensions();
        };
        originalImageRef.current.addEventListener('load', loadHandler);

        // Fallback: Force update dimensions after 2 seconds if load event doesn't fire
        loadTimeout = setTimeout(() => {
          console.warn('Image load event did not fire within 2 seconds, forcing dimension update...');
          updateDimensions();
        }, 2000);

        // Clean up the load event listener
        return () => {
          if (originalImageRef.current) {
            originalImageRef.current.removeEventListener('load', loadHandler);
          }
        };
      }
    } else {
      console.warn('No original image or image ref available to update dimensions.');
    }

    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (retryTimeout) {
        clearTimeout(retryTimeout);
      }
      if (loadTimeout) {
        clearTimeout(loadTimeout);
      }
    };
  }, [originalImage, aspectRatio, rotation]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("📂 Selected file:", file);
      setSelectedFile(file);
      setImageLoaded(false);
      setPreviewDimensions(null); // Reset dimensions to ensure recalculation
      const imageUrl = URL.createObjectURL(file);
      setOriginalImage(imageUrl);
      setIsProcessing(true);
      await setupImage(imageUrl);
      setIsProcessing(false);
    }
  };

  const setupImage = async (imageUrl: string) => {
    try {
      const imageBlob = await removeBackground(imageUrl);
      if (!imageBlob) {
        console.error("❌ ERROR: removeBackground returned undefined, falling back to original image!");
        setProcessedImage(imageUrl);
        return;
      }
      console.log("Image Blob Size:", imageBlob.size, "Type:", imageBlob.type);
      const url = URL.createObjectURL(imageBlob);
      console.log("🔗 Processed Image URL:", url);
      setProcessedImage(url);
    } catch (error) {
      console.error("❌ Error removing background, falling back to original image:", error);
      setProcessedImage(imageUrl);
    }
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setRotation(0);
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
    setOriginalImage(null);
    setProcessedImage(null);
    setAspectRatio('original');
    setOriginalImageWidth(null);
    setPreviewDimensions(null);
    setImageLoaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setActiveSection(null);
    if (previewPanelRef.current) {
      previewPanelRef.current.style.height = 'auto';
    }
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const getJustifyContent = () => {
    switch (textAlign) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  };

  const handleDownload = () => {
    if (!imageRef.current || !originalImageRef.current || !originalImage) {
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
    const originalImg = originalImageRef.current;
    let width = img.naturalWidth;
    let height = img.naturalHeight;

    if (aspectRatio !== 'original') {
      const currentAspect = width / height;
      let targetAspect: number;

      switch (aspectRatio) {
        case '16:9':
          targetAspect = 16 / 9;
          break;
        case '1:1':
          targetAspect = 1;
          break;
        case '4:3':
          targetAspect = 4 / 3;
          break;
        default:
          targetAspect = currentAspect;
      }

      if (currentAspect > targetAspect) {
        width = height * targetAspect;
      } else {
        height = width / targetAspect;
      }
    }

    canvas.width = width;
    canvas.height = height;

    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    ctx.drawImage(originalImg, 0, 0, width, height);

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

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    if (processedImage) {
      ctx.drawImage(img, 0, 0, width, height);
    } else {
      ctx.drawImage(originalImg, 0, 0, width, height);
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

        <div
          ref={previewPanelRef}
          className="flex-1 flex justify-center items-center border rounded-lg p-4 relative max-h-[80vh] overflow-auto"
          style={{ position: 'relative', zIndex: 0 }} // Explicit stacking context
        >
          {isProcessing ? (
            <span className="text-gray-600 animate-pulse">Processing image...</span>
          ) : originalImage ? (
            <div
              className="relative w-full"
              style={{
                width: '100%',
                aspectRatio: previewDimensions
                  ? `${previewDimensions.width} / ${previewDimensions.height}`
                  : '1 / 1',
                maxWidth: previewDimensions ? `${previewDimensions.width}px` : '100%',
                maxHeight: previewDimensions ? `${previewDimensions.height}px` : '100%',
                position: 'relative', // Ensure this container controls stacking
              }}
            >
              {/* Layer 1: Original Image (Bottom) */}
              <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden"
                style={{ transform: `rotate(${rotation}deg)`, zIndex: 1 }}
              >
                <img
                  ref={originalImageRef}
                  src={originalImage}
                  alt="Original"
                  className={
                    aspectRatio === 'original'
                      ? 'w-full h-full object-contain'
                      : 'w-full h-full object-cover'
                  }
                  style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                  onLoad={() => console.log("Original image loaded, zIndex: 1")}
                  onError={() => console.error("Error loading original image")}
                />
              </div>

              {/* Layer 2: Text (Middle, Centered with Dynamic Positioning) */}
              {text && (
                <div
                  className="absolute top-0 left-0 h-full flex items-center"
                  style={{
                    width: originalImageWidth ? `${originalImageWidth}px` : '100%',
                    left: originalImageWidth ? `calc(50% - ${originalImageWidth / 2}px)` : '0',
                    justifyContent: getJustifyContent(), // Dynamic alignment
                    fontSize: `${textSize}px`,
                    color: textColor,
                    opacity: textOpacity / 100,
                    transform: `translate(${textHorizontal}px, ${textVertical}px) rotate(${textRotation}deg)`, // Dynamic positioning and rotation
                    whiteSpace: 'pre-wrap',
                    pointerEvents: 'none',
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textDecoration: isUnderline ? 'underline' : 'none',
                    zIndex: 2, // Middle layer
                  }}
                  onLoad={() => console.log("Text layer loaded, zIndex: 2")}
                >
                  {text}
                </div>
              )}

              {/* Layer 3: Processed Image (Top) */}
              {processedImage && (
                <div
                  className="absolute top-0 left-0 w-full h-full overflow-hidden"
                  style={{ transform: `rotate(${rotation}deg)`, zIndex: 3 }}
                >
                  <img
                    ref={imageRef}
                    src={processedImage}
                    alt="Processed"
                    key={processedImage}
                    className={
                      aspectRatio === 'original'
                        ? 'w-full h-full object-contain'
                        : 'w-full h-full object-cover'
                    }
                    style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }}
                    onLoad={() => console.log("Processed image loaded, zIndex: 3")}
                    onError={() => console.error("Error loading processed image")}
                  />
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-500">No image selected</span>
          )}
        </div>



        <div className="w-80 border rounded-lg p-6 shadow-sm max-h-[80vh] overflow-auto">
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => toggleSection('text')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${activeSection === 'text'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
            >
              <Type size={16} />
              Text
            </button>
            <button
              onClick={() => toggleSection('image')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${activeSection === 'image'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
            >
              <Camera size={16} />
              Image
            </button>
            <button
              onClick={() => toggleSection('settings')}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 ${activeSection === 'settings'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
            >
              <Settings size={16} />
              Settings
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
                <label className="text-sm font-medium mb-2 flex justify-between">
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
                <label className="text-sm font-medium mb-2 flex justify-between">
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
                <label className="text-sm font-medium mb-2 flex justify-between">
                  <span>Text Horizontal Position</span>
                  <span>{textHorizontal}px</span>
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={textHorizontal}
                  onChange={(e) => setTextHorizontal(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 flex justify-between">
                  <span>Text Vertical Position</span>
                  <span>{textVertical}px</span>
                </label>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={textVertical}
                  onChange={(e) => setTextVertical(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 flex justify-between">
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

              <div className="flex gap-2">
                <button
                  onClick={() => setTextAlign('left')}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${textAlign === 'left' ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  <AlignLeft />
                </button>
                <button
                  onClick={() => setTextAlign('center')}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${textAlign === 'center' ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  <AlignCenter />
                </button>
                <button
                  onClick={() => setTextAlign('right')}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${textAlign === 'right' ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  <AlignRight />
                </button>
                <button
                  onClick={() => setIsBold(!isBold)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${isBold ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  <Bold />
                </button>
                <button
                  onClick={() => setIsItalic(!isItalic)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${isItalic ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  <Italic />
                </button>
                <button
                  onClick={() => setIsUnderline(!isUnderline)}
                  className={`w-10 h-10 flex items-center justify-center rounded-md border ${isUnderline ? 'bg-black text-white' : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  <Underline />
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
                <label className="text-sm font-medium mb-2 flex justify-between">
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
                <label className="text-sm font-medium mb-2 flex justify-between">
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
                <label className="text-sm font-medium mb-2 flex justify-between">
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
                <label className="block text-sm font-medium mb-2">Aspect Ratio</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as 'original' | '16:9' | '1:1' | '4:3')}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="original">Original</option>
                  <option value="16:9">16:9</option>
                  <option value="1:1">1:1 (Square)</option>
                  <option value="4:3">4:3</option>
                </select>
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
      <Footer />
    </>
  );
};

export default MainApp;