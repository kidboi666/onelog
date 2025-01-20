import { fetcher } from '@/src/api/fetcher'
import { FETCH_URL } from '@/src/constants/url'

export const postApi = {
  getAllPost: () => fetcher.get(FETCH_URL.POST.GET_ALL),
  getPost: (id: number) => fetcher.get(FETCH_URL.POST.GET_POST(id)),
}
