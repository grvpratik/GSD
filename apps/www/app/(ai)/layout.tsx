import { SidebarProvider, SidebarTrigger } from "www/components/ui/sidebar"
import { AppSidebar } from "www/components/AppSideBar"
import Nav from "www/components/section/landing/Nav"
import Footer from "www/components/section/landing/Footer"
const data = {
	User: {
		name: "user",
		email: "m@example.com",
		avatar: "/avatars/pratikgrv.jpg",
	},
};
export default function AiLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar user={data.User}/>
            <main className=" w-full h-screen flex flex-col  font-sans ">
                <Nav />
                {children}
                {/* <Footer/> */}
            </main>
        </SidebarProvider>
    )
}
