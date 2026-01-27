import React from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
    <div className="w-full md:w-80 border rounded-lg p-4 md:p-6 shadow-sm max-h-[80vh] md:max-h-[80vh] overflow-auto">
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
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
            />
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
              <span>Font Size</span>
              <span>{textSize}px</span>
            </label>
            <Slider
              min={16}
              max={1000}
              value={[textSize]}
              onValueChange={([val]) => setTextSize(val)}
            />
          </div>
          <div>
            <label className="block text-xs md:text-sm font-medium mb-1 md:mb-2">
              Font Family
            </label>
            <Select
              value={fontFamily}
              onValueChange={(value) => {
                console.log("Selected font:", value);
                setFontFamily(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a font..." />
              </SelectTrigger>

              <SelectContent>
                {fontOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Slider
              min={0}
              max={100}
              step={1}
              value={[textOpacity]}
              onValueChange={([val]) => setTextOpacity(val)}
            />
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
              <span>Text Horizontal Position</span>
              <span>{textHorizontal}px</span>
            </label>
            <Slider
              min={-100}
              max={100}
              step={1}
              value={[textHorizontal]}
              onValueChange={([val]) => setTextHorizontal(val)}
            />
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
              <span>Text Vertical Position</span>
              <span>{textVertical}px</span>
            </label>
            <Slider
              min={-100}
              max={100}
              step={1}
              value={[textVertical]}
              onValueChange={([val]) => setTextVertical(val)}
            />
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
              <span>Text Rotation</span>
              <span>{textRotation}°</span>
            </label>
            <Slider
              min={-180}
              max={180}
              step={1}
              value={[textRotation]}
              onValueChange={([val]) => setTextRotation(val)}
            />
          </div>
          <div className="flex mx-auto">
            <ToggleGroup
              type="single"
              value={textAlign}
              onValueChange={(value) => {
                if (value) setTextAlign(value as "left" | "center" | "right");
              }}
              className="flex gap-2"
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeft className="h-4 w-4" />
              </ToggleGroupItem>

              <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenter className="h-4 w-4" />
              </ToggleGroupItem>

              <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRight className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            <ToggleGroup
              type="multiple"
              value={[
                isBold && "bold",
                isItalic && "italic",
                isUnderline && "underline",
              ].filter(Boolean)}
              onValueChange={(values) => {
                setIsBold(values.includes("bold"));
                setIsItalic(values.includes("italic"));
                setIsUnderline(values.includes("underline"));
              }}
              className="flex gap-2 mt-2"
              variant="outline"
              size="sm"
            >
              <ToggleGroupItem value="bold" aria-label="Bold (toggle)">
                <Bold className="h-4 w-4" />
              </ToggleGroupItem>

              <ToggleGroupItem value="italic" aria-label="Italic (toggle)">
                <Italic className="h-4 w-4" />
              </ToggleGroupItem>

              <ToggleGroupItem value="underline" aria-label="Underline (toggle)">
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
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
            <Slider
              min={-180}
              max={180}
              step={1}
              value={[rotation]}
              onValueChange={([val]) => setRotation(val)}
            />
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
              <span>Brightness</span>
              <span>{brightness}%</span>
            </label>
            <Slider
              min={0}
              max={200}
              step={1}
              value={[brightness]}
              onValueChange={([val]) => setBrightness(val)}
            />
          </div>
          <div>
            <label className="text-xs md:text-sm font-medium mb-1 md:mb-2 flex justify-between">
              <span>Contrast</span>
              <span>{contrast}%</span>
            </label>
            <Slider
              min={0}
              max={200}
              step={1}
              value={[contrast]}
              onValueChange={([val]) => setContrast(val)}
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
            <Select value={aspectRatio} onValueChange={setAspectRatio}>
              <SelectTrigger>
                <SelectValue placeholder="Aspect ratio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="original">Original</SelectItem>
                <SelectItem value="16:9">16:9</SelectItem>
                <SelectItem value="1:1">1:1</SelectItem>
                <SelectItem value="4:3">4:3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      <div className="flex gap-2 md:gap-4 justify-end mt-3 md:mt-4">
        <Button
          onClick={handleReset}
          disabled={!imageLoaded || !previewDimensions}
        >
          Reset
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!imageLoaded || !previewDimensions}
        >
          Download
        </Button>
      </div>
    </div>
  );
};

export default RightPanel;
