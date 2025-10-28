import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import Link from "next/link";
import { ROUTES } from "@/app/routes";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";

type EmotionLevel = 1 | 2 | 3 | 4 | 5;
type PostType = "journal" | "article";

interface Props {
  avatarUrl: string | null;
  userName: string | null;
  email: string | null;
  emotionLevel: EmotionLevel | null;
  createdAt: string;
  userId: string;
  createdAtLiked?: string;
  postType: PostType;
}

export default function PostHeader({
  avatarUrl,
  userName,
  email,
  createdAtLiked,
  emotionLevel,
  userId,
  createdAt,
  postType,
}: Props) {
  const displayName = userName || email?.split("@")[0] || "익명";
  const timeAgo = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: ko,
  });

  return (
    <div className="flex w-full items-center gap-3">
      <Link href={ROUTES.PROFILE.VIEW(userId)}>
        <Avatar className="size-10 cursor-pointer">
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex flex-1 flex-col">
        <Link
          href={ROUTES.PROFILE.VIEW(userId)}
          className="font-medium text-sm hover:underline"
        >
          {displayName}
        </Link>
        <div className="flex items-center gap-2 text-muted-foreground text-xs">
          <span>{timeAgo}</span>
          {postType === "journal" && <Badge variant="outline">일기</Badge>}
          {createdAtLiked && <span>• {createdAtLiked}에 좋아요함</span>}
        </div>
      </div>
      {emotionLevel && (
        <Badge variant="secondary" className="ml-auto">
          감정 레벨 {emotionLevel}
        </Badge>
      )}
    </div>
  );
}
