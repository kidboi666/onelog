"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES } from "@/app/_routes/constants";
import Modal from "@/shared/components/Modal";
import { Button } from "@/shared/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

export default function AuthGuardModal() {
  const router = useRouter();

  const pushSignIn = () => {
    router.replace(ROUTES.MODAL.AUTH.SIGN_IN);
  };

  const handleEnterPush = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      pushSignIn();
    }
  };

  const pushBack = () => {
    router.back();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEnterPush);

    return () => {
      document.removeEventListener("keydown", handleEnterPush);
    };
  }, []);

  return (
    <Modal>
      <DialogHeader>
        <DialogTitle>로그인이 필요합니다.</DialogTitle>
        <DialogDescription>
          이 기능을 사용하려면 로그인이 필요합니다.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex-row gap-2">
        <Button onClick={pushSignIn} className="flex-1">
          로그인 하러가기
        </Button>
        <Button variant="secondary" onClick={pushBack} className="flex-1">
          취소
        </Button>
      </DialogFooter>
    </Modal>
  );
}
