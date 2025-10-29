import type { Metadata } from "next";
import type { PropsWithChildren, ReactNode } from "react";
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
  user_info,
}: PropsWithChildren<Props>) {
  return <div className="flex flex-col gap-8">{user_info}</div>;
}
