export const revalidate = 60 

import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { cookies } from 'next/headers'
import { queryRSC } from '../lib/fetch'
import SetupModal from '@/components/setupModal'
import UserInfo from '@/components/userInfo'


export default async function Page({ searchParams }: { searchParams?: Promise<{ page?: string }> }) {
  const params = (await searchParams) ?? {}
  const raw = params?.page ?? '1'
  const pageNum = parseInt(raw, 10)
  const currentPage = isNaN(pageNum) || pageNum < 1 ? 1 : pageNum

  const cookieStore = await cookies()
  const userCookie = cookieStore.get('userInfo')
  if (!userCookie) return <SetupModal />

  const user = JSON.parse(decodeURIComponent(userCookie.value))
  const { results, info } = await queryRSC(currentPage)

  //FIXME
  console.log(results)

  return (
    <Box px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }} minH="80vh" maxW="1200px" mx="auto">
      <Box
        as="header"
        bgSize="cover"
        bgPosition="center"
        h={{ base: '100px', md: '150px' }}
        mb={8}
      >
        <Flex
          bgColor="rgba(0,0,0,0.4)"
          align="center"
          justify="space-between"
          h="100%"
          px={{ base: 4, md: 8 }}
        >
          <Heading color="white" size="lg">Rick & Morty Gallery</Heading>
          <Flex align="center">
            <UserInfo username={user.username} />
          </Flex>
        </Flex>
      </Box>
      <Box as="footer" textAlign="center" mt={12} py={4} borderTop="1px" borderColor="gray.200">
        Made by Aman Kawatra — v3.5
      </Box>
    </Box>
  )
}