import { PropsWithChildren } from 'react'

export default function EditProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className="my-8 flex w-full flex-col items-center px-4">
      {children}
    </div>
  )
}
