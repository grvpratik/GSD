import { SidebarProvider, SidebarTrigger } from "www/components/ui/sidebar"
import { AppSidebar } from "www/components/app-sidebar"
import Nav from "www/components/section/landing/nav"
import Footer from "www/components/section/landing/footer"

export default function AiLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className=" w-full h-screen flex flex-col  font-sans ">
                <Nav />
                {children}
                {/* <Footer/> */}
            </main>
        </SidebarProvider>
    )
}
