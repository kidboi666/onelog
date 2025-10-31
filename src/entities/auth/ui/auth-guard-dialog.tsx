"use client";

import type { ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

type AuthGuardDialogProps = {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSignInClick: () => void;
};

export const AuthGuardDialog = ({
  children,
  open,
  onOpenChange,
  onSignInClick,
}: AuthGuardDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인이 필요합니다.</DialogTitle>
          <DialogDescription>
            이 기능을 사용하려면 로그인이 필요합니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-2">
          <Button onClick={onSignInClick} className="flex-1">
            로그인 하러가기
          </Button>
          <Button
            variant="secondary"
            onClick={() => onOpenChange?.(false)}
            className="flex-1"
          >
            취소
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
