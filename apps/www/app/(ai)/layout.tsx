import { SidebarProvider, SidebarTrigger } from "www/components/ui/sidebar";
import { AppSidebar } from "www/components/AppSideBar";
import Nav from "www/components/section/landing/Nav";
import MainResonse from "shared";
import IdeanInput from "shared";

const data = {
	user: {
		name: "pratik",
		email: "pratikgaurav37@gmail.com",
		avatar: "/pratikgrv.jpg",
	},
};
export default function AiLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar user={data.user} />
			<main className=" w-full h-screen flex flex-col  font-sans ">
				<Nav />
				{children}
			</main>
		</SidebarProvider>
	);
}
