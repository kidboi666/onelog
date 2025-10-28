import { PenSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/routes";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/tw-merge";

interface Props {
  isSelected?: boolean;
  closeMenu: () => void;
}

export default function MobileWriteButtonWithLogo({
  isSelected,
  closeMenu,
}: Props) {
  const router = useRouter();

  const pushWritePage = () => {
    router.push(ROUTES.POST.NEW);
    closeMenu();
  };

  return (
    <div className="relative">
      <Button
        variant={isSelected ? "default" : "ghost"}
        onClick={pushWritePage}
        className="w-full justify-start gap-3"
      >
        <PenSquare className="size-5" />
        <span className={cn(isSelected ? "font-medium" : "font-normal")}>
          글쓰기
        </span>
      </Button>
      {isSelected && (
        <div className="absolute -left-2 top-1/2 h-3/4 w-1 -translate-y-1/2 rounded-r-md bg-primary" />
      )}
    </div>
  );
}
