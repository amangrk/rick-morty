import React from 'react'
import { Center, Spinner, Text, VStack } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Center h="100vh">
      <VStack spacing={4}>
        <Spinner size="xl" color="teal.500" />
        <Text>Loading, please wait...</Text>
      </VStack>
    </Center>
  )
}