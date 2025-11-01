import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { articleQueries } from "@/entities/article/article.queries";
import { FakeForm } from "@/features/article/fake-form/fake-form.ui";
import { InfiniteArticleList } from "@/features/article/infinite-article-list/infinite-article-list.ui";
import { TransitionContainer } from "@/shared/components/transition-container";
import { getQueryClient } from "@/shared/lib/get-query-client";

const HomePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(articleQueries.infinite());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>loading...</p>}>
        <TransitionContainer.SlideIn type="spring">
          <FakeForm />
        </TransitionContainer.SlideIn>

        <InfiniteArticleList />
      </Suspense>
    </HydrationBoundary>
  );
};

export default HomePage;
