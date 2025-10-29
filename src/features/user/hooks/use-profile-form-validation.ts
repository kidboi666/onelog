import type { IUpdateProfileFormStates } from '@/entities/auth/api/dtos'
import type { IUserInfo } from '@/entities/user/model/types'

export function useProfileFormValidation(
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
