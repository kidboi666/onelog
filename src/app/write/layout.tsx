import type { PropsWithChildren } from "react";
import { Container } from "@/shared/components/container";
import { TransitionContainer } from "@/shared/components/transition-container";
import { EditorFooter } from "@/widgets/write/editor-footer.widget";
import { EditorSidebar } from "@/widgets/write/editor-sidebar.widget";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <TransitionContainer.FadeIn>
      <EditorSidebar />
      <EditorFooter />
      <Container.Page>{children}</Container.Page>
    </TransitionContainer.FadeIn>
  );
};

export default Layout;
