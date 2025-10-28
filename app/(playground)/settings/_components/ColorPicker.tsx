"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { ColorScheme } from "@/shared/types/enums";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/tw-merge";

const getColorClass = (color: ColorScheme): string => {
  switch (color) {
    case ColorScheme.BLACK:
      return "bg-var-black";
    case ColorScheme.GREEN:
      return "bg-var-green";
    case ColorScheme.YELLOW:
      return "bg-var-yellow";
    case ColorScheme.BLUE:
      return "bg-var-blue";
    case ColorScheme.ORANGE:
      return "bg-var-orange";
    default:
      return "bg-primary";
  }
};

export default function ColorPicker() {
  const [currentColor, setCurrentColor] = useState<ColorScheme>(
    ColorScheme.BLUE
  );

  useEffect(() => {
    const savedColor = localStorage.getItem("color-theme") as ColorScheme;
    if (savedColor) {
      setCurrentColor(savedColor);
    }
  }, []);

  const handleColorChange = (selectedColor: ColorScheme) => {
    setCurrentColor(selectedColor);
    localStorage.setItem("color-theme", selectedColor);
  };

  return (
    <div className="flex flex-col gap-4">
      <Label className="font-bold text-lg">색상 설정</Label>
      <div className="flex gap-4 overflow-y-auto">
        {Object.values(ColorScheme).map((color) => (
          <ColorBlock
            key={color}
            color={color}
            onClick={() => handleColorChange(color)}
            selectedColor={currentColor}
          />
        ))}
      </div>
    </div>
  );
}

interface ColorBlockProps {
  color: ColorScheme;
  onClick: (color: ColorScheme) => void;
  selectedColor: ColorScheme;
}

function ColorBlock({ color, onClick, selectedColor }: ColorBlockProps) {
  return (
    <Button
      variant="outline"
      onClick={() => onClick(color)}
      className={cn(
        getColorClass(color),
        "size-14 rounded-full border text-white dark:border-gray-500"
      )}
    >
      {selectedColor === color && <Check className="size-8" />}
    </Button>
  );
}
