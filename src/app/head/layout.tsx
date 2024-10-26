import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <div className="mx-auto w-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mb-4 md:hidden">
              <SidebarTrigger />
            </div>
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
