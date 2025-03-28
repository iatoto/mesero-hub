import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../supabase/client'

export function useAuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login')
      }
    })
  }, [router])
}
