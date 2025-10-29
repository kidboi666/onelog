import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface Props {
  email?: string;
  provider?: string;
}

export function EmailSection({ email, provider }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor="email" className="font-bold text-lg">
        이메일
      </Label>
      <div className="flex flex-col gap-1">
        <Input
          id="email"
          disabled
          value={email}
          className="text-zinc-400 dark:text-zinc-500"
        />
        <p className="text-muted-foreground text-xs">
          {provider === "kakao"
            ? "카카오로 가입한 유저 입니다."
            : "이메일로 가입한 유저 입니다."}
        </p>
      </div>
    </div>
  );
}
