import { useToast } from '@/src/store/useToast'
import Portal from './Portal'
import Toast from './Toast'

export default function ToastContainer() {
  const { toastContents } = useToast()

  return (
    toastContents.length > 0 && (
      <Portal>
        <div className="fixed bottom-10 right-10 z-50 flex flex-col gap-2 transition">
          {toastContents.map((content) => {
            const { id, text, type, message } = content
            return <Toast key={content.id} id={id} text={text} message={message} type={type} />
          })}
        </div>
      </Portal>
    )
  )
}
