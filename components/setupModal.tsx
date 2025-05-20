'use client'

import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function SetupModal() {
  const [username, setUsername] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const router = useRouter()

  const handleSave = () => {
    const info = { username, jobTitle }
    document.cookie = `userInfo=${encodeURIComponent(
      JSON.stringify(info)
    )}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <Modal
      isOpen={true}
      onClose={() => {}}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      motionPreset="slideInBottom"
    >
    <ModalOverlay bg="blackAlpha.600" />
    <ModalContent 
      maxW="400px" 
      borderRadius="lg" 
      p={6}
      as="form"
      onSubmit={e => {
        e.preventDefault()
        handleSave()
    }}>
      <ModalHeader pb={2} textAlign="center">
        <Heading size="md">Welcome!</Heading>
      </ModalHeader>
      <ModalBody>
        <VStack spacing={4} align="stretch">
          <Text textAlign="center">
            Welcome to the Rick & Morty Gallery 🚀  
            Please enter your username and job title to proceed.
          </Text>

          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="md"
              focusBorderColor="teal.400"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Job Title</FormLabel>
            <Input
              placeholder="Your job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              size="md"
              focusBorderColor="teal.400"
            />
          </FormControl>
        </VStack>
      </ModalBody>
      <ModalFooter pt={4} justifyContent="center">
        <Button
          type='submit'
          colorScheme="teal"
          onClick={handleSave}
          isDisabled={!username || !jobTitle}
          width="full"
        >
          Continue
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
}

