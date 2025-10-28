import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useTransition } from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  isSelected: boolean;
  icon: ReactNode;
  name: string;
  path: string;
  close?: () => void;
  viewText?: boolean;
  className?: string;
  closeToolTip?: () => void;
}

export default function MenuButton({
  isSelected,
  icon,
  viewText,
  name,
  close,
  path,
  className,
  closeToolTip,
}: Props) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const handleButtonClick = () => {
    startTransition(() => {
      router.push(path);
      closeToolTip?.();
      close?.();
    });
  };

  return (
    <Button
      variant={isSelected ? "default" : "ghost"}
      onClick={handleButtonClick}
      className={cn(
        "relative w-full justify-start gap-3",
        !viewText && "size-10 p-0 justify-center",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="size-5 animate-spin" />
      ) : (
        <span className="size-5 flex-shrink-0">{icon}</span>
      )}
      {viewText && (
        <span className={cn(isSelected ? "font-medium" : "font-normal")}>
          {name}
        </span>
      )}
    </Button>
  );
}
