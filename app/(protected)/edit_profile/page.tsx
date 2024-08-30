import NickNameSection from './_components/NicknameSection'
import IntroduceSection from './_components/IntroduceSection'
import ChallangeSection from './_components/ChallangeSection'

export default function EditProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <NickNameSection />
      <IntroduceSection />
      <ChallangeSection />
    </div>
  )
}
