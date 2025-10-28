"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import Modal from "@/shared/components/Modal";

export default function SuccessModal() {
  const router = useRouter();

  const handleEnterPush = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      router.back();
    }
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
        <DialogTitle>완료</DialogTitle>
        <DialogDescription>요청이 성공적으로 완료되었습니다.</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={() => router.back()} className="w-full">
          확인
        </Button>
      </DialogFooter>
    </Modal>
  );
}
