import { LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/_routes/constants";
import { DropdownMenuItem } from "@/shared/components/ui/dropdown-menu";

interface Props {
  closeMenu?: () => void;
}

export default function GuestContent({ closeMenu }: Props) {
  const router = useRouter();

  const pushSignUpPage = () => {
    router.push(ROUTES.MODAL.AUTH.SIGN_UP);
    closeMenu?.();
  };

  const pushSignInPage = () => {
    router.push(ROUTES.MODAL.AUTH.SIGN_IN);
    closeMenu?.();
  };

  return (
    <>
      <DropdownMenuItem
        onClick={pushSignUpPage}
        className="cursor-pointer gap-2"
      >
        <UserPlus className="size-4" />
        회원가입
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={pushSignInPage}
        className="cursor-pointer gap-2"
      >
        <LogIn className="size-4" />
        로그인
      </DropdownMenuItem>
    </>
  );
}
