import { cn } from "@/shared/utils/tw-merge";

interface Props {
  isSelected?: boolean;
}

export default function SelectedMenuBackground({ isSelected }: Props) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-primary opacity-10 transition-transform duration-300",
        isSelected ? "scale-100" : "scale-0"
      )}
    />
  );
}
