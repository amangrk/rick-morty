'use client'

import React, { useEffect } from 'react'
import { Center, VStack, Text, Button } from '@chakra-ui/react'

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Text fontSize="xl" color="red.500">
          Oops, something went wrong.
        </Text>
        <Button onClick={() => reset()} colorScheme="teal">
          Try again
        </Button>
      </VStack>
    </Center>
  )
}