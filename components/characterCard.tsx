'use client'
import Image from 'next/image'
import {
    Box,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Stack,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'

interface MortyCardProps {
  image: string
  name: string
  species: string
  gender: string
  idx: number
}

export default function MortyCard({ image, name, species, gender, idx }: MortyCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      {/* Card trigger */}
      <Box
        cursor="pointer"
        borderRadius="lg"
        overflow="hidden"
        onClick={onOpen}
      >
        <Image
            src={image}
            width={300} height={300}
            layout="responsive" 
            alt={name}
            priority={idx < 3}
        />
        <Text p="4" fontWeight="bold" textAlign="center">{name}</Text>
      </Box>

      {/* Detail modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="center">
              <Box flexShrink={0}>
                <Image src={image} alt={name} width={300} height={300} />
              </Box>
              <Box>
                <Text><strong>Species:</strong> {species}</Text>
                <Text mt={2}><strong>Gender:</strong> {gender}</Text>
              </Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}