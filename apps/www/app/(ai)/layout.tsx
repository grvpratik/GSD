import { SidebarProvider, SidebarTrigger } from "www/components/ui/sidebar";
import { AppSidebar } from "www/components/AppSideBar";
import Nav from "www/components/section/landing/Nav";
import MainResponse from "shared/db/temp";

const data = {
	user: {
		name: "pratik",
		email: "pratikgaurav37@gmail.com",
		avatar: "/profile/pratikgrv.jpg",
	},
};
const history= MainResponse.map((data)=>{
	return {
		id:data.id,
		title:data.title,
       url:`/build/${data.id}`
	}
});
export const response=MainResponse;
export default function AiLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar user={data.user}  history={history}/>
			<main className=" w-full h-screen flex flex-col  font-sans ">
				<Nav />
				{children}
			</main>
		</SidebarProvider>
	);
}
