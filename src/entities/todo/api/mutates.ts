import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/core/routes";
import type {
  ICreateTodo,
  ICreateTodoFolder,
  IDeleteTodo,
  IUpdateTodo,
  IUpdateTodoFolder,
} from "@/entities/todo/api/dtos";
import {
  createTodo,
  createTodoFolder,
  deleteTodo,
  deleteTodoFolder,
  updateTodo,
  updateTodoFolder,
} from "@/entities/todo/api/todo-api";
import {
  TODO_QUERY_KEY,
  TODO_TOAST_MESSAGE,
} from "@/entities/todo/model/constants";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";

export const useAddTodo = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (params: ICreateTodo) => createTodo(params),
    onError: (error) => {
      toast.error(TODO_TOAST_MESSAGE.TODO.POST.EXCEPTION, {
        description: error.message,
      });
    },
    onSuccess: (_, variables) => {
      const queryKeys = [
        TODO_QUERY_KEY.FOLDER(variables.folderId),
        TODO_QUERY_KEY.MAIN,
      ];
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );
      toast.success(TODO_TOAST_MESSAGE.TODO.POST.SUCCESS);
    },
  });
};

export const useAddTodoFolder = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (params: ICreateTodoFolder) => createTodoFolder(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.MAIN });

      toast.success(TODO_TOAST_MESSAGE.TODO_FOLDER.POST.SUCCESS);
    },
    onError: (error) => {
      toast.error(TODO_TOAST_MESSAGE.TODO_FOLDER.POST.EXCEPTION, {
        description: error.message,
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (params: IDeleteTodo) => deleteTodo(params),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({
        queryKey: TODO_QUERY_KEY.FOLDER(variables.folderId),
      });

      toast.success(TODO_TOAST_MESSAGE.TODO.DELETE.SUCCESS);
    },
    onError: (error) => {
      toast.error(TODO_TOAST_MESSAGE.TODO.DELETE.EXCEPTION, {
        description: error.message,
      });
    },
  });
};

export const useDeleteTodoFolder = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (folderId: number) => deleteTodoFolder(folderId),
    onError: (error) => {
      toast.error(TODO_TOAST_MESSAGE.TODO_FOLDER.DELETE.EXCEPTION, {
        description: error.message,
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.MAIN });
      toast.success(TODO_TOAST_MESSAGE.TODO_FOLDER.DELETE.SUCCESS);
    },
  });
};

export default function useUpdateTodo() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (params: IUpdateTodo) => updateTodo(params),
    onSuccess: (_, variables) => {
      const { folderId } = variables;
      const queryKeys = [
        TODO_QUERY_KEY.FOLDER(folderId),
        TODO_QUERY_KEY.IN_PROGRESS,
      ];
      void queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );

      toast.success(TODO_TOAST_MESSAGE.TODO.UPDATE.SUCCESS);
    },
    onError: (error) => {
      toast.error(TODO_TOAST_MESSAGE.TODO.UPDATE.EXCEPTION, {
        description: error.message,
      });
    },
  });
}

export const useUpdateTodoFolder = () => {
  const queryClient = getQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (params: IUpdateTodoFolder) => updateTodoFolder(params),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: TODO_QUERY_KEY.MAIN });
      router.push(ROUTES.TODO.VIEW.FOLDER(variables.id, variables.color));

      toast.success(TODO_TOAST_MESSAGE.TODO_FOLDER.UPDATE.SUCCESS);
    },
    onError: (error) => {
      toast.error(TODO_TOAST_MESSAGE.TODO_FOLDER.UPDATE.EXCEPTION, {
        description: error.message,
      });
    },
  });
};
