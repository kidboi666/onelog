"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shared/components/ui/hover-card";
import AvatarButtonWithDropDownContent from "./AvatarButtonWithDropDownContent";

interface Props {
  avatarUrl: string | null;
  userId: string;
  userName: string | null;
  position?: "bottomRight" | "topRight" | "topLeft" | "bottomLeft";
}

export default function AvatarButtonWithDropDown({
  avatarUrl,
  userId,
  userName,
  position = "topRight",
}: Props) {
  // Convert position to align and side for HoverCard
  const getAlign = () => {
    if (position === "topRight" || position === "bottomRight") return "end";
    if (position === "topLeft" || position === "bottomLeft") return "start";
    return "center";
  };

  const getSide = () => {
    if (position === "topRight" || position === "topLeft") return "top";
    return "bottom";
  };

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <button className="cursor-pointer">
          <Avatar className="h-10 w-10 shadow-sm">
            <AvatarImage
              src={avatarUrl ?? undefined}
              alt={userName ?? "User"}
            />
            <AvatarFallback>
              {userName?.charAt(0).toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align={getAlign()}
        side={getSide()}
        className="w-80 p-0"
      >
        <AvatarButtonWithDropDownContent
          avatarUrl={avatarUrl}
          userName={userName}
          userId={userId}
        />
      </HoverCardContent>
    </HoverCard>
  );
}
