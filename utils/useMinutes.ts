import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'

type MinutesData = {
  [agent: string]: number
}

export function useMinutes(userId: string | null) {
  const [minutes, setMinutes] = useState<MinutesData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return

    const fetchMinutes = async () => {
      const { data, error } = await supabase
        .from('user_usage')
        .select('minutes_used')
        .eq('id', userId)
        .single()

      if (data?.minutes_used) {
        setMinutes(data.minutes_used)
      } else if (!error) {
        // create initial record
        await supabase.from('user_usage').insert([{ id: userId, minutes_used: {} }])
      }

      setLoading(false)
    }

    fetchMinutes()
  }, [userId])

  const updateMinutes = async (agent: string, minutesToAdd: number) => {
    const newTotal = (minutes[agent] || 0) + minutesToAdd
    const newMinutes = { ...minutes, [agent]: newTotal }

    setMinutes(newMinutes)

    await supabase
      .from('user_usage')
      .upsert({ id: userId, minutes_used: newMinutes }, { onConflict: 'id' })
  }

  return { minutes, updateMinutes, loading }
}
