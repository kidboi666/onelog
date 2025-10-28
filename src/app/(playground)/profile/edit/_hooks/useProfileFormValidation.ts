import { IUpdateProfileFormStates } from '@/src/types/dtos/auth'
import { IUserInfo } from '@/src/types/entities/auth'

export default function useProfileFormValidation(
  states: IUpdateProfileFormStates,
  me: IUserInfo,
) {
  const isFormUnChanged =
    states.userName === me.userName &&
    states.aboutMe === me.aboutMe &&
    !states.imageFile
  const isFormInvalid =
    (states.userName?.length ?? 0) > 10 || (states.aboutMe?.length ?? 0) > 150

  return { isFormUnChanged, isFormInvalid }
}
