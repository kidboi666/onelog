import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";
import MenuSection from "@/app/(playground)/profile/[userId]/@user_info/journal_garden/_components/MenuSection";
import { getUserInfo } from "@/entities/user/lib/user-service";
import { createServerClient } from "@/shared/lib/supabase/create-server-client";

interface Props {
  user_info: ReactNode;
  params: Promise<{ userId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params;
  const supabase = await createServerClient();
  const userInfo = await getUserInfo(userId, supabase);
  return {
    title: `${userInfo?.userName}`,
  };
}

export default async function UserLayout({
  params,
  user_info,
}: PropsWithChildren<Props>) {
  const { userId } = await params;
  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto rounded-md bg-white p-1 shadow-sm dark:bg-var-darkgray">
        <div className="relative gap-2">
          <MenuSection userId={userId} />
        </div>
      </div>
      {user_info}
    </div>
  );
}
