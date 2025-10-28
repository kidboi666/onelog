"use client";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/_routes/constants";
import { useMe } from "@/app/_store/use-me";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

export default function PasswordResetForm() {
  const router = useRouter();
  const { me } = useMe();
  const handlePasswordReset = () => {
    router.push(ROUTES.MODAL.UPDATE_PASSWORD);
  };

  return (
    <div className="flex flex-col gap-4">
      {me ? (
        <>
          <Label className="font-bold text-lg">비밀번호 변경</Label>
          <p className="text-sm">
            이메일: <span className="text-gray-400">{me?.email}</span>
          </p>
          <Button onClick={handlePasswordReset} size="sm" className="w-fit">
            현재 이메일로 비밀번호 변경 이메일 보내기
          </Button>
        </>
      ) : (
        <>
          <Label className="font-bold text-lg">비밀번호 변경</Label>
          <Button disabled size="sm" className="w-fit">
            현재 이메일로 비밀번호 변경 이메일 보내기
          </Button>
        </>
      )}
    </div>
  );
}
