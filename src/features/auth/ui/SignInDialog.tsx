"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignIn } from "@/entities/auth/api/mutates";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { AuthFormField } from "@/shared/components/ui/AuthFormField";

const signInSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요"),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInDialogProps {
  children: ReactNode;
  onSwitchToSignUp?: () => void;
}

export function SignInDialog({ children, onSwitchToSignUp }: SignInDialogProps) {
  const { mutate: signIn, isPending } = useSignIn();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitSignIn = (data: SignInFormData) => {
    signIn(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>로그인</DialogTitle>
          <DialogDescription>
            이메일과 비밀번호를 입력하여 로그인하세요
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleSubmitSignIn)}
          className="w-full space-y-4"
        >
          <AuthFormField
            register={register("email")}
            error={errors.email}
            type="email"
            name="이메일"
          />
          <AuthFormField
            register={register("password")}
            error={errors.password}
            type="password"
            name="비밀번호"
          />
          {onSwitchToSignUp && (
            <div className="flex items-center justify-end">
              <Button
                type="button"
                variant="link"
                size="sm"
                className="px-0"
                onClick={onSwitchToSignUp}
              >
                가입하러 가기
              </Button>
            </div>
          )}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "로그인"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
