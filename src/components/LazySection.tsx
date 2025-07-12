'use client'

import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

export default function LazySection({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true,
  })

  return <div ref={ref}>{inView ? children : null}</div>
}
