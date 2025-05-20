'use client'

import React from 'react'
import {
  Box,
  Avatar,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { EditIcon } from '@chakra-ui/icons'

interface UserInfoClientProps {
  username: string
}

export default function UserInfo({ username }: UserInfoClientProps) {
  const router = useRouter()

  // clear user info from cookie and allow for edit
  const handleEdit = () => {
    document.cookie = 'userInfo=; path=/; max-age=0'
    router.refresh()
  }

  return (
  <Box>
    <Tooltip label="Edit username and job title" placement="left">
      <Box
        position="relative"
        display="inline-block"
        cursor="pointer"
        onClick={handleEdit}
      >
        <Avatar name={username} size="md" />
        <IconButton
          aria-label="Edit profile"
          icon={<EditIcon />}
          size="xs"
          position="absolute"
          bottom={0}
          right={0}
          transform="translate(25%, 25%)"
          variant="solid"
          borderRadius="full"
        />
      </Box>
    </Tooltip>
  </Box>
  )
}