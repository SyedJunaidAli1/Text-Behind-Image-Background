import React from "react";
import Select from "react-select";
import { RefObject } from "react";
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

interface RightPanelProps {
  activeSection: string | null;
  toggleSection: (section: string) => void;
  text: string;
  setText: (text: string) => void;
  textSize: number;
  setTextSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontOptions: { value: string; label: string }[];
  textColor: string;
  setTextColor: (color: string) => void;
  textOpacity: number;
  setTextOpacity: (opacity: number) => void;
  textHorizontal: number;
  setTextHorizontal: (horizontal: number) => void;
  textVertical: number;
  setTextVertical: (vertical: number) => void;
  textRotation: number;
  setTextRotation: (rotation: number) => void;
  textAlign: "left" | "center" | "right";
  setTextAlign: (align: "left" | "center" | "right") => void;
  isBold: boolean;
  setIsBold: (bold: boolean) => void;
  isItalic: boolean;
  setIsItalic: (italic: boolean) => void;
  isUnderline: boolean;
  setIsUnderline: (underline: boolean) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
  rotation: number;
  setRotation: (rotation: number) => void;
  brightness: number;
  setBrightness: (brightness: number) => void;
  contrast: number;
  setContrast: (contrast: number) => void;
  aspectRatio: "original" | "16:9" | "1:1" | "4:3";
  setAspectRatio: (ratio: "original" | "16:9" | "1:1" | "4:3") => void;
  imageLoaded: boolean;
  previewDimensions: { width: number; height: number } | null;
  handleReset: () => void;
  handleDownload: () => void;
}

const RightPanel: React.FC<RightPanelProps> = ({
  activeSection,
  toggleSection,
  text,
  setText,
  textSize,
  setTextSize,
  fontFamily,
  setFontFamily,
  fontOptions,
  textColor,
  setTextColor,
  textOpacity,
  setTextOpacity,
  textHorizontal,
  setTextHorizontal,
  textVertical,
  setTextVertical,
  textRotation,
  setTextRotation,
  textAlign,
  setTextAlign,
  isBold,
  setIsBold,
  isItalic,
  setIsItalic,
  isUnderline,
  setIsUnderline,
  handleFileChange,
  fileInputRef,
  rotation,
  setRotation,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  aspectRatio,
  setAspectRatio,
  imageLoaded,
  previewDimensions,
  handleReset,
  handleDownload,
}) => {
  return (
    <div className="w-full md:w-80 border rounded-lg p-4 md:p-6 shadow-sm max-h-[80vh] md:max-h[80vh] overflow-auto">
      <div className="flex gap-2 md:gap-3 mb-4 md:mb-6">
        <button
          onClick={() => toggleSection("text")}
          className={`flex-1 py-2 px-2 md:px-3 text-xs md:text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 ${
            activeSection === "text"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105"
          }`}
        >
          <Type size={14} className="md:w-4 md:h-4" />
          Text
        </button>
        <button
          onClick={() => toggleSection("image")}
          className={`flex-1 py-2 px-2 md:px-3 text-xs md:text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 ${
            activeSection === "image"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:scale-105"
          }`}
        >
          <Camera size={14} className="md:w-4 md:h-4" />
          Image
        </button>
        <button
          onClick={() => toggleSection("settings")}
          className={`flex-1 py-2 px-2 md:px-3 text-xs md:text-sm font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-1 md:gap-2 ${
            activeSection === "settings"
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
              value={fontOptions.find((option) => option.value === fontFamily) || null}
              onChange={(selectedOption) => {
                console.log("Selected font:", selectedOption ? selectedOption.value : "Arial");
                setFontFamily(selectedOption ? selectedOption.value : "Arial");
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
                  borderColor: state.isFocused ? "var(--primary)" : "var(--border)",
                  boxShadow: state.isFocused ? `0 0 0 2px var(--primary)` : "none",
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
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  marginTop: "2px",
                }),
                option: (baseStyles, state) => ({
                  ...baseStyles,
                  backgroundColor: state.isSelected
                    ? "var(--primary)"
                    : state.isFocused
                    ? "var(--secondary)"
                    : "var(--background)",
                  color: state.isSelected ? "var(--primary-foreground)" : "var(--foreground)",
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
              className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${
                textAlign === "left"
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              <AlignLeft className="w-4 h-4 md:w-4 md:h-4" />
            </button>
            <button
              onClick={() => setTextAlign("center")}
              className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${
                textAlign === "center"
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              <AlignCenter className="w-4 h-4 md:w-4 md:h-4" />
            </button>
            <button
              onClick={() => setTextAlign("right")}
              className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${
                textAlign === "right"
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              <AlignRight className="w-4 h-4 md:w-4 md:h-4" />
            </button>
            <button
              onClick={() => setIsBold(!isBold)}
              className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${
                isBold
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Bold className="w-4 h-4 md:w-4 md:h-4" />
            </button>
            <button
              onClick={() => setIsItalic(!isItalic)}
              className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${
                isItalic
                  ? "bg-black text-white"
                  : "bg-white text-black border-gray-300 hover:bg-gray-100"
              }`}
            >
              <Italic className="w-4 h-4 md:w-4 md:h-4" />
            </button>
            <button
              onClick={() => setIsUnderline(!isUnderline)}
              className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-md border ${
                isUnderline
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
                setAspectRatio(e.target.value as "original" | "16:9" | "1:1" | "4:3")
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
  );
};

export default RightPanel;