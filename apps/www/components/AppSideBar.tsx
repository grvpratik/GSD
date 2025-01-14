"use client";
import { MessageSquare, UserIcon, LucideIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { memo } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "www/components/ui/sidebar";
import SideBarSearch from "./ui/search";
import { NavUser } from "./NavUser";

interface MenuItem {
	title: string;
	url: string;
	icon: LucideIcon;
}

interface User {
	name: string;
	email: string;
	avatar: string;
}

interface AppSidebarProps {
	user: User;
}

const menuItems: MenuItem[] = [
	{
		title: "Logo Generator",
		url: "/logo-generator",
		icon: MessageSquare,
	},

	{
		title: "saas generator",
		url: "/build/id/calendar",
		icon: MessageSquare,
	},
	{
		title: "ai writer",
		url: "/build/id/calendar",
		icon: MessageSquare,
	},
	{
		title: "face generator",
		url: "/build/id/calendar",
		icon: MessageSquare,
	},
	{
		title: "voice cloner",
		url: "/build/id/calendar",
		icon: MessageSquare,
	},
	{
		title: "Ai agent",
		url: "/build/id/calendar",
		icon: MessageSquare,
	},
	{
		title: "logo generator  ",
		url: "/build/id/calendar",
		icon: MessageSquare,
	},
];

const MemoizedSidebarItem = memo(({ item }: { item: MenuItem }) => (
	<SidebarMenuItem key={item.title}>
		<SidebarMenuButton asChild>
			<a href={item.url} className="flex items-center gap-2">
				<item.icon className="h-4 w-4" />
				<span className="truncate">{item.title}</span>
			</a>
		</SidebarMenuButton>
	</SidebarMenuItem>
));
MemoizedSidebarItem.displayName = "MemoizedSidebarItem";

export function AppSidebar({ user }: AppSidebarProps) {
	const [searchQuery, setSearchQuery] = useState("");

	const filteredItems = useMemo(
		() =>
			menuItems.filter((item) =>
				item.title.toLowerCase().includes(searchQuery.toLowerCase())
			),
		[searchQuery]
	);

	return (
		<Sidebar className="rounded-xl border-3 overflow-hidden mx-2 font-sans">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<div className="flex gap-2 items-center p-2">
							<div className="flex py-2 aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
								<UserIcon className="size-3" />
							</div>
							<span className="truncate font-semibold">BuildAi</span>
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SideBarSearch
								onSearchChange={(query: string) => setSearchQuery(query)}
								value={searchQuery}
							/>
							<SidebarGroupLabel>Previous</SidebarGroupLabel>
							{filteredItems.length === 0 ?
								<div className="px-4 py-2 text-sm text-muted-foreground">
									No items found
								</div>
							:	filteredItems.map((item) => (
									<MemoizedSidebarItem key={item.title} item={item} />
								))
							}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<NavUser user={user} />
		</Sidebar>
	);
}
