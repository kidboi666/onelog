import type {
  UseMutateAsyncFunction,
  UseMutateFunction,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import type {
  IUpdateProfileFormActions,
  IUpdateProfileFormStates,
  IUpdateUserInfo,
} from "@/entities/auth/api/dtos";
import type { IUploadAvatar } from "@/entities/auth/model/types";
import type { IUserInfo } from "@/entities/user/model/types";
import { Button } from "@/shared/components/ui/button";
import useProfileFormValidation from "../_hooks/useProfileFormValidation";
import AboutMeSection from "./AboutMeSection";
import EmailSection from "./EmailSection";
import ProfileImageSection from "./ProfileImageSection";
import UserNameSection from "./UserNameSection";

interface Props {
  me: IUserInfo;
  states: IUpdateProfileFormStates;
  actions: IUpdateProfileFormActions;
  isLoading: boolean;
  updateProfile: UseMutateFunction<
    IUserInfo | null,
    Error,
    IUpdateUserInfo,
    unknown
  >;
  uploadImage: UseMutateAsyncFunction<string, Error, IUploadAvatar, unknown>;
  deletePrevImage: UseMutateFunction<void, Error, string, unknown>;
}

export default function ProfileForm({
  me,
  states,
  actions,
  isLoading,
  updateProfile,
  uploadImage,
  deletePrevImage,
}: Props) {
  const { isFormUnChanged, isFormInvalid } = useProfileFormValidation(
    states,
    me,
  );

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const baseProfileData = {
      aboutMe: states.aboutMe,
      userName: states.userName,
      userId: me.id,
    };
    if (states.imageFile) {
      const avatarUrl = await uploadImage({
        email: me.email,
        image: states.imageFile,
      });
      if (states.currentAvatarUrl) {
        deletePrevImage(states.currentAvatarUrl);
      }

      updateProfile({ ...baseProfileData, avatarUrl });
    } else {
      updateProfile({ ...baseProfileData });
    }
  };
  return (
    <form
      onSubmit={handleProfileUpdate}
      className="animate-fade-in rounded-md bg-white p-2 shadow-sm sm:p-8 dark:bg-var-darkgray"
    >
      <div className="flex flex-col gap-8">
        <ProfileImageSection
          actions={actions}
          states={states}
          imagePreview={states.avatarPreview ?? states.currentAvatarUrl}
        />
        <EmailSection email={me.email} provider={me.provider} />
        <UserNameSection
          value={states.userName ?? ""}
          onChange={actions.onChangeUserName}
        />
        <AboutMeSection
          value={states.aboutMe ?? ""}
          onChange={actions.onChangeAboutMe}
        />
        <Button
          type="submit"
          disabled={isFormUnChanged || isFormInvalid || isLoading}
        >
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          수정하기
        </Button>
      </div>
    </form>
  );
}
