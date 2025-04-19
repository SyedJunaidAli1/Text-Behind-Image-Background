"use client";
import React, { useState, useRef, useEffect } from "react";
import Nav from "../components/Nav";
import { removeBackground } from "@imgly/background-removal";
import {
  AlignLeft,
  Underline,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Type,
  Camera,
  Settings,
} from "lucide-react";
import Footer from "../components/Footer";
import Select from "react-select";

const MainApp = () => {
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [text, setText] = useState("");
  const [textSize, setTextSize] = useState(16);
  const [textColor, setTextColor] = useState("#000000");
  const [textOpacity, setTextOpacity] = useState(100);
  const [textHorizontal, setTextHorizontal] = useState(0);
  const [textVertical, setTextVertical] = useState(0);
  const [textRotation, setTextRotation] = useState(0);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">(
    "center"
  );
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("image");
  const [aspectRatio, setAspectRatio] = useState<
    "original" | "16:9" | "1:1" | "4:3"
  >("original");
  const [originalImageWidth, setOriginalImageWidth] = useState<number | null>(
    null
  );
  const [previewDimensions, setPreviewDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial"); // Default font
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const originalImageRef = useRef<HTMLImageElement>(null);
  const previewPanelRef = useRef<HTMLDivElement>(null);

  const fontOptions = [
    { value: "Arial", label: "Arial" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Courier New", label: "Courier New" },
    { value: "Georgia", label: "Georgia" },
    { value: "Verdana", label: "Verdana" },
    { value: "Roboto", label: "Roboto" },
    { value: "Open Sans", label: "Open Sans" },
    { value: "Lato", label: "Lato" },
    { value: "Montserrat", label: "Montserrat" },
    { value: "Poppins", label: "Poppins" },
    { value: "Raleway", label: "Raleway" },
    { value: "Oswald", label: "Oswald" },
    { value: "Roboto Condensed", label: "Roboto Condensed" },
    { value: "Source Sans Pro", label: "Source Sans Pro" },
    { value: "Merriweather", label: "Merriweather" },
    { value: "Playfair Display", label: "Playfair Display" },
    { value: "Ubuntu", label: "Ubuntu" },
    { value: "Nunito", label: "Nunito" },
    { value: "PT Sans", label: "PT Sans" },
    { value: "Fira Sans", label: "Fira Sans" },
    { value: "Lora", label: "Lora" },
    { value: "Bree Serif", label: "Bree Serif" },
    { value: "Cinzel", label: "Cinzel" },
    { value: "Dancing Script", label: "Dancing Script" },
    { value: "Indie Flower", label: "Indie Flower" },
    { value: "Pacifico", label: "Pacifico" },
    { value: "Lobster", label: "Lobster" },
    { value: "ZCOOL QingKe HuangYou", label: "ZCOOL QingKe HuangYou" },
    { value: "ZCOOL XiaoWei", label: "ZCOOL XiaoWei" },
    { value: "Zilla Slab", label: "Zilla Slab" },
    { value: "Yanone Kaffeesatz", label: "Yanone Kaffeesatz" },
    { value: "Allura", label: "Allura" },
    { value: "Amatic SC", label: "Amatic SC" },
    { value: "Anton", label: "Anton" },
    { value: "Architects Daughter", label: "Architects Daughter" },
    { value: "Arimo", label: "Arimo" },
    { value: "Asap", label: "Asap" },
    { value: "Barlow", label: "Barlow" },
    { value: "Bebas Neue", label: "Bebas Neue" },
    { value: "Bitter", label: "Bitter" },
    { value: "Cabin", label: "Cabin" },
    { value: "Cardo", label: "Cardo" },
    { value: "Caveat", label: "Caveat" },
    { value: "Chewy", label: "Chewy" },
    { value: "Comfortaa", label: "Comfortaa" },
    { value: "Crimson Text", label: "Crimson Text" },
    { value: "Cuprum", label: "Cuprum" },
    { value: "Dosis", label: "Dosis" },
    { value: "Exo 2", label: "Exo 2" },
    { value: "Fjalla One", label: "Fjalla One" },
    { value: "Francois One", label: "Francois One" },
    { value: "Fredoka One", label: "Fredoka One" },
    { value: "Gilda Display", label: "Gilda Display" },
    { value: "Gloria Hallelujah", label: "Gloria Hallelujah" },
    { value: "Great Vibes", label: "Great Vibes" },
    { value: "Handlee", label: "Handlee" },
    { value: "Hammersmith One", label: "Hammersmith One" },
    { value: "Heebo", label: "Heebo" },
    { value: "IM Fell English SC", label: "IM Fell English SC" },
    { value: "Istok Web", label: "Istok Web" },
    { value: "Jaldi", label: "Jaldi" },
    { value: "Josefin Sans", label: "Josefin Sans" },
    { value: "Jura", label: "Jura" },
    { value: "Kanit", label: "Kanit" },
    { value: "Karla", label: "Karla" },
    { value: "Khand", label: "Khand" },
    { value: "Kreon", label: "Kreon" },
    { value: "Lekton", label: "Lekton" },
    { value: "Libre Baskerville", label: "Libre Baskerville" },
    { value: "Limelight", label: "Limelight" },
    { value: "Lobster Two", label: "Lobster Two" },
    { value: "Luckiest Guy", label: "Luckiest Guy" },
    { value: "Maiden Orange", label: "Maiden Orange" },
    { value: "Marck Script", label: "Marck Script" },
    { value: "Maven Pro", label: "Maven Pro" },
    { value: "Merriweather Sans", label: "Merriweather Sans" },
    { value: "Monda", label: "Monda" },
    { value: "Noto Sans", label: "Noto Sans" },
    { value: "Noticia Text", label: "Noticia Text" },
    { value: "Old Standard TT", label: "Old Standard TT" },
    { value: "Oldenburg", label: "Oldenburg" },
    { value: "Orbitron", label: "Orbitron" },
    { value: "Ovo", label: "Ovo" },
    { value: "Padauk", label: "Padauk" },
    { value: "Parisienne", label: "Parisienne" },
    { value: "Passion One", label: "Passion One" },
    { value: "Pathway Gothic One", label: "Pathway Gothic One" },
    { value: "Patua One", label: "Patua One" },
    { value: "Permanent Marker", label: "Permanent Marker" },
    { value: "Philosopher", label: "Philosopher" },
    { value: "Pinyon Script", label: "Pinyon Script" },
    { value: "Play", label: "Play" },
    { value: "Poiret One", label: "Poiret One" },
    { value: "Prata", label: "Prata" },
    { value: "Press Start 2P", label: "Press Start 2P" },
    { value: "Prociono", label: "Prociono" },
    { value: "Puritan", label: "Puritan" },
    { value: "Qwigley", label: "Qwigley" },
    { value: "Quicksand", label: "Quicksand" },
    { value: "Radley", label: "Radley" },
    { value: "Rationale", label: "Rationale" },
    { value: "Red Hat Display", label: "Red Hat Display" },
    { value: "Reenie Beanie", label: "Reenie Beanie" },
    { value: "Righteous", label: "Righteous" },
    { value: "Rokkitt", label: "Rokkitt" },
    { value: "Ropa Sans", label: "Ropa Sans" },
    { value: "Rosario", label: "Rosario" },
    { value: "Rubik", label: "Rubik" },
    { value: "Russo One", label: "Russo One" },
    { value: "Sacramento", label: "Sacramento" },
    { value: "Sail", label: "Sail" },
    { value: "Sansita", label: "Sansita" },
    { value: "Sansita Swashed", label: "Sansita Swashed" },
    { value: "Sarabun", label: "Sarabun" },
    { value: "Schoolbell", label: "Schoolbell" },
    { value: "Seaweed Script", label: "Seaweed Script" },
    { value: "Shadows Into Light", label: "Shadows Into Light" },
    { value: "Shrikhand", label: "Shrikhand" },
    { value: "Signika", label: "Signika" },
    { value: "Six Caps", label: "Six Caps" },
    { value: "Slabo 27px", label: "Slabo 27px" },
    { value: "Smokum", label: "Smokum" },
    { value: "Special Elite", label: "Special Elite" },
    { value: "Spinnaker", label: "Spinnaker" },
    { value: "Staatliches", label: "Staatliches" },
    { value: "Stalemate", label: "Stalemate" },
    { value: "Stint Ultra Condensed", label: "Stint Ultra Condensed" },
    { value: "Stix Two Text", label: "Stix Two Text" },
    { value: "Sunflower", label: "Sunflower" },
    { value: "Supermercado One", label: "Supermercado One" },
    { value: "Syncopate", label: "Syncopate" },
    { value: "Tangerine", label: "Tangerine" },
    { value: "Tauri", label: "Tauri" },
    { value: "Telex", label: "Telex" },
    { value: "Text Me One", label: "Text Me One" },
    { value: "Tienne", label: "Tienne" },
    { value: "Titillium Web", label: "Titillium Web" },
    { value: "Trade Winds", label: "Trade Winds" },
    { value: "Trirong", label: "Trirong" },
    { value: "Trochut", label: "Trochut" },
    { value: "Ubuntu Condensed", label: "Ubuntu Condensed" },
    { value: "Unica One", label: "Unica One" },
    { value: "Unkempt", label: "Unkempt" },
    { value: "Varela Round", label: "Varela Round" },
    { value: "Vidaloka", label: "Vidaloka" },
    { value: "Volkhov", label: "Volkhov" },
    { value: "VT323", label: "VT323" },
    { value: "Wallpoet", label: "Wallpoet" },
    { value: "Wendy One", label: "Wendy One" },
    { value: "Wire One", label: "Wire One" },
    { value: "Work Sans", label: "Work Sans" },
    { value: "Yanone Kaffeesatz", label: "Yanone Kaffeesatz" },
    { value: "Yeseva One", label: "Yeseva One" },
    { value: "ZCOOL QingKe HuangYou", label: "ZCOOL QingKe HuangYou" },
    { value: "ZCOOL XiaoWei", label: "ZCOOL XiaoWei" },
  ];

  // Dynamic font loading
  useEffect(() => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
      / /g,
      "+"
    )}:wght@400&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    console.log(`Loading font: ${fontFamily}`);
    return () => document.head.removeChild(link);
  }, [fontFamily]);

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
            console.warn(
              `Image dimensions not available (retry ${retryCount + 1
              }/${maxRetries}): ${naturalWidth}x${naturalHeight}`
            );
            retryCount++;
            retryTimeout = setTimeout(updateDimensions, 100);
            return;
          } else {
            console.error("Max retries reached, using fallback dimensions");
            setPreviewDimensions({ width: 100, height: 100 });
            setImageLoaded(true);
            return;
          }
        }

        let width = naturalWidth;
        let height = naturalHeight;

        const maxHeightPx = window.innerHeight * 0.6;
        const panelWidth = panel.clientWidth - 16;

        if (aspectRatio !== "original") {
          const currentAspect = width / height;
          let targetAspect: number;

          switch (aspectRatio) {
            case "16:9":
              targetAspect = 16 / 9;
              break;
            case "1:1":
              targetAspect = 1;
              break;
            case "4:3":
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

          const panelHeight = panelWidth * (height / width);
          panel.style.height = `${Math.min(panelHeight, maxHeightPx)}px`;
        } else {
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
        console.log(
          `Rendered Image Width: ${rect.width}, Container Dimensions: ${rect.width}x${rect.height}`
        );
      } else {
        console.warn(
          "Image ref or panel ref not available:",
          originalImageRef.current,
          previewPanelRef.current
        );
      }
    };

    if (originalImage && originalImageRef.current) {
      if (originalImageRef.current.complete) {
        updateDimensions();
      } else {
        const loadHandler = () => {
          updateDimensions();
        };
        originalImageRef.current.addEventListener("load", loadHandler);

        loadTimeout = setTimeout(() => {
          updateDimensions();
        }, 2000);

        return () => {
          if (originalImageRef.current) {
            originalImageRef.current.removeEventListener("load", loadHandler);
          }
        };
      }
    }

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (retryTimeout) clearTimeout(retryTimeout);
      if (loadTimeout) clearTimeout(loadTimeout);
    };
  }, [originalImage, aspectRatio, rotation]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        alert("Please upload a PNG, JPG, or JPEG file.");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setSelectedFile(file);
      setImageLoaded(false);
      setPreviewDimensions(null);
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
      setProcessedImage(imageBlob ? URL.createObjectURL(imageBlob) : imageUrl);
    } catch (error) {
      console.error("Error removing background:", error);
      setProcessedImage(imageUrl);
    }
  };

  const handleReset = () => {
    setBrightness(100);
    setContrast(100);
    setRotation(0);
    setText("");
    setTextSize(16);
    setTextColor("#000000");
    setTextOpacity(100);
    setTextHorizontal(0);
    setTextVertical(0);
    setTextRotation(0);
    setTextAlign("center");
    setIsBold(false);
    setIsItalic(false);
    setIsUnderline(false);
    setSelectedFile(null);
    setOriginalImage(null);
    setProcessedImage(null);
    setAspectRatio("original");
    setOriginalImageWidth(null);
    setPreviewDimensions(null);
    setImageLoaded(false);
    setFontFamily("Arial");
    if (fileInputRef.current) fileInputRef.current.value = "";
    setActiveSection(null);
    if (previewPanelRef.current) previewPanelRef.current.style.height = "auto";
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const getJustifyContent = () => {
    switch (textAlign) {
      case "left":
        return "flex-start";
      case "center":
        return "center";
      case "right":
        return "flex-end";
      default:
        return "center";
    }
  };


  const handleDownload = () => {
    if (!imageRef.current || !originalImageRef.current || !originalImage || !previewDimensions) {
      alert("Please wait for the image to fully load or adjust aspect ratio!");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imageRef.current;
    const originalImg = originalImageRef.current;
    const width = previewDimensions.width;
    const height = previewDimensions.height;

    canvas.width = width;
    canvas.height = height;

    // Load and draw the original image
    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = originalImage;
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, width, height);

      // Render text layer
      if (text) {
        const textSet = {
          text,
          fontWeight: isBold ? "bold" : "normal",
          fontSize: textSize,
          fontFamily,
          color: textColor,
          opacity: textOpacity / 100,
          left: (textHorizontal / (width / 2)) * 50, // Percentage from center (-50 to 50)
          top: (textVertical / (height / 2)) * -50,  // Inverted percentage from center (-50 to 50)
          tiltX: 0,
          tiltY: 0,
          rotation: textRotation,
        };

        ctx.save();
        ctx.font = `${isItalic ? "italic" : ""} ${textSet.fontWeight} ${textSet.fontSize}px ${textSet.fontFamily}`;
        ctx.fillStyle = textSet.color;
        ctx.globalAlpha = textSet.opacity;
        // Invert textAlign to match preview's visual alignment
        ctx.textAlign = textAlign === "left" ? "right" : textAlign === "right" ? "left" : "center";
        ctx.textBaseline = "middle";

        const x = (width * (textSet.left + 50)) / 100; // Position from center
        const y = (height * (50 - textSet.top)) / 100; // Position from center

        ctx.translate(x, y);
        ctx.rotate((textSet.rotation * Math.PI) / 180);

        // Draw text
        ctx.fillText(textSet.text, 0, 0);

        // Draw underline after rotation if enabled
        let underlineY = 0; // Default value
        let xStart = 0; // Default value
        let xEnd = 0;   // Default value
        if (isUnderline) {
          const textWidth = ctx.measureText(textSet.text).width;
          underlineY = textSet.fontSize / 3 + 2; // Gap adjusted
          // Adjust xStart/xEnd based on inverted textAlign and anchor point
          switch (ctx.textAlign) {
            case "right": // Preview "left" - anchor at right edge, underline leftward
              xStart = 0;
              xEnd = -textWidth;
              break;
            case "left": // Preview "right" - anchor at left edge, underline rightward
              xStart = 0;
              xEnd = textWidth;
              break;
            case "center":
              xStart = -textWidth / 2;
              xEnd = textWidth / 2;
              break;
          }
          ctx.beginPath();
          ctx.moveTo(xStart, underlineY);
          ctx.lineTo(xEnd, underlineY);
          ctx.lineWidth = textSet.fontSize / 20;
          ctx.strokeStyle = textSet.color;
          ctx.stroke();
        }

        ctx.restore();

        console.log("Text rendered at:", { x, y, textWidth: ctx.measureText(text).width, textHorizontal, textVertical, textAlign, canvasTextAlign: ctx.textAlign, isItalic, isUnderline, underlineY, rotation: textSet.rotation, xStart, xEnd });
      }

      // Draw processed image on top (if exists)
      if (processedImage) {
        const removedBgImg = new Image();
        removedBgImg.crossOrigin = "anonymous";
        removedBgImg.src = processedImage;
        removedBgImg.onload = () => {
          ctx.drawImage(removedBgImg, 0, 0, width, height);
          triggerDownload();
        };
      } else {
        triggerDownload();
      }

      function triggerDownload() {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = dataUrl;
        link.click();
      }
    };
  };


  return (
    <>
      <Nav />
      <main className="min-h-screen p-4 md:p-8 w-full mx-auto flex flex-col md:flex-row gap-4 md:gap-6">
        <div
          ref={previewPanelRef}
          className="flex-1 flex justify-center items-center border rounded-lg p-4 relative max-h-[60vh] md:max-h-[80vh] overflow-auto w-full"
        >
          {isProcessing ? (
            <span className="text-gray-600 animate-pulse">
              Processing image...
            </span>
          ) : originalImage ? (
            <div
              className="relative w-full"
              style={{
                aspectRatio: previewDimensions
                  ? `${previewDimensions.width} / ${previewDimensions.height}`
                  : "1 / 1",
                maxWidth: previewDimensions
                  ? `${previewDimensions.width}px`
                  : "100%",
                maxHeight: previewDimensions
                  ? `${previewDimensions.height}px`
                  : "100%",
                position: "relative",
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-full overflow-hidden"
                style={{ transform: `rotate(${rotation}deg)`, zIndex: 1 }}
              >
                <img
                  ref={originalImageRef}
                  src={originalImage}
                  alt="Original"
                  className={
                    aspectRatio === "original"
                      ? "w-full h-full object-contain"
                      : "w-full h-full object-cover"
                  }
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                  }}
                />
              </div>
              {text && (
                <div
                  className="absolute top-0 left-0 h-full flex items-center"
                  style={{
                    width: originalImageWidth
                      ? `${originalImageWidth}px`
                      : "100%",
                    left: originalImageWidth
                      ? `calc(50% - ${originalImageWidth / 2}px)`
                      : "0",
                    justifyContent: getJustifyContent(),
                    fontSize: `${textSize}px`,
                    fontFamily: `"${fontFamily}", sans-serif`,
                    color: textColor,
                    opacity: textOpacity / 100,
                    transform: `translate(${textHorizontal}px, ${textVertical}px) rotate(${textRotation}deg)`,
                    whiteSpace: "pre-wrap",
                    pointerEvents: "none",
                    fontWeight: isBold ? "bold" : "normal",
                    fontStyle: isItalic ? "italic" : "normal",
                    textDecoration: isUnderline ? "underline" : "none",
                    zIndex: 2,
                  }}
                >
                  {text}
                </div>
              )}
              {processedImage && (
                <div
                  className="absolute top-0 left-0 w-full h-full overflow-hidden"
                  style={{ transform: `rotate(${rotation}deg)`, zIndex: 3 }}
                >
                  <img
                    ref={imageRef}
                    src={processedImage}
                    alt="Processed"
                    className={
                      aspectRatio === "original"
                        ? "w-full h-full object-contain"
                        : "w-full h-full object-cover"
                    }
                    style={{
                      filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-500">No image selected</span>
          )}
        </div>

        <div className="w-full md:w-80 border rounded-lg p-4 md:p-6 shadow-sm max-h-[80vh] md:max-h[80vh] overflow-auto">
          <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
            <button
              onClick={() => toggleSection("text")}
              className={`flex-1 py-2 px-2 md:px-3 text-xs md:text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 ${activeSection === "text"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105"
                }`}
            >
              <Type size={14} className="md:w-4 md:h-4" />
              Text
            </button>
            <button
              onClick={() => toggleSection("image")}
              className={`flex-1 py-2 px-2 md:px-3 text-xs md:text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 ${activeSection === "image"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105"
                }`}
            >
              <Camera size={14} className="md:w-4 md:h-4" />
              Image
            </button>
            <button
              onClick={() => toggleSection("settings")}
              className={`flex-1 py-2 px-2 md:px-3 text-xs md:text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 ${activeSection === "settings"
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105"
                }`}
            >
              <Settings size={14} className="md:w-4 md:h-4" />
              Settings
            </button>
          </div>
          {activeSection === "text" && (
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                  Text
                </label>
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text"
                  className="w-full p-2 md:p-3 border rounded-md min-h-[60px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
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
                <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                  Font Family
                </label>
                <Select
                  value={
                    fontOptions.find((option) => option.value === fontFamily) ||
                    null
                  }
                  onChange={(selectedOption) => {
                    console.log(
                      "Selected font:",
                      selectedOption ? selectedOption.value : "Arial"
                    );
                    setFontFamily(
                      selectedOption ? selectedOption.value : "Arial"
                    );
                  }}
                  options={fontOptions}
                  className="w-full text-sm md:text-base"
                  classNamePrefix="select"
                  isSearchable={true}
                  placeholder="Select a font..."
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: "var(--background)",
                      borderColor: state.isFocused
                        ? "var(--primary)"
                        : "var(--border)",
                      boxShadow: state.isFocused
                        ? `0 0 0 2px var(--primary)`
                        : "none",
                      borderRadius: "var(--radius)",
                      minHeight: "2.5rem",
                      padding: "0 0.5rem",
                      "&:hover": {
                        borderColor: "var(--secondary-foreground)",
                      },
                    }),
                    menu: (baseStyles) => ({
                      ...baseStyles,
                      backgroundColor: "var(--background)",
                      borderRadius: "var(--radius)",
                      zIndex: 50,
                      boxShadow:
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      marginTop: "2px",
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isSelected
                        ? "var(--primary)"
                        : state.isFocused
                          ? "var(--secondary)"
                          : "var(--background)",
                      color: state.isSelected
                        ? "var(--primary-foreground)"
                        : "var(--foreground)",
                      padding: "0.5rem 1rem",
                      "&:hover": {
                        backgroundColor: "var(--secondary)",
                      },
                    }),
                    singleValue: (baseStyles) => ({
                      ...baseStyles,
                      color: "var(--foreground)",
                      marginLeft: "0.5rem",
                    }),
                    placeholder: (baseStyles) => ({
                      ...baseStyles,
                      color: "var(--muted-foreground)",
                      marginLeft: "0.5rem",
                    }),
                    input: (baseStyles) => ({
                      ...baseStyles,
                      color: "var(--foreground)",
                      marginLeft: "0.5rem",
                    }),
                    indicatorSeparator: (baseStyles) => ({
                      ...baseStyles,
                      display: "none",
                    }),
                    dropdownIndicator: (baseStyles) => ({
                      ...baseStyles,
                      color: "var(--foreground)",
                      padding: "0 0.5rem",
                    }),
                  }}
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                  Text Color
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-8 md:h-10 border rounded-md cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
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
                <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
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
                <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
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
                <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
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

              <div className="flex gap-2 flex-wrap max-w-full">
                <button
                  onClick={() => setTextAlign("left")}
                  className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${textAlign === "left"
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <AlignLeft className="w-4 h-4 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => setTextAlign("center")}
                  className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${textAlign === "center"
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <AlignCenter className="w-4 h-4 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => setTextAlign("right")}
                  className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${textAlign === "right"
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <AlignRight className="w-4 h-4 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => setIsBold(!isBold)}
                  className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${isBold
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <Bold className="w-4 h-4 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => setIsItalic(!isItalic)}
                  className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${isItalic
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <Italic className="w-4 h-4 md:w-4 md:h-4" />
                </button>
                <button
                  onClick={() => setIsUnderline(!isUnderline)}
                  className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${isUnderline
                      ? "bg-black text-white"
                      : "bg-white text-black border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  <Underline className="w-4 h-4 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          )}
          {activeSection === "image" && (
            <div className="space-y-4 md:space-y-6">
              <label className="block mb-2 md:mb-4">
                <span className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                  Choose File
                </span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png,image/jpeg,image/jpg"
                  className="block w-full text-xs md:text-sm text-gray-500 file:mr-2 md:file:mr-4 file:py-2 file:px-3 md:file:px-4 file:rounded-md file:border-0 file:text-xs md:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </label>
              <div>
                <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
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
                <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
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
                <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
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
          {activeSection === "settings" && (
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) =>
                    setAspectRatio(
                      e.target.value as "original" | "16:9" | "1:1" | "4:3"
                    )
                  }
                  className="w-full p-2 md:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                >
                  <option value="original">Original</option>
                  <option value="16:9">16:9</option>
                  <option value="1:1">1:1 (Square)</option>
                  <option value="4:3">4:3</option>
                </select>
              </div>
            </div>
          )}
          <div className="flex gap-2 md:gap-4 justify-end mt-3 md:mt-4">
            <button
              onClick={handleReset}
              className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={!imageLoaded || !previewDimensions}
            >
              Reset
            </button>
            <button
              onClick={handleDownload}
              className="px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={!imageLoaded || !previewDimensions}
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
