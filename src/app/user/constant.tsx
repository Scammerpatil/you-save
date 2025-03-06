import { HomeIcon, ListIcon, BookmarkIcon } from "lucide-react";
import { SideNavItem } from "@/types/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/user/dashboard",
    icon: <HomeIcon width="24" height="24" />,
  },
  {
    title: "Saved Links",
    path: "/user/saved-links",
    icon: <BookmarkIcon width="24" height="24" />,
  },
  {
    title: "Categories",
    path: "/user/categories",
    icon: <ListIcon width="24" height="24" />,
  },
];
