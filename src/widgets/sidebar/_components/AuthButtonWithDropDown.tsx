import { useState } from "react";
import type { IUserInfo } from "@/entities/user/model/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import GuestContent from "./GuestContent";
import LoggedInContent from "./LoggedInContent";

interface Props {
  pathname: string;
  userId: string;
  me: IUserInfo | null;
  viewText?: boolean;
  closeMenu?: () => void;
}

export default function AuthButtonWithDropDown({
  me,
  viewText,
  closeMenu,
}: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    closeMenu?.();
  };

  const displayName =
    me?.userName || me?.email?.split("@")[0] || "익명";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-muted">
          <Avatar className="size-10">
            <AvatarImage src={me?.avatarUrl || undefined} />
            <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          {viewText && (
            <span className="text-muted-foreground text-sm">
              {me?.email}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {me ? (
          <LoggedInContent
            email={me.email}
            userName={me.userName}
            meId={me.id}
            closeMenu={handleClose}
          />
        ) : (
          <GuestContent closeMenu={handleClose} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
