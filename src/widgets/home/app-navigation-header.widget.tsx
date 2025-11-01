"use client";

import { LogIn, Menu, Moon, PenSquare, Sun, UserPlus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SignInDialog } from "@/features/auth/sign-in/sign-in.ui";
import { SignUpDialog } from "@/features/auth/sign-up/sign-up.ui";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/shared/routes";
import { useMe } from "@/shared/store/use-me";
import { TOP_MENUS } from "@/widgets/home/app-navigation-header.model";

export const Header = () => {
  const { me } = useMe();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isActive = (menuPath: string) => {
    if (menuPath === ROUTES.HOME) {
      return pathname === menuPath;
    }
    return pathname.startsWith(menuPath);
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleProfileClick = () => {
    if (me) {
      router.push(ROUTES.USER.VIEW(me.id));
      setOpen(false);
    }
  };

  const handleSignInClick = () => {
    setOpen(false);
    setShowSignIn(true);
  };

  const handleSignUpClick = () => {
    setOpen(false);
    setShowSignUp(true);
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
    <>
      <header className="sticky top-0 z-50 sm:hidden">
        <nav className="w-full rounded-md bg-background/60 p-2 shadow-lg backdrop-blur-xl">
          <div className="flex h-full items-center justify-between">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-3/4 px-4">
                <SheetHeader>
                  <SheetTitle>메뉴</SheetTitle>
                </SheetHeader>

                <div className="mt-4 flex flex-col gap-4">
                  {/* Write Button */}
                  <Button
                    variant={
                      pathname === ROUTES.ARTICLE.NEW ? "default" : "outline"
                    }
                    className="w-full justify-start gap-2"
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link href={ROUTES.ARTICLE.NEW}>
                      <PenSquare className="size-5" />
                      <span>글쓰기</span>
                    </Link>
                  </Button>

                  <Separator />

                  {/* Top Navigation */}
                  <div className="flex flex-col gap-2">
                    {TOP_MENUS.map((menu) => {
                      const Icon = menu.icon;
                      const active = isActive(menu.path);

                      return (
                        <Button
                          key={menu.id}
                          variant={active ? "default" : "ghost"}
                          className="w-full justify-start gap-2"
                          asChild
                          onClick={() => setOpen(false)}
                        >
                          <Link href={menu.path}>
                            <Icon className="size-5" />
                            <span>{menu.name}</span>
                          </Link>
                        </Button>
                      );
                    })}
                  </div>

                  <div className="flex-1" />

                  <Separator />

                  {/* Auth / Profile Section */}
                  {me ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={handleProfileClick}
                    >
                      <Avatar className="size-8">
                        <AvatarImage src={me.avatarUrl || undefined} />
                        <AvatarFallback>
                          {me.userName?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span>{me.userName}</span>
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        onClick={handleSignInClick}
                      >
                        <LogIn className="size-5" />
                        <span>로그인</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        onClick={handleSignUpClick}
                      >
                        <UserPlus className="size-5" />
                        <span>회원가입</span>
                      </Button>
                    </div>
                  )}

                  <div className="mt-4 text-center text-muted-foreground text-xs">
                    © 2024 One-Sentence. All rights reserved.
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
              <div className="flex size-5 overflow-hidden">
                <div
                  className={cn(
                    "transition-transform duration-300",
                    theme === "dark" ? "-translate-y-5" : "translate-y-0",
                  )}
                >
                  <Sun className="size-5" />
                  <Moon className="size-5" />
                </div>
              </div>
            </Button>
          </div>
        </nav>
      </header>
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
    </>
  );
};
