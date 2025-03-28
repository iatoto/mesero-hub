import { useState } from 'react'
import { supabase } from '../supabase/client'
import { useRouter } from 'next/router'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">Iniciar Sesión</h2>
      <div className="mb-4">
        <label className="block mb-1 text-sm text-zinc-600 dark:text-zinc-300">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 text-sm text-zinc-600 dark:text-zinc-300">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
      >
        {loading ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  )
}

export default LoginForm
