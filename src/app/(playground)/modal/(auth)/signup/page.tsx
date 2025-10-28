"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useSignUp } from "@/entities/auth/api/mutates";
import { Button } from "@/shared/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import Modal from "@/shared/components/Modal";
import AuthForm from "../../_components/AuthForm";

const signUpSchema = z
  .object({
    email: z.string().email("유효한 이메일을 입력해주세요"),
    userName: z.string().min(2, "필명은 최소 2자 이상이어야 합니다"),
    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirmation"],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpModal() {
  const router = useRouter();
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
    <Modal className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>회원가입</DialogTitle>
        <DialogDescription>
          정보를 입력하여 계정을 생성하세요
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleSubmitSignUp)} className="w-full space-y-4">
        <AuthForm
          register={register("email")}
          error={errors.email}
          type="email"
          name="이메일"
        />
        <AuthForm
          register={register("userName")}
          error={errors.userName}
          type="text"
          name="필명"
        />
        <AuthForm
          register={register("password")}
          error={errors.password}
          type="password"
          name="비밀번호"
        />
        <AuthForm
          register={register("passwordConfirmation")}
          error={errors.passwordConfirmation}
          type="password"
          name="비밀번호 확인"
        />
        <div className="flex items-center justify-end">
          <Button
            type="button"
            variant="link"
            size="sm"
            className="px-0"
            onClick={() => router.replace("/modal/signin")}
          >
            로그인하러 가기
          </Button>
        </div>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "회원가입"
          )}
        </Button>
      </form>
    </Modal>
  );
}
