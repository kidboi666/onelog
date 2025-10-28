import { PenSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/routes";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  isSelected?: boolean;
}

export default function SidebarWriteButtonWithLogo({ isSelected }: Props) {
  const router = useRouter();

  return (
    <div className="relative">
      <Button
        variant={isSelected ? "default" : "outline"}
        size="icon"
        onClick={() => router.push(ROUTES.POST.NEW)}
        className={cn(
          "relative transition-all",
          isSelected && "shadow-lg"
        )}
      >
        <PenSquare className="size-5" />
      </Button>
    </div>
  );
}
