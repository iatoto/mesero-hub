import { useEffect } from 'react'

const MeseroWidget = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://elevenlabs.io/convai-widget/index.js'
    script.async = true
    script.type = 'text/javascript'
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold mb-2 text-zinc-800 dark:text-white">Bienvenido al Restaurante</h1>
      <p className="mb-4 text-zinc-600 dark:text-zinc-300">
        Haz clic en el botón para hablar con el mesero virtual
      </p>
      <elevenlabs-convai agent-id="aradgkYNF9nz3ttebXGq"></elevenlabs-convai>
    </div>
  )
}

export default MeseroWidget
