import FavoriteWords from './_components/FavoriteWords'
import History from './_components/History'
import PrevOneSentence from './_components/PrevOneSentence'

export default async function UserPage() {
  return (
    <>
      <History />
      <FavoriteWords />
      <PrevOneSentence />
    </>
  )
}
