export const TODO_QUERY_KEY = {
  IN_PROGRESS: ["todo", "in_progress"],
  COMPLETED: ["todo", "completed"],
  MAIN: ["todo_folder"],
  FOLDER: (folderId: number) => ["todo", folderId],
  INDEX: (folderId: number) => ["todo", "index", folderId],
};

export const TODO_TOAST_MESSAGE = {
  TODO: {
    POST: {
      SUCCESS: "할일 생성에 성공했습니다.",
      EXCEPTION: "할일 생성에 실패했습니다.",
    },
    UPDATE: {
      SUCCESS: "할일 수정에 성공했습니다.",
      EXCEPTION: "할일 수정에 실패했습니다.",
    },
    DELETE: {
      SUCCESS: "할일 삭제에 성공했습니다.",
      EXCEPTION: "할일 삭제에 실패했습니다.",
    },
  },
  TODO_FOLDER: {
    POST: {
      SUCCESS: "할일 폴더 생성에 성공했습니다.",
      EXCEPTION: "할일 폴더 생성에 실패했습니다.",
    },
    DELETE: {
      SUCCESS: "할일 폴더 삭제에 성공했습니다.",
      EXCEPTION: "할일 폴더 삭제에 실패했습니다.",
    },
    UPDATE: {
      SUCCESS: "할일 폴더 수정에 성공했습니다.",
      EXCEPTION: "할일 폴더 수정에 실패했습니다.",
    },
  },
};
