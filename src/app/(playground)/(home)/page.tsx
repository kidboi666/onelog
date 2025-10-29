import type { Metadata } from "next";
import { PostCreatePrompt, PostListView } from "@/widgets/home";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <div className="flex animate-fade-in flex-col gap-12">
      <PostCreatePrompt />
      <PostListView />
    </div>
  );
}
