import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Header from "@/components/header";
import { HeadSidebar } from "@/app/head/_components/head-sidebar";

export default function HeadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <Header>
          {" "}
          <SidebarTrigger />
        </Header>
        <HeadSidebar />
        <div className="mt-[--header-height] w-full">
          <div className="w-full">
            <main className="w-full">
              <div className="mx-auto w-full max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
