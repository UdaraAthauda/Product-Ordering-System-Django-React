import { Box, Container, Flex, Heading, Text, Button, Image, Stack } from "@chakra-ui/react";
import img from '../assets/react.svg'

export default function Hero() {
  return (
    <Box bg="teal.300" color="white" py={{ base: 16, md: 24 }} mb={5}>
      <Container maxW="7xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          maxH="2"
        >
          {/* Left Content */}
          <Stack spacing={6} maxW="lg">
            <Heading as="h1" size="2xl" fontWeight="bold" lineHeight="short">
              Simplify Your Product Ordering
            </Heading>
            <Text fontSize="lg" color="blue.100">
              Manage your products, track your orders, and streamline your
              company’s workflow with ease — all in one place.
            </Text>
            <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
              <Button colorPalette="blue" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg" colorPalette="black">
                Learn More
              </Button>
            </Stack>
          </Stack>

          {/* Right Image */}
          <Box mt={{ base: 12, md: 0 }} ml={{ md: 12 }}>
            <Image
              src={img}
              w="200px"
              alt="Product Ordering Illustration"
              borderRadius="xl"
              boxShadow="lg"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
