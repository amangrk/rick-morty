'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { 
    Grid, 
    GridItem, 
    HStack, 
    Button, 
    Text 
} from '@chakra-ui/react'
import Link from 'next/link'
import type { Character } from '@/app/types'
import Loading from '@/app/loading'

interface CharacterListProps {
  characters?: Character[]
  totalPages?: number
  currentPage?: number
}

const CharacterCard = dynamic(() => import('./characterCard'), { 
    loading: () => <Loading />, 
    ssr: false  // only load on the client
  })
  
export default function CharacterList({characters=[], totalPages=1, currentPage=1 }: CharacterListProps) {
  //  pagination display: first, ..., surrounding, ..., last
  const delta = 2
  const pages: (number | string)[] = []

  pages.push(1)
  if (currentPage - delta > 2) {
    pages.push('...')
  }
  for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
    pages.push(i)
  }
  if (currentPage + delta < totalPages - 1) {
    pages.push('...')
  }
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return (
    <>
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={6}>
        {characters.map((char, idx) => (
          <GridItem key={char.id}>
            <CharacterCard image={char.image} name={char.name} species={char.species} gender={char.gender} idx={idx} />
          </GridItem>
        ))}
      </Grid>

      <HStack wrap="wrap" mt={8} justify="center" spacing={2}>
        {currentPage > 1 && (
          <Link href={`/?page=${currentPage - 1}`} passHref>
            <Button>Previous</Button>
          </Link>
        )}

        {pages.map((page, idx) =>
          typeof page === 'string' ? (
            <Text key={`ellipsis-${idx}`} px={2}>
              {page}
            </Text>
          ) : (
            <Link key={page} href={`/?page=${page}`} passHref>
              <Button variant={page === currentPage ? 'solid' : 'outline'}>
                {page}
              </Button>
            </Link>
          )
        )}

        {currentPage < totalPages && (
          <Link href={`/?page=${currentPage + 1}`} passHref>
            <Button>Next</Button>
          </Link>
        )}
      </HStack>
    </>
  )
}