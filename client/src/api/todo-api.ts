import { FETCH_URL } from '@/src/constants/url'
import { fetcher } from '@/src/utils/fetcher'

export const todoApi = {
  getByCompletion: () => fetcher.get(FETCH_URL.TODO.GET_BY_COMPLETION),
  getByFolderId: (id: number) =>
    fetcher.get(FETCH_URL.TODO.GET_BY_FOLDER_ID(id)),
}
