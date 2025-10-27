import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/core/routes";
import { useMe } from "@/core/store/use-me";
import {
  deleteAvatarImage,
  signIn,
  signOut,
  signUp,
  updateUserInfo,
  uploadAvatarImage,
} from "@/entities/auth/api/auth-api";
import type {
  ISignIn,
  ISignUp,
  IUpdateUserInfo,
} from "@/entities/auth/api/dtos";
import {
  AUTH_QUERY_KEY,
  AUTH_TOAST_MESSAGE,
} from "@/entities/auth/model/constants";
import type { IUploadAvatar } from "@/entities/auth/model/types";
import { getQueryClient } from "@/shared/lib/tanstack-query/get-query-client";

export const useDeleteAvatarImage = () => {
  return useMutation({
    mutationFn: (imageUrl: string) => deleteAvatarImage(imageUrl),
    onError: (error) => {
      toast.error(AUTH_TOAST_MESSAGE.USER_INFO.UPLOAD_AVATAR.EXCEPTION, {
        description: error.message,
      });
    },
  });
};

export const useSignIn = () => {
  const queryClient = getQueryClient();
  const { setMe } = useMe();

  return useMutation({
    mutationFn: (authData: ISignIn) => signIn(authData),
    onSuccess: (data) => {
      setMe(data);
      window.location.href = ROUTES.HOME;
      toast.success(AUTH_TOAST_MESSAGE.AUTH.SIGN_IN.SUCCESS, {
        description: AUTH_TOAST_MESSAGE.AUTH.SIGN_IN.MESSAGE,
      });
    },
    onError: (error) => {
      toast.error(AUTH_TOAST_MESSAGE.AUTH.SIGN_IN.EXCEPTION, {
        description: error.message,
      });
    },
    onSettled: () => {
      const queryKeys = [AUTH_QUERY_KEY.INFO, AUTH_QUERY_KEY.SESSION];
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );
    },
  });
};

export const useSignUp = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (authData: ISignUp) => signUp(authData),
    onSuccess: () => {
      window.location.href = ROUTES.HOME;
      toast.success(AUTH_TOAST_MESSAGE.AUTH.SIGN_UP.SUCCESS, {
        description: AUTH_TOAST_MESSAGE.AUTH.SIGN_UP.MESSAGE,
      });
    },
    onError: (error) => {
      toast.error(AUTH_TOAST_MESSAGE.AUTH.SIGN_UP.EXCEPTION, {
        description: error.message,
      });
    },
    onSettled: () => {
      const queryKeys = [AUTH_QUERY_KEY.INFO, AUTH_QUERY_KEY.SESSION];
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      );
    },
  });
};

export const useSignOut = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: () => signOut(),
    onError: (error) => {
      toast.error(AUTH_TOAST_MESSAGE.AUTH.SIGN_OUT.EXCEPTION, {
        description: error.message,
      });
    },
    onSettled: () => {
      queryClient.removeQueries();
      alert("로그아웃 하였습니다.");
      window.location.href = ROUTES.HOME;
    },
  });
};

export const useUpdateUserInfo = () => {
  const { setMe } = useMe();
  const router = useRouter();

  return useMutation({
    mutationFn: (params: IUpdateUserInfo) => updateUserInfo(params),
    onSuccess: (data) => {
      setMe(data);
      toast.success(AUTH_TOAST_MESSAGE.USER_INFO.EDIT.SUCCESS);
      router.replace(ROUTES.MODAL.SUCCESS);
    },
    onError: (error) => {
      toast.error(AUTH_TOAST_MESSAGE.USER_INFO.EDIT.EXCEPTION, {
        description: error.message,
      });
    },
  });
};

export const useUploadAvatarImage = () => {
  return useMutation({
    mutationFn: (params: IUploadAvatar) => uploadAvatarImage(params),
    onError: (error) => {
      toast.error(AUTH_TOAST_MESSAGE.USER_INFO.UPLOAD_AVATAR.EXCEPTION, {
        description: error.message,
      });
    },
  });
};
