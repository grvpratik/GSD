import {
	Calendar,
	
	Home,
	Inbox,
	Search,
	Settings,
	User2,
	UserIcon,
} from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "www/components/ui/sidebar";

import { NavUser } from "./nav-user";
import SideBarSearch from "./ui/search";

// Menu items.
const items = [
	{
		title: "logo generator  loremf dkfsfjfj erfjierfgerg",
		url: "#",
		icon:"🚀",
	},
	
	
];
const data = {
	user: {
		name: "user",
		email: "m@example.com",
		avatar: "/avatars/pratikgrv.jpg",
	},
};
export function AppSidebar() {
	return (
		<Sidebar className=" rounded-xl  border-2 overflow-hidden">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<div className=" flex gap-2  items-center p-2">
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
							<SideBarSearch />
							<SidebarGroupLabel>Previous</SidebarGroupLabel>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											{/* <item.icon /> */}{item.icon}
											<span className="">{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<NavUser user={data.user} />
		</Sidebar>
	);
}
