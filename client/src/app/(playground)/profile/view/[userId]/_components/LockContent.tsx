import TextDisplay from '@/src/components/TextDisplay'

export default function LockContent() {
  return (
    <div className="size-full w-full cursor-pointer rounded-md bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:shadow-lg dark:bg-var-darkgray">
      <TextDisplay>비공개된 게시물입니다.</TextDisplay>
    </div>
  )
}
