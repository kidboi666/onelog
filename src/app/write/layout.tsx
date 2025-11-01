import type { PropsWithChildren } from "react";
import { Container } from "@/shared/components/container";
import { TransitionContainer } from "@/shared/components/transition-container";
import { EditorFooterWidget } from "@/widgets/write/editor-footer.widget";
import { EditorSidebarWidget } from "@/widgets/write/editor-sidebar.widget";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <TransitionContainer.FadeIn>
      <EditorSidebarWidget />
      <EditorFooterWidget />
      <Container.Page>{children}</Container.Page>
    </TransitionContainer.FadeIn>
  );
};

export default Layout;
