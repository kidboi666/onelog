"use client";

import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/utils/tw-merge";

export default function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // 초기 테마 설정
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex flex-col gap-4">
      <Label className="font-bold text-lg">다크 모드 설정</Label>
      <div className="flex gap-4">
        <DarkModeBlock
          theme="dark"
          selectedTheme={theme}
          onBlockClick={handleThemeChange}
        />
        <DarkModeBlock
          theme="light"
          selectedTheme={theme}
          onBlockClick={handleThemeChange}
        />
      </div>
    </div>
  );
}

interface DarkModeBlockProps {
  onBlockClick: (theme: string) => void;
  theme: string;
  selectedTheme: string | undefined;
}

function DarkModeBlock({
  onBlockClick,
  theme,
  selectedTheme,
}: DarkModeBlockProps) {
  return (
    <Button
      onClick={() => onBlockClick(theme)}
      variant="outline"
      size="sm"
      className={cn(
        "flex gap-2 font-semibold",
        theme === "light"
          ? "bg-white text-black"
          : "bg-var-black text-white",
        selectedTheme === theme && "ring-2 ring-primary"
      )}
    >
      {theme === "light" ? "밝은" : "어두운"} 화면
      {selectedTheme === theme && <Check className="size-4" />}
    </Button>
  );
}
