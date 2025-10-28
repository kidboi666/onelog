import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface Props {
  isOpen: boolean;
  onClick: () => void;
}

export default function OpenButton({ isOpen, onClick }: Props) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className="w-full">
      {isOpen ? (
        <PanelLeftClose className="size-5" />
      ) : (
        <PanelLeftOpen className="size-5" />
      )}
    </Button>
  );
}
