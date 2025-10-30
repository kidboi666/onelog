import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUserInfo } from "@/entities/user/lib/user-service";
import { USER_QUERY_KEY } from "@/entities/user/model/constants";
import { createServerClient } from "@/shared/lib/supabase/create-server-client";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";

interface Props {
  params: Promise<{ userId: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params;
  const queryClient = getQueryClient();
  const supabase = await createServerClient();

  void queryClient.prefetchQuery({
    queryKey: USER_QUERY_KEY.INFO(userId),
    queryFn: () => getUserInfo(userId, supabase),
  });
  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>;
}
