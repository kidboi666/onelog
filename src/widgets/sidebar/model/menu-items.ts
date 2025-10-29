import { Home, Settings } from "lucide-react";
import { ROUTES } from "@/shared/routes/constants";

export const TOP_MENUS = [
  {
    id: "home",
    name: "홈",
    icon: Home,
    path: ROUTES.HOME,
  },
];

export const BOTTOM_MENUS = [
  {
    id: "settings",
    name: "설정",
    icon: Settings,
    path: ROUTES.SETTINGS,
  },
];
