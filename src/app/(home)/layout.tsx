import type { PropsWithChildren } from "react";
import { HomeLayout } from "@/shared/components/layout/home-layout";

const Layout = ({ children }: PropsWithChildren) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;
