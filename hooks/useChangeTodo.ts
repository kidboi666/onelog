import { useTodo } from '@/store/useTodo'
import { useEffect } from 'react'

export default function useChangeTodo() {
  const {
    todos,
    setTodos,
    selectedFolder,
    successTodos,
    setSuccessTodos,
    selectedFolderId,
    setSelectedFolderId,
  } = useTodo()

  useEffect(() => {
    if (todos.length >= 1 || successTodos.length >= 1) {
      const nextTargetFolder = selectedFolderId
        ? selectedFolderId
        : selectedFolder?.id
      if (nextTargetFolder) {
        localStorage.setItem(
          nextTargetFolder!.toString(),
          JSON.stringify({ pending: todos, success: successTodos }),
        )
      }
      setSelectedFolderId(null)
    }
  }, [todos, successTodos])

  /**
   * 선택된 폴더의 todo 목록 가져오기
   */
  useEffect(() => {
    if (selectedFolder) {
      const selectedTodos = JSON.parse(
        localStorage.getItem(selectedFolder.id.toString())!,
      )

      setTodos(selectedTodos?.pending ?? [])
      setSuccessTodos(selectedTodos?.success ?? [])
    }
  }, [selectedFolder && selectedFolder.id])
  return
}
