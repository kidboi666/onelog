"use client";

import { useMe } from "@/app/store/use-me";
import ProfileForm from "./_components/ProfileForm";
import useProfileForm from "./_hooks/useProfileForm";
import useProfileMutations from "./_hooks/useProfileMutations";

export default function ProfileEditPage() {
  const { me } = useMe();
  const { states, actions } = useProfileForm(me);
  const { updateProfile, uploadImage, deletePrevImage, isLoading } =
    useProfileMutations();

  if (!me) return null;

  return (
    <ProfileForm
      me={me}
      states={states}
      actions={actions}
      isLoading={isLoading}
      updateProfile={updateProfile}
      uploadImage={uploadImage}
      deletePrevImage={deletePrevImage}
    />
  );
}
