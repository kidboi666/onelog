"use client";

import { LogIn, Moon, PenSquare, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {useEffect, useState} from "react";
import { useMe } from "@/app/_store/use-me";
import { SignInDialog, SignUpDialog } from "@/features/auth/ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { ROUTES } from "@/shared/routes/constants";
import { cn } from "@/shared/utils/tw-merge";
import { BOTTOM_MENUS, TOP_MENUS } from "@/widgets/sidebar/model/menu-items";

export function Sidebar() {
  const { me } = useMe();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null

  const isActive = (menuPath: string) => {
    if (menuPath === ROUTES.HOME) {
      return pathname === menuPath;
    }
    return pathname.startsWith(menuPath);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleAuthClick = () => {
    if (me) {
      router.push(ROUTES.PROFILE.VIEW(me.id));
    } else {
      setShowSignIn(true);
    }
  };

  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleSwitchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  return (
    <TooltipProvider delayDuration={0}>
      <nav className="lg:-translate-y-1/2 fixed bottom-4 left-4 z-40 hidden h-fit w-16 flex-col gap-2 rounded-lg bg-card p-2 shadow-md sm:flex lg:top-1/2">
        {/* Write Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={pathname === ROUTES.POST.NEW ? "default" : "ghost"}
              size="icon"
              className="relative h-12 w-12"
              asChild
            >
              <Link href={ROUTES.POST.NEW}>
                <PenSquare className="size-5" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>글쓰기</p>
          </TooltipContent>
        </Tooltip>

        <Separator />

        {/* Top Navigation */}
        <div className="flex flex-col gap-2">
          {TOP_MENUS.map((menu) => {
            const Icon = menu.icon;
            const active = isActive(menu.path);

            return (
              <Tooltip key={menu.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="icon"
                    className={cn(
                      "relative h-12 w-12",
                      active && "bg-primary text-primary-foreground",
                    )}
                    asChild
                  >
                    <Link href={menu.path}>
                      <Icon className="size-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{menu.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        <div className="mt-auto flex flex-col gap-2">
          {/* Bottom Navigation */}
          {BOTTOM_MENUS.map((menu) => {
            const Icon = menu.icon;
            const active = isActive(menu.path);

            return (
              <Tooltip key={menu.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={active ? "default" : "ghost"}
                    size="icon"
                    className={cn(
                      "relative h-12 w-12",
                      active && "bg-primary text-primary-foreground",
                    )}
                    asChild
                  >
                    <Link href={menu.path}>
                      <Icon className="size-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{menu.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}

          {/* Theme Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12"
                onClick={handleThemeToggle}
              >
                {theme === "dark" ? (
                  <Moon className="size-5" />
                ) : (
                  <Sun className="size-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>테마 변경</p>
            </TooltipContent>
          </Tooltip>

          <Separator />

          {/* Auth / Profile Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12"
                onClick={handleAuthClick}
              >
                {me ? (
                  <Avatar className="size-8">
                    <AvatarImage src={me.avatarUrl || undefined} />
                    <AvatarFallback>
                      {me.userName?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <LogIn className="size-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{me ? "프로필" : "로그인"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>

      {/* Auth Dialogs */}
      <SignInDialog
        open={showSignIn}
        onOpenChange={setShowSignIn}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
      <SignUpDialog
        open={showSignUp}
        onOpenChange={setShowSignUp}
        onSwitchToSignIn={handleSwitchToSignIn}
      />
    </TooltipProvider>
  );
}
