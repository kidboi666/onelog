import type { PropsWithChildren } from "react";
import { Container } from "@/shared/components/container";
import { TransitionContainer } from "@/shared/components/transition-container";
import { HomeHeader } from "@/widgets/home/home-header.widget";
import { HomeSidebar } from "@/widgets/home/home-sidebar.widget";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <TransitionContainer.FadeIn>
      <Container.Layout>
        <HomeHeader />
        <HomeSidebar />
        {children}
      </Container.Layout>
    </TransitionContainer.FadeIn>
  );
};

export default Layout;
