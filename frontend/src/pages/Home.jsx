import {
  Container,
  SimpleGrid,
  Text,
  Card,
  Image,
  Button,
  NumberInput,
} from "@chakra-ui/react";
import { URL, COMPANY_NAME, COMPANY_ID } from "@/constants";
import Hero from "@/components/Hero";
import api from "@/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toaster } from "@/components/ui/toaster";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [companyID, setCompanyID] = useState(null)
  const navigate = useNavigate();
  
  // store quantities by product.id
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get("products/");
        setProducts(res.data);

        const res2 = await api.get("company/");

        if (res2.data && res2.data.length > 0) {
          const company = res2.data[0];
          setCompanyID(company.id)
          localStorage.setItem(COMPANY_ID, company.id);
          localStorage.setItem(COMPANY_NAME, company.name);
        } else {
          navigate("/company");
        }
      } catch (error) {
        console.error("error in product fetching: ", error);
      }
    };

    getData();
  }, []);

  const handleFormChange = (productID, details) => {
    setQuantities(prev => ({...prev, [productID]: parseInt(details.value) || 1}))
  };

  const handleSubmit = async (e, productID) => {
    e.preventDefault();

    const data = {
      product_id: productID,
      quantity: quantities[productID] || 1,
    };
    
    try {
      const res = await api.post(`cart/add/${companyID}/`, data)
     
      toaster.create({
          title: "Successful",
          description: "Item is added to the cart.",
          type: 'success',
          duration: 5000,
        })

    } catch (error) {
      console.error('error in cart data submitting: ', error)
    }
  };

  return (
    <>
      <Hero />
      <Container centerContent mt={5}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={6}>
          {products.map((product) => (
            <Card.Root
              as={"form"}
              onSubmit={(e) => handleSubmit(e, product.id)}
              maxW="xs"
              key={product.id}
            >
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
                <Button type="submit" variant="solid" size="xs">
                  Add to cart
                </Button>

                <NumberInput.Root
                  value={(quantities[product.id] || 1).toString()}
                  onValueChange={(details) => handleFormChange(product.id, details)}
                  size={"xs"}
                  min={1}
                >
                  <NumberInput.Control />
                  <NumberInput.Input name="quantity"/>
                </NumberInput.Root>

              </Card.Footer>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
