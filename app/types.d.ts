export interface Character {
    id: string
    name: string
    image: string
    species: string
    gender: string
}
  
export interface Info {
    pages: number
}

export interface CharactersConnection {
    info: Info
    results: Character[]
}