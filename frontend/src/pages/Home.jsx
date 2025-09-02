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
import { URL, COMPANY_NAME, COMPANY_ID } from "@/constants";
import Hero from "@/components/Hero";
import api from "@/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("products/");
        setProducts(res.data);

        const res2 = await api.get("company/");
        
        if (res2.data && res2.data.length > 0) {
          const company = res2.data[0]
          localStorage.setItem(COMPANY_ID, company.id)
          localStorage.setItem(COMPANY_NAME, company.name)
        } else {
          navigate('/company')
        }
        
      } catch (error) {
        console.error("error in product fetching: ", error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <Hero />
      <Container centerContent mt={5}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={6}>
          {products.map((product) => 
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
          )}
        </SimpleGrid>
      </Container>
    </>
  );
}
