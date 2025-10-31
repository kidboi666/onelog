import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authApi } from "@/entities/auth/auth.api";
import { signInToEntity } from "@/entities/auth/auth.mapper";
import type { UserInfo } from "@/entities/user/user.model";
import { QUERY_KEY, TOAST_MESSAGE } from "@/shared/constants";
import { getQueryClient } from "@/shared/lib/get-query-client";
import { ROUTES } from "@/shared/routes";
import { useMe } from "@/shared/store/use-me";

type Params = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const queryClient = getQueryClient();
  const { setMe } = useMe();

  return useMutation({
    mutationFn: async ({ email, password }: Params): Promise<UserInfo> => {
      const result = await authApi.signIn({ email, password });
      return signInToEntity(result);
    },
    onSuccess: (data) => {
      setMe(data);
      window.location.href = ROUTES.HOME;
      toast.success(TOAST_MESSAGE.AUTH.SIGN_IN.SUCCESS, {
        description: TOAST_MESSAGE.AUTH.SIGN_IN.MESSAGE,
      });
    },
    onError: (error) => {
      toast.error(TOAST_MESSAGE.AUTH.SIGN_IN.EXCEPTION, {
        description: error.message,
      });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEY.AUTH.INFO });
    },
  });
};
