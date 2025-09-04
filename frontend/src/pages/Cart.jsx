import {
  Container,
  SimpleGrid,
  Text,
  Card,
  Image,
  Button,
  NumberInput,
  Flex,
  Box,
  HStack,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import api from "@/api";
import { COMPANY_ID, URL } from "@/constants";
import React, { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";

export default function Cart() {
  const companyID = localStorage.getItem(COMPANY_ID);
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleQuantities = (data) => {
    data.map((item) => {
      setQuantities((prev) => ({ ...prev, [item.product]: item.quantity }));
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await api.get(`cart/${companyID}/`);

        setCart(res.data);
        setItems(res.data.items);
        handleQuantities(res.data.items);
      } catch (error) {
        console.error("error in fetching cart: ", error);
      }
    };

    getData();
  }, []);

  const handleFormChange = (productID, details) => {
    setQuantities((prev) => ({
      ...prev,
      [productID]: parseInt(details.value),
    }));
  };

  const handleSubmit = async (e, itemID, productID) => {
    const data = {
      quantity: quantities[productID],
    };

    try {
      const res = await api.patch(`cart/item/${companyID}/${itemID}/`, data);

      toaster.create({
        title: "successful",
        description: "Item updated successfully.",
        type: "success",
        duration: 5000,
      });
    } catch (error) {
      console.error("error in updating cart: ", error);
    }
  };

  const handleDelete = async (itemID) => {
    try {
      const res = await api.delete(`cart/item/${companyID}/${itemID}/`);

      toaster.create({
        title: "Successful",
        description: "Cart item deleted successfully",
        type: "info",
        duration: 5000,
      });
    } catch (error) {
      console.error("error in delete cart item: ", error);
    }
  };

  return (
    <>
      <Flex h={"70px"} w={"full"} bg={"green.500"} align="center">
        <Box ml={10} color={'white'}>
          <HStack spaceX={5}>
            <Heading>Cart Summery</Heading>
            <Text>items: {items.length}</Text>
            <Text>Total Price: $ {cart.total}</Text>
          </HStack>
        </Box>
        <Spacer />
        <HStack mr={10}><Button variant={'subtle'} colorPalette={'purple'}>Place Order</Button></HStack>
      </Flex>

      <Container centerContent mt={5}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={6}>
          {items.map((item) => (
            <Card.Root
              as={"form"}
              onSubmit={(e) => handleSubmit(e, item.id, item.product)}
              size={"sm"}
              key={item.id}
            >
              <Image
                src={`${URL}${item.product_image}`}
                alt={`${URL}${item.product_image}`}
                h="150px"
                borderRadius={5}
              />
              <Card.Body>
                <Card.Title>{item.product_name}</Card.Title>

                <Text textStyle={"xs"}>Unit Price: $ {item.product_price}</Text>

                <Text
                  textStyle="xl"
                  fontWeight="medium"
                  letterSpacing="tight"
                  mt="2"
                >
                  <small>Subtotal:</small> $ {item.subtotal}
                </Text>
              </Card.Body>
              <Card.Footer alignSelf={"center"}>
                <Button type="submit" variant="solid" size="xs" w="100px">
                  Update
                </Button>

                <NumberInput.Root
                  value={(quantities[item.product] || 1).toString()}
                  onValueChange={(details) =>
                    handleFormChange(item.product, details)
                  }
                  size={"xs"}
                  min={1}
                >
                  <NumberInput.Control />
                  <NumberInput.Input name="quantity" />
                </NumberInput.Root>
              </Card.Footer>

              <Button
                onClick={() => handleDelete(item.id)}
                variant={"subtle"}
                size={"xs"}
                colorPalette={"red"}
              >
                Delete
              </Button>
            </Card.Root>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
