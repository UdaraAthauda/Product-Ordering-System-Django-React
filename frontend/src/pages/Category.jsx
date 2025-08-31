import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Card,
  Image,
  Button,
} from "@chakra-ui/react";
import { URL } from "@/constants";
import Hero from "@/components/Hero";
import api from "@/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Category() {
  const { catID } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get(`products/${catID}/`);
        setProducts(res.data);
      } catch (error) {
        console.error("error in product fetching: ", error);
      }
    };

    getData();
  }, [catID]);

  return (
    <>
      <Hero />
      <Container centerContent>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={6}>
          {products.map((product) => (
            <Card.Root maxW="xs" key={product.id}>
              <Image
                src={`${URL}${product.img}`}
                alt={`${URL}${product.img}`}
                h="150px"
                borderRadius={5}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>

                <Text
                  textStyle="2xl"
                  fontWeight="medium"
                  letterSpacing="tight"
                  mt="2"
                >
                  $ {product.price}
                </Text>
              </Card.Body>
              <Card.Footer alignSelf={"center"}>
                <Button variant="solid">Add to cart</Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
