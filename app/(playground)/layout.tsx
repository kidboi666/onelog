import type { PropsWithChildren } from "react";
import { Header } from "@/widgets/header/default";
import { Sidebar } from "@/widgets/sidebar/default";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="my-8 flex flex-1 justify-center px-2 sm:ml-[80px] sm:px-4">
        <div className="w-full lg:w-[880px]">{children}</div>
      </div>
    </>
  );
}
