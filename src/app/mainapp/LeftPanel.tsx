import React from "react";
import { RefObject } from "react";

interface LeftPanelProps {
  previewPanelRef: RefObject<HTMLDivElement>;
  isProcessing: boolean;
  originalImage: string | null;
  processedImage: string | null;
  previewDimensions: { width: number; height: number } | null;
  originalImageRef: RefObject<HTMLImageElement>;
  imageRef: RefObject<HTMLImageElement>;
  rotation: number;
  brightness: number;
  contrast: number;
  aspectRatio: "original" | "16:9" | "1:1" | "4:3";
  text: string;
  originalImageWidth: number | null;
  textAlign: "left" | "center" | "right";
  getJustifyContent: () => string;
  textSize: number;
  fontFamily: string;
  textColor: string;
  textOpacity: number;
  textHorizontal: number;
  textVertical: number;
  textRotation: number;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  previewPanelRef,
  isProcessing,
  originalImage,
  processedImage,
  previewDimensions,
  originalImageRef,
  imageRef,
  rotation,
  brightness,
  contrast,
  aspectRatio,
  text,
  originalImageWidth,
  textAlign,
  getJustifyContent,
  textSize,
  fontFamily,
  textColor,
  textOpacity,
  textHorizontal,
  textVertical,
  textRotation,
  isBold,
  isItalic,
  isUnderline,
}) => {
  return (
    <div
      ref={previewPanelRef}
      className="flex-1 flex justify-center items-center border rounded-lg p-4 relative max-h-[60vh] md:max-h-[80vh] overflow-auto w-full"
    >
      {isProcessing ? (
        <span className="text-blue-600 animate-pulse">Processing image...</span>
      ) : originalImage ? (
        <div
          className="relative w-full"
          style={{
            aspectRatio: previewDimensions
              ? `${previewDimensions.width} / ${previewDimensions.height}`
              : "1 / 1",
            maxWidth: previewDimensions ? `${previewDimensions.width}px` : "100%",
            maxHeight: previewDimensions ? `${previewDimensions.height}px` : "100%",
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
                width: originalImageWidth ? `${originalImageWidth}px` : "100%",
                left: originalImageWidth ? `calc(50% - ${originalImageWidth / 2}px)` : "0",
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
  );
};

export default LeftPanel;