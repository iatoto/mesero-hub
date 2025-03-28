import { useEffect, useState } from 'react'
import { useAuthRedirect } from '../utils/useAuthRedirect'
import { supabase } from '../supabase/client'
import AgentBlock from '../components/AgentBlock'
import { useMinutes } from '../utils/useMinutes'
import { useRouter } from 'next/router'

export default function Dashboard() {
  useAuthRedirect()
  const router = useRouter()

  const [userId, setUserId] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUserId(data.user.id)
        setEmail(data.user.email ?? null)
      }
    })
  }, [])

  const { minutes, updateMinutes, loading } = useMinutes(userId)

  if (!userId || loading) return <p className="text-center text-zinc-600 mt-20">Cargando...</p>

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">
          Bienvenido, {email ?? 'Usuario'} 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AgentBlock
            name="🧑‍🍳 Mesero Virtual"
            description="Habla en tiempo real con tu asistente de restaurante impulsado por voz."
            minutesUsed={minutes['mesero'] || 0}
            minutesLimit={15}
            onStart={() => {
              updateMinutes('mesero', 1)
              router.push('/mesero')
            }}
          />
          <AgentBlock
            name="⚙️ Agente Automatizador"
            description="Flujos de automatización con Make o n8n."
            minutesUsed={minutes['n8n'] || 0}
            minutesLimit={15}
            onStart={() => updateMinutes('n8n', 1)}
          />
        </div>
      </div>
    </div>
  )
}
