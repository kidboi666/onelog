import type { Metadata } from "next";
import FakeFormContainer from "./_components/FakeFormContainer";
import PostContainer from "./_components/PostContainer";

export const metadata: Metadata = {
  title: "Home",
};

export default function Page() {
  return (
    <div className="flex animate-fade-in flex-col gap-12">
      <FakeFormContainer />
      <PostContainer />
    </div>
  );
}
