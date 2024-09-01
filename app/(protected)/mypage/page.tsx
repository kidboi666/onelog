import FavoriteWords from './_components/FavoriteWords'
import History from './_components/History'
import PrevOneSentence from './_components/PrevOneSentence'
import Summary from './_components/Summary'

export default function UserPage() {
  return (
    <>
      <Summary />
      <History />
      <FavoriteWords />
      <PrevOneSentence />
    </>
  )
}
