"use client";

import {
  Home,
  ListTodo,
  LogIn,
  Menu,
  Moon,
  PenSquare,
  Settings,
  Sun,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { ROUTES } from "@/app/_routes/constants";
import { useMe } from "@/app/_store/use-me";
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
import { cn } from "@/shared/utils/tw-merge";

const TOP_MENUS = [
  {
    id: "home",
    name: "홈",
    icon: Home,
    path: ROUTES.HOME,
  },
  {
    id: "todo",
    name: "할일",
    icon: ListTodo,
    path: ROUTES.TODO.TODO,
  },
];

const BOTTOM_MENUS = [
  {
    id: "settings",
    name: "설정",
    icon: Settings,
    path: ROUTES.SETTINGS,
  },
];

const AUTH_MENUS = [
  {
    id: "signin",
    name: "로그인",
    icon: LogIn,
    path: ROUTES.MODAL.AUTH.SIGN_IN,
  },
  {
    id: "signup",
    name: "회원가입",
    icon: UserPlus,
    path: ROUTES.MODAL.AUTH.SIGN_UP,
  },
];

export default function Header() {
  const { me } = useMe();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

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
      router.push(ROUTES.PROFILE.VIEW(me.id));
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 sm:hidden">
      <div className="w-full rounded-md bg-background/60 p-2 shadow-lg backdrop-blur-xl">
        <div className="flex h-full items-center justify-between">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-3/4">
              <SheetHeader>
                <SheetTitle>메뉴</SheetTitle>
              </SheetHeader>

              <div className="mt-4 flex flex-col gap-4">
                {/* Write Button */}
                <Button
                  variant={pathname === ROUTES.POST.NEW ? "default" : "outline"}
                  className="w-full justify-start gap-2"
                  asChild
                  onClick={() => setOpen(false)}
                >
                  <Link href={ROUTES.POST.NEW}>
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

                {/* Bottom Navigation */}
                <div className="flex flex-col gap-2">
                  {BOTTOM_MENUS.map((menu) => {
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
                    {AUTH_MENUS.map((menu) => {
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
                )}

                <div className="mt-4 text-center text-muted-foreground text-xs">
                  © 2024 One-Sentence. All rights reserved.
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleThemeToggle}
            className="flex items-center gap-2"
          >
            <div className="flex size-6 items-center justify-center overflow-hidden">
              <div
                className={cn(
                  "transition-transform duration-300",
                  theme === "dark" ? "-translate-y-6" : "translate-y-0",
                )}
              >
                <Sun className="size-5" />
                <Moon className="size-5" />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
