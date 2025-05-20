import { gql } from '@apollo/client'
import { getClient } from './apolloClient'
import type { CharactersConnection } from '@/app/types'

export async function queryRSC(page: number = 1): Promise<CharactersConnection> {
  const { data } = await getClient().query<{ characters: CharactersConnection }>({
    query: gql`
      query GetCharacters($page: Int!) {
        characters(page: $page) {
          info { pages }
          results { 
            id 
            name 
            image 
            species 
            gender
          }
        }
      }
    `,
    variables: { page },
  })
  return data.characters
}