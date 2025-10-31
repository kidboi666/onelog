import type { PropsWithChildren } from "react";
import { Header } from "@/widgets/header/header.ui";
import { Sidebar } from "@/widgets/sidebar/sidebar.ui";

export const HomeLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="my-8 flex flex-1 justify-center px-2 sm:ml-[80px] sm:px-4">
        <div className="w-full lg:w-[880px]">{children}</div>
      </main>
    </>
  );
};
