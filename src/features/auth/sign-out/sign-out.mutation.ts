import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/entities/auth/auth.api";
import { QUERY_KEY, TOAST_MESSAGE } from "@/shared/constants";
import { ROUTES } from "@/shared/routes";
import { useMe } from "@/shared/store/use-me";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const { clearMe } = useMe();
  return useMutation({
    mutationFn: async (): Promise<void> => {
      await authApi.signOut();
    },
    onError: (error) => {
      toast.error(TOAST_MESSAGE.AUTH.SIGN_IN.EXCEPTION, {
        description: error.message,
      });
    },
    onSettled: () => {
      clearMe();
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.AUTH.INFO });
      window.location.href = ROUTES.HOME;
      toast.success(TOAST_MESSAGE.AUTH.SIGN_IN.SUCCESS, {
        description: TOAST_MESSAGE.AUTH.SIGN_IN.MESSAGE,
      });
    },
  });
};
