import { cn } from "@/shared/utils/tw-merge";

interface Props {
  pathname?: string;
  userId?: string;
  meId?: string | null;
  isSelected?: boolean;
}

export default function BookMark({
  pathname,
  userId,
  meId,
  isSelected,
}: Props) {
  const shouldShow = (pathname === "profile" && userId === meId) || isSelected;

  return (
    <div
      className={cn(
        "absolute -left-2 top-1/2 h-3/4 w-1 -translate-y-1/2 rounded-r-md bg-primary transition-all duration-300",
        shouldShow ? "scale-100 opacity-100" : "scale-0 opacity-0"
      )}
    />
  );
}
