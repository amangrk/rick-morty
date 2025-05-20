'use client'

import { ReactNode, useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloWrapper } from '@/lib/apolloWrapper'

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // On the server (and until mounted === true), just render children
  if (!mounted) {
    return <>{children}</>
  }

  // Once mounted, wrap in your client‐only providers
  return (
    <ChakraProvider>
      <ApolloWrapper>
        {children}
      </ApolloWrapper>
    </ChakraProvider>
  )
}