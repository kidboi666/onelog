import { redirect } from 'next/navigation'

interface Params {
  userId: string
}

export async function GET(_: Request, context: { params: Params }) {
  const userId = context.params.userId
  redirect(`/${userId}/userinfo_summary`)
}
