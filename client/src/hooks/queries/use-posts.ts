import { postApi } from '@/src/api/post-api'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'

export function usePosts() {
  const useGetPost = (postId: number) => {
    return useQuery({
      queryKey: [QUERY_KEY.POST.DETAIL(postId)],
      queryFn: () => postApi.getPost(postId),
    })
  }

  const useGetAllPosts = () => {
    return useQuery({
      queryKey: [QUERY_KEY.POST.PUBLIC],
      queryFn: () => postApi.getAllPost(),
    })
  }

  return {
    useGetPost,
    useGetAllPosts,
  }
}
