import { Separator } from "@/shared/components/ui/separator";
import PostCountInfo from "./_components/PostCountInfo";
import SideActionBar from "./_components/SideActionBar";

interface Props {
  params: { postId: string };
}

export default function SideMenuPage({ params }: Props) {
  const postId = Number(params.postId);

  return (
    <div className="sticky left-4 top-8 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <nav className="flex flex-col items-center">
        <PostCountInfo postId={postId} />
        <Separator className="w-full" />
        <SideActionBar postId={postId} />
      </nav>
    </div>
  );
}
