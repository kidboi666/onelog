"use client";

import { useMe } from "@/app/_store/use-me";
import { useSignOut } from "@/entities/auth/api/mutates";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";

export default function LogoutButton() {
  const { me } = useMe();
  const { mutate: signOut } = useSignOut();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex flex-col gap-4">
      <Label className="font-bold text-lg">로그아웃</Label>
      <Button
        size="sm"
        onClick={handleSignOut}
        disabled={!me}
        className="w-fit"
      >
        로그아웃 하기
      </Button>
    </div>
  );
}
