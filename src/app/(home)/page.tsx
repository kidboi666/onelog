import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { articleQueries } from "@/entities/article/article.queries";
import { FakeForm } from "@/features/article/fake-form/fake-form.ui";
import { InfiniteArticleList } from "@/features/article/infinite-article-list/infinite-article-list.ui";
import { PageTransitionContainer } from "@/shared/components/container/page-transition-container";
import { getQueryClient } from "@/shared/lib/get-query-client";

const HomePage = async () => {
  const queryClient = getQueryClient();
  try {
    await queryClient.prefetchInfiniteQuery(articleQueries.infinite());
  } catch (e) {
    console.log(e);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTransitionContainer className="flex animate-fade-in flex-col gap-12">
        <Suspense fallback={<p>loading...</p>}>
          <FakeForm />
          <InfiniteArticleList />
        </Suspense>
      </PageTransitionContainer>
    </HydrationBoundary>
  );
};

export default HomePage;
