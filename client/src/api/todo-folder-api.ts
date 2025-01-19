import { fetcher } from '@/src/api/fetcher'
import { FETCH_URL } from '@/src/constants/url'

export const todoFolderApi = {
  getAll: fetcher.get(FETCH_URL.TODO_FOLDER.GET_ALL),
}
