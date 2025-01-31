import { LucideIcon } from "lucide-react";
import { SearchHistory } from "www/app/(ai)/layout";

export interface MenuItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface AppSidebarProps {
  user: User;
  history: SearchHistory[];
}