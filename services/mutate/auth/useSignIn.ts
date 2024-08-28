import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

export default function useSignIn() {
  return useMutation({
    mutationFn: async (data) => {},
  })
}
