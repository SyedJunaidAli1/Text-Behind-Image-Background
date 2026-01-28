"use client";
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
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from "@/components/ui/color-picker";
import Color from "color";

type ColorInput =
  | string
  | [number, number, number]
  | [number, number, number, number];

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
  const handleColorChange = (color: ColorInput) => {
    try {
      let colorObj: Color;

      if (Array.isArray(color)) {
        const [r, g, b, a = 1] = color;
        colorObj = Color.rgb(r, g, b).alpha(a);
      } else {
        colorObj = Color(color);
      }

      // normalize EVERYTHING to hex (or rgba if you prefer)
      setTextColor(colorObj.hex());
    } catch (error) {
      console.error("Color conversion error:", error);
    }
  };
  return (
    <div className="w-full md:w-80 border rounded-lg p-4 md:p-6 shadow-sm max-h-[80vh] md:max-h-[80vh] overflow-auto">
      <Tabs
        value={activeSection ?? "text"}
        onValueChange={toggleSection}
        className="mb-4 md:mb-6"
      >
        <TabsList className="grid grid-cols-3 gap-2">
          <TabsTrigger
            value="text"
            className="flex items-center gap-2 text-xs md:text-sm"
          >
            <Type className="h-4 w-4" />
            Text
          </TabsTrigger>

          <TabsTrigger
            value="image"
            className="flex items-center gap-2 text-xs md:text-sm"
          >
            <Camera className="h-4 w-4" />
            Image
          </TabsTrigger>

          <TabsTrigger
            value="settings"
            className="flex items-center gap-2 text-xs md:text-sm"
          >
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
      </Tabs>

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
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-medium">
                Text Color
              </label>

              <ColorPicker
                onChange={handleColorChange}
                className="max-w-sm h-70 rounded-md border bg-background p-4 shadow-sm"
              >
                <ColorPickerSelection className="h-24" />
                <div className="flex  items-center gap-4">
                  <div className="grid w-full gap-1">
                    <ColorPickerHue />
                    <ColorPickerAlpha />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ColorPickerOutput />
                  <ColorPickerFormat />
                </div>
              </ColorPicker>
            </div>
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
          <div className="flex flex-col gap-2">
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

              <ToggleGroupItem
                value="underline"
                aria-label="Underline (toggle)"
              >
                <Underline className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      )}
      {activeSection === "image" && (
        <div className="space-y-4 md:space-y-6">
          <label className="flex flex-col gap-2">
            <span className="text-xs md:text-sm font-medium">Choose File</span>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
            />

            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Image
            </Button>
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
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
};

export default RightPanel;
