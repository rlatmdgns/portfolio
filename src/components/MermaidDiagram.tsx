'use client'

import { useEffect, useRef } from 'react'

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      const mermaid = (await import('mermaid')).default
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        fontFamily: 'inherit',
        fontSize: 13,
      })

      if (!ref.current || cancelled) return

      const id = `mermaid-${Math.random().toString(36).slice(2)}`
      const { svg } = await mermaid.render(id, chart.trim())

      if (!ref.current || cancelled) return
      ref.current.innerHTML = svg
    }

    render()
    return () => { cancelled = true }
  }, [chart])

  return (
    <div
      ref={ref}
      className="overflow-x-auto rounded-lg bg-neutral-50 dark:bg-neutral-900 p-4 [&_svg]:max-w-full [&_svg]:h-auto"
    />
  )
}
