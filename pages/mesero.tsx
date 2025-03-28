import dynamic from 'next/dynamic'

// Importar el widget sin SSR para evitar errores de DOM en el servidor
const MeseroWidget = dynamic(() => import('../components/MeseroWidget'), { ssr: false })

export default function MeseroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <MeseroWidget />
    </div>
  )
}
