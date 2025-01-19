import { fetcher } from '@/src/api/fetcher'
import { FETCH_URL } from '@/src/constants/url'

export const todoApi = {
  getByCompletion: () => fetcher.get(FETCH_URL.TODO.GET_BY_COMPLETION),
  getByFolderId: (id: number) =>
    fetcher.get(FETCH_URL.TODO.GET_BY_FOLDER_ID(id)),
}
