import { AbsoluteCenter, Heading } from '@chakra-ui/react'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function Category() {
    const {catID} = useParams()

  return (
    <AbsoluteCenter>
        <Heading>{catID}</Heading>
    </AbsoluteCenter>
  )
}
