import { Box, Container, Flex, Heading, Text, Button, Image, Stack } from "@chakra-ui/react";
import img from '../assets/react.svg'

export default function Hero() {
  return (
    <Box bg="green.500" color="white" py={{ base: 16, md: 24, sm: 20  }}>
      <Container maxW="7xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          maxH="2"
        >
          {/* Left Content */}
          <Stack maxW="lg" mt={{base: 0, md: 0, sm: -12}}>
            <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="short">
              Simplify Your Product Ordering
            </Heading>
            <Text fontSize="lg" color="blue.100">
              Manage your products, track your orders, and streamline your
              company’s workflow with ease — all in one place.
            </Text>
          </Stack>

          {/* Right Image */}
          <Box mt={{ base: 12, md: 0 }} ml={{ md: 12 }}>
            <Image
              src={img}
              w="200px"
              alt="Product Ordering Illustration"
              borderRadius="xl"
              boxShadow="lg"
              display={{base: "none", md: "block"}}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
