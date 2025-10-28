import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/_routes/constants";
import { useSignOut } from "@/entities/auth/api/mutates";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/components/ui/dropdown-menu";

interface Props {
  email: string;
  userName: string | null;
  meId: string;
  closeMenu?: () => void;
}

export default function LoggedInContent({
  meId,
  userName,
  email,
  closeMenu,
}: Props) {
  const router = useRouter();
  const { mutate: signOut } = useSignOut();

  const pushProfilePage = () => {
    router.push(ROUTES.PROFILE.VIEW(meId));
    closeMenu?.();
  };

  const pushEditProfilePage = () => {
    router.push(ROUTES.PROFILE.EDIT);
    closeMenu?.();
  };

  return (
    <>
      <DropdownMenuLabel>
        <div className="flex flex-col space-y-1">
          <p className="font-medium text-sm leading-none">{userName}</p>
          <p className="text-muted-foreground text-xs leading-none">{email}</p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={pushEditProfilePage}
        className="cursor-pointer gap-2"
      >
        <Settings className="size-4" />
        프로필 수정
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={pushProfilePage}
        className="cursor-pointer gap-2"
      >
        <User className="size-4" />
        프로필 페이지
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => signOut()}
        className="cursor-pointer gap-2"
      >
        <LogOut className="size-4" />
        로그아웃
      </DropdownMenuItem>
    </>
  );
}
