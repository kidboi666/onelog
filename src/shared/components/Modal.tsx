"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";
import {
  Dialog,
  DialogContent,
} from "@/shared/components/ui/dialog";

interface Props extends Omit<ComponentProps<typeof DialogContent>, "open" | "onOpenChange"> {
  className?: string;
}

export default function Modal({ children, className, ...props }: Props) {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open onOpenChange={handleOpenChange}>
      <DialogContent
        className={className}
        showCloseButton={false}
        {...props}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
