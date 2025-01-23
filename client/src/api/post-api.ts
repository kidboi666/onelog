import { FETCH_URL } from '@/src/constants/url'
import { fetcher } from '@/src/utils/fetcher'

export const postApi = {
  getAllPost: () => fetcher.get(FETCH_URL.POST.GET_ALL),
  getPost: (id: number) => fetcher.get(FETCH_URL.POST.GET_POST(id)),
}
