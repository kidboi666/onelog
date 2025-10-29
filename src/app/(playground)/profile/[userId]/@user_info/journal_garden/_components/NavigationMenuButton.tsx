import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useTransition } from "react";
import { ROUTES } from "@/shared/routes/constants";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/tw-merge";
import type { PROFILE_NAVIGATE_MENUS } from "../../../_constants/navigate";

interface Props {
  segment: string | null;
  menu: (typeof PROFILE_NAVIGATE_MENUS)[number];
  counts: { count: number | null; postType: "journal" | "article" }[];
  likedCount: number | null;
  userId: string;
}

export default function NavigationMenuButton({
  segment,
  menu,
  counts,
  likedCount,
  userId,
}: Props) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      router.push(ROUTES.PROFILE.VIEW(userId, menu.path));
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        "flex-1 rounded-md font-medium text-zinc-500",
        segment === menu.path && "bg-zinc-100 dark:bg-var-dark",
      )}
    >
      {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
      {menu.name}
      {counts.map(
        (data: any) =>
          data.postType === menu.path && (
            <Fragment key={data.postType}>
              <span className="ml-1 text-muted-foreground text-xs">
                {data.count}
              </span>
            </Fragment>
          ),
      )}
      {menu.path === "liked" && (
        <span className="ml-1 text-muted-foreground text-xs">{likedCount}</span>
      )}
    </Button>
  );
}
