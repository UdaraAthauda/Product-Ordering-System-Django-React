import {
  Box,
  Center,
  Flex,
  Tabs,
  EmptyState,
  VStack,
  Text,
  List,
  HStack,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { BsHourglassSplit } from "react-icons/bs";
import { FcShipped } from "react-icons/fc";
import { LuShoppingCart } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import api from "@/api";
import { COMPANY_ID } from "@/constants";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const companyID = localStorage.getItem(COMPANY_ID);

  const getData = async () => {
    try {
      const res = await api.get(`order/${companyID}/`);
      setOrders(res.data);
    } catch (error) {
      console.error("error in fetching orders: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  return (
    <>
      <Tabs.Root defaultValue="orders" size={"lg"} mt={5}>
        <Tabs.List ml={10} mr={10}>
          <Tabs.Trigger value="orders">
            <BsHourglassSplit />
            Pending Orders
          </Tabs.Trigger>
          <Tabs.Trigger value="delivered">
            <FcShipped />
            Delivered Orders
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="orders">
          {pendingOrders.length > 0 ? (
            <Center>
              {pendingOrders.map((order) => (
                <Flex
                  mt={3}
                  p={2}
                  w={"95%"}
                  bg={"purple.500"}
                  align="center"
                  borderRadius={5}
                  gap={"80px"}
                  key={order.id}
                  color={"white"}
                >
                  <Text ml={3}>
                    {new Date(order.created_at).toISOString().split("T")[0]}
                  </Text>

                  <List.Root>
                    {order.items.map((item) => (
                      <List.Item key={item.id}>
                        {item.product_name} - {item.quantity} x {item.price} = ${" "}
                        {item.subtotal}
                      </List.Item>
                    ))}
                  </List.Root>

                  <Text>Total: $ {order.total_amount}</Text>

                  <Spacer />

                  <Text border={"1px solid"} p={1} borderRadius={5}>
                    Status: {order.status}
                  </Text>
                  <Button
                    colorPalette={"teal"}
                    size={"sm"}
                    mr={3}
                    variant={"subtle"}
                  >
                    Cancel the order
                  </Button>
                </Flex>
              ))}
            </Center>
          ) : (
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <LuShoppingCart />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>No Order in process</EmptyState.Title>
                  <EmptyState.Description>
                    Explore our products and add items to your cart and place
                    order
                  </EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          )}
        </Tabs.Content>

        <Tabs.Content value="delivered">
          {deliveredOrders.length > 0 ? (
            <Center>
              {deliveredOrders.map((order) => (
                <Flex
                  mt={3}
                  p={2}
                  w={"95%"}
                  bg={"purple.500"}
                  align="center"
                  borderRadius={5}
                  gap={"80px"}
                  key={order.id}
                  color={"white"}
                >
                  <Text ml={3}>
                    {new Date(order.created_at).toISOString().split("T")[0]}
                  </Text>

                  <List.Root>
                    {order.items.map((item) => (
                      <List.Item key={item.id}>
                        {item.product_name} - {item.quantity} x {item.price} = ${" "}
                        {item.subtotal}
                      </List.Item>
                    ))}
                  </List.Root>

                  <Text>Total: $ {order.total_amount}</Text>

                  <Spacer />

                  <Text border={"1px solid"} p={1} borderRadius={5}>
                    Status: {order.status}
                  </Text>
                  <Button
                    colorPalette={"teal"}
                    size={"sm"}
                    mr={3}
                    variant={"subtle"}
                  >
                    Cancel the order
                  </Button>
                </Flex>
              ))}
            </Center>
          ) : (
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <FcShipped />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>No Delivered Order yet</EmptyState.Title>
                  <EmptyState.Description>
                    Explore our products and add items to your cart and place
                    order
                  </EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
