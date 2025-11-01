import type { PropsWithChildren } from "react";
import { Container } from "@/shared/components/container";
import { TransitionContainer } from "@/shared/components/transition-container";
import { Header } from "@/widgets/home/header.widget";
import { Sidebar } from "@/widgets/home/sidebar.widget";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <TransitionContainer.FadeIn>
      <Header />
      <Sidebar />
      <Container.Page>{children}</Container.Page>
    </TransitionContainer.FadeIn>
  );
};

export default Layout;
