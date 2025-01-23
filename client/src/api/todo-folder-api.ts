import { FETCH_URL } from '@/src/constants/url'
import { fetcher } from '@/src/utils/fetcher'

export const todoFolderApi = {
  getAll: fetcher.get(FETCH_URL.TODO_FOLDER.GET_ALL),
}
