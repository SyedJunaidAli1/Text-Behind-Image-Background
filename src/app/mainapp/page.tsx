"use client";
import React, { useState, useRef, useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { removeBackground } from "@imgly/background-removal";
import { fontOptions, useFontLoader } from "@/utils/fonts";

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
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("center");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("image");
  const [aspectRatio, setAspectRatio] = useState<"original" | "16:9" | "1:1" | "4:3">("original");
  const [originalImageWidth, setOriginalImageWidth] = useState<number | null>(null);
  const [previewDimensions, setPreviewDimensions] = useState<{ width: number; height: number } | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fontFamily, setFontFamily] = useState("Arial");

  // Load font dynamically (optional, as index.html preloads fonts)
  useFontLoader(fontFamily);

  // Map textAlign to justifyContent
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

  // Toggle active section (text, image, settings)
  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const originalImageRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const previewPanelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateDimensions = () => {
    if (originalImageRef.current && previewPanelRef.current) {
      const img = originalImageRef.current;
      const panel = previewPanelRef.current;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;

      console.log(`updateDimensions: naturalWidth=${naturalWidth}, naturalHeight=${naturalHeight}`);

      if (naturalWidth === 0 || naturalHeight === 0) {
        console.warn("Image dimensions not available");
        return;
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
      console.log(`Dimensions set: previewDimensions=${width}x${height}, imageLoaded=${true}, renderedWidth=${rect.width}`);
    } else {
      console.warn("Refs not available:", {
        originalImageRef: !!originalImageRef.current,
        previewPanelRef: !!previewPanelRef.current,
      });
    }
  };

  useEffect(() => {
    let retryTimeout: NodeJS.Timeout | null = null;
    let loadTimeout: NodeJS.Timeout | null = null;
    let retryCount = 0;
    const maxRetries = 10;

    if (originalImage && originalImageRef.current && previewPanelRef.current) {
      if (originalImageRef.current.complete) {
        console.log("Image already loaded, running updateDimensions");
        updateDimensions();
      } else {
        console.log("Image not yet loaded, adding load handler");
        const loadHandler = () => {
          console.log("Image load event triggered");
          updateDimensions();
        };
        originalImageRef.current.addEventListener("load", loadHandler);

        // Fallback timeout to ensure dimensions are updated
        loadTimeout = setTimeout(() => {
          console.log("Fallback timeout triggered");
          updateDimensions();
        }, 3000);

        return () => {
          if (originalImageRef.current) {
            originalImageRef.current.removeEventListener("load", loadHandler);
            console.log("Cleaned up load handler");
          }
        };
      }
    } else {
      console.log("Skipping useEffect: missing originalImage or refs", {
        originalImage,
        hasImageRef: !!originalImageRef.current,
        hasPanelRef: !!previewPanelRef.current,
      });
    }

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (retryTimeout) clearTimeout(retryTimeout);
      if (loadTimeout) clearTimeout(loadTimeout);
      console.log("Cleaned up useEffect");
    };
  }, [originalImage, aspectRatio, rotation]);

  // Trigger updateDimensions after processing completes
  useEffect(() => {
    if (!isProcessing && processedImage && originalImageRef.current && previewPanelRef.current) {
      console.log("Processed image ready, triggering updateDimensions");
      updateDimensions();
    }
  }, [isProcessing, processedImage]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
      console.log("Image uploaded:", {
        imageUrl,
        imageLoaded,
        previewDimensions,
      });
    }
  };

  const setupImage = async (imageUrl: string) => {
    try {
      const imageBlob = await removeBackground(imageUrl);
      setProcessedImage(imageBlob ? URL.createObjectURL(imageBlob) : imageUrl);
      console.log("Image processed:", { processedImage: imageBlob ? "set" : imageUrl });
    } catch (error) {
      console.error("Error removing background:", error);
      setProcessedImage(imageUrl);
      console.log("Image processing failed, using original:", { processedImage: imageUrl });
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
    console.log("Reset triggered");
  };

  const handleDownload = () => {
    console.log("Download clicked", { imageLoaded, previewDimensions });
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

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = originalImage;
    bgImg.onload = () => {
      ctx.drawImage(bgImg, 0, 0, width, height);

      if (text) {
        const textSet = {
          text,
          fontWeight: isBold ? "bold" : "normal",
          fontSize: textSize,
          fontFamily,
          color: textColor,
          opacity: textOpacity / 100,
          left: (textHorizontal / (width / 2)) * 50,
          top: (textVertical / (height / 2)) * -50,
          tiltX: 0,
          tiltY: 0,
          rotation: textRotation,
        };

        ctx.save();
        ctx.font = `${isItalic ? "italic" : ""} ${textSet.fontWeight} ${textSet.fontSize}px ${textSet.fontFamily}`;
        ctx.fillStyle = textSet.color;
        ctx.globalAlpha = textSet.opacity;
        ctx.textAlign = textAlign === "left" ? "right" : textAlign === "right" ? "left" : "center";
        ctx.textBaseline = "middle";

        const x = (width * (textSet.left + 50)) / 100;
        const y = (height * (50 - textSet.top)) / 100;

        ctx.translate(x, y);
        ctx.rotate((textSet.rotation * Math.PI) / 180);

        ctx.fillText(textSet.text, 0, 0);

        let underlineY = 0;
        let xStart = 0;
        let xEnd = 0;
        if (isUnderline) {
          const textWidth = ctx.measureText(textSet.text).width;
          underlineY = textSet.fontSize / 3 + 2;
          switch (ctx.textAlign) {
            case "right":
              xStart = 0;
              xEnd = -textWidth;
              break;
            case "left":
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

        console.log("Text rendered at:", {
          x,
          y,
          textWidth: ctx.measureText(text).width,
          textHorizontal,
          textVertical,
          textAlign,
          canvasTextAlign: ctx.textAlign,
          isItalic,
          isUnderline,
          underlineY,
          rotation: textSet.rotation,
          xStart,
          xEnd,
        });
      }

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
        console.log("Download triggered");
      }
    };
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen p-4 md:p-8 w-full mx-auto flex flex-col md:flex-row gap-4 md:gap-6">
        <LeftPanel
          previewPanelRef={previewPanelRef}
          isProcessing={isProcessing}
          originalImage={originalImage}
          processedImage={processedImage}
          previewDimensions={previewDimensions}
          originalImageRef={originalImageRef}
          imageRef={imageRef}
          rotation={rotation}
          brightness={brightness}
          contrast={contrast}
          aspectRatio={aspectRatio}
          text={text}
          originalImageWidth={originalImageWidth}
          textAlign={textAlign}
          getJustifyContent={getJustifyContent}
          textSize={textSize}
          fontFamily={fontFamily}
          textColor={textColor}
          textOpacity={textOpacity}
          textHorizontal={textHorizontal}
          textVertical={textVertical}
          textRotation={textRotation}
          isBold={isBold}
          isItalic={isItalic}
          isUnderline={isUnderline}
        />
        <RightPanel
          activeSection={activeSection}
          toggleSection={toggleSection}
          text={text}
          setText={setText}
          textSize={textSize}
          setTextSize={setTextSize}
          fontFamily={fontFamily}
          setFontFamily={setFontFamily}
          fontOptions={fontOptions}
          textColor={textColor}
          setTextColor={setTextColor}
          textOpacity={textOpacity}
          setTextOpacity={setTextOpacity}
          textHorizontal={textHorizontal}
          setTextHorizontal={setTextHorizontal}
          textVertical={textVertical}
          setTextVertical={setTextVertical}
          textRotation={textRotation}
          setTextRotation={setTextRotation}
          textAlign={textAlign}
          setTextAlign={setTextAlign}
          isBold={isBold}
          setIsBold={setIsBold}
          isItalic={isItalic}
          setIsItalic={setIsItalic}
          isUnderline={isUnderline}
          setIsUnderline={setIsUnderline}
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          rotation={rotation}
          setRotation={setRotation}
          brightness={brightness}
          setBrightness={setBrightness}
          contrast={contrast}
          setContrast={setContrast}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          imageLoaded={imageLoaded}
          previewDimensions={previewDimensions}
          handleReset={handleReset}
          handleDownload={handleDownload}
        />
      </main>
      <Footer />
    </>
  );
};

export default MainApp;