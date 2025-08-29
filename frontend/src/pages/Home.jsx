import { Container, Heading, Text } from '@chakra-ui/react'
import { USER } from '@/constants'

export default function Home() {
  const user = localStorage.getItem(USER)
  
  return (
    <Container centerContent>
      <Heading>Home</Heading>
      <Text>{user}</Text>
    </Container>
  )
}
