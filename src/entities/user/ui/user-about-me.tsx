import type { IUserInfo } from "@/entities/user/model/types";

interface Props {
  user: IUserInfo;
}

export function UserAboutMe({ user }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-foreground text-sm">
        {user?.aboutMe ?? "자기 소개를 작성해주세요."}
      </p>
    </div>
  );
}
