"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { AuthFormField } from "@/entities/auth/ui/auth-form-field";
import {
  type SignUpFormData,
  signUpSchema,
} from "@/features/auth/sign-up/sign-up.model";
import { useSignUp } from "@/features/auth/sign-up/sign-up.mutation";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

type SignUpDialogProps = {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSwitchToSignIn?: () => void;
};

export const SignUpDialog = ({
  children,
  open,
  onOpenChange,
  onSwitchToSignIn,
}: SignUpDialogProps) => {
  const { mutate: signUp, isPending } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const handleSubmitSignUp = (data: SignUpFormData) => {
    signUp({
      email: data.email,
      userName: data.userName,
      password: data.password,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원가입</DialogTitle>
          <DialogDescription>
            정보를 입력하여 계정을 생성하세요
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSubmitSignUp)}
          className="w-full space-y-4"
        >
          <AuthFormField
            register={register("email")}
            error={errors.email}
            type="email"
            name="이메일"
          />
          <AuthFormField
            register={register("userName")}
            error={errors.userName}
            type="text"
            name="필명"
          />
          <AuthFormField
            register={register("password")}
            error={errors.password}
            type="password"
            name="비밀번호"
          />
          <AuthFormField
            register={register("passwordConfirmation")}
            error={errors.passwordConfirmation}
            type="password"
            name="비밀번호 확인"
          />
          {onSwitchToSignIn && (
            <div className="flex items-center justify-end">
              <Button
                type="button"
                variant="link"
                size="sm"
                className="px-0"
                onClick={onSwitchToSignIn}
              >
                로그인하러 가기
              </Button>
            </div>
          )}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "회원가입"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
