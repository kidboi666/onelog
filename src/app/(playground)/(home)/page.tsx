import type { Metadata } from "next";
import { PostListView } from "@/widgets/home";
import FakeFormContainer from "./_components/FakeFormContainer";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <div className="flex animate-fade-in flex-col gap-12">
      <FakeFormContainer />
      <PostListView />
    </div>
  );
}
