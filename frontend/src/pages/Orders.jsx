import {
  Flex,
  Tabs,
  EmptyState,
  VStack,
  Text,
  List,
  Spacer,
  Button,
  RatingGroup,
  Box,
  Center,
} from "@chakra-ui/react";
import { BsHourglassSplit } from "react-icons/bs";
import { FcShipped } from "react-icons/fc";
import { LuShoppingCart } from "react-icons/lu";
import { MdCancel } from "react-icons/md";
import React, { useEffect, useState } from "react";
import api from "@/api";
import { COMPANY_ID } from "@/constants";
import { toaster } from "@/components/ui/toaster";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const companyID = localStorage.getItem(COMPANY_ID);
  const [rate, setRate] = useState(0);
  console.log(rate);

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

  const updataOrders = async (orderID, status) => {
    try {
      if (status === "delete") {
        await api.delete(`order/${companyID}/${orderID}/`);

        toaster.create({
          title: "Deleted",
          description: "Order is deleted successfully",
          type: "success",
          duration: 5000,
        });
      } else {
        await api.patch(`order/${companyID}/${orderID}/`, {
          status: status,
        });

        toaster.create({
          title: "Order status changed",
          description: `Order ${status}`,
          type: "info",
          duration: 5000,
        });
      }

      getData();
    } catch (error) {
      console.error("error in updating order status: ", error);
    }
  };

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );
  const cancelledOrders = orders.filter(
    (order) => order.status === "cancelled"
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
          <Tabs.Trigger value="cancelled">
            <MdCancel />
            Cancelled Orders
          </Tabs.Trigger>
        </Tabs.List>

        <Center>
        <Flex
          mt={3}
          p={2}
          w={"95%"}
          bg={"blue.900"}
          align="center"
          borderRadius={5}
          color={"white"}
          justify={'space-between'}
        >
          <Text ml={3}>Date</Text>
          <Text ml={3}>Items</Text>
          <Text ml={3}>Total Amount</Text>
          <Text ml={3}>Status</Text>
          <Text ml={3}>Action</Text>
        </Flex>
        </Center>

        {/* Pending orders display Tab */}
        <Tabs.Content value="orders">
          {pendingOrders.length > 0 ? (
            <VStack>
              {pendingOrders.map((order) => (
                <Flex
                  mt={1}
                  p={2}
                  w={"95%"}
                  bg={"purple.500"}
                  align="center"
                  borderRadius={5}
                  gap={"85px"}
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
                    {order.status}
                  </Text>
                  <Button
                    colorPalette={"teal"}
                    size={"sm"}
                    mr={3}
                    variant={"subtle"}
                    onClick={() => updataOrders(order.id, "cancelled")}
                  >
                    Cancel the order
                  </Button>
                </Flex>
              ))}
            </VStack>
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

        {/* Delivered orders display Tab */}
        <Tabs.Content value="delivered">
          {deliveredOrders.length > 0 ? (
            <VStack>
              {deliveredOrders.map((order) => (
                <Flex
                  mt={1}
                  p={2}
                  w={"95%"}
                  bg={"green.500"}
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
                    {order.status}
                  </Text>

                  <RatingGroup.Root
                    mr={3}
                    size={"md"}
                    gap={2}
                    count={5}
                    value={rate}
                    onValueChange={(e) => setRate(e.value)}
                    colorPalette={"orange"}
                  >
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Label>Rating:</RatingGroup.Label>
                    <RatingGroup.Control />
                  </RatingGroup.Root>
                </Flex>
              ))}
            </VStack>
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

        {/* Cancelled orders display Tab */}
        <Tabs.Content value="cancelled">
          {cancelledOrders.length > 0 ? (
            <VStack>
              {cancelledOrders.map((order) => (
                <Flex
                  mt={1}
                  p={2}
                  w={"95%"}
                  bg={"yellow.500"}
                  align="center"
                  borderRadius={5}
                  gap={"50px"}
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
                    {order.status}
                  </Text>

                  <Button
                    colorPalette={"teal"}
                    size={"sm"}
                    mr={3}
                    variant={"subtle"}
                    onClick={() => updataOrders(order.id, "pending")}
                  >
                    Place order again
                  </Button>

                  <Button
                    colorPalette={"red"}
                    size={"sm"}
                    mr={3}
                    variant={"subtle"}
                    onClick={() => updataOrders(order.id, "delete")}
                  >
                    Delete
                  </Button>
                </Flex>
              ))}
            </VStack>
          ) : (
            <EmptyState.Root>
              <EmptyState.Content>
                <EmptyState.Indicator>
                  <MdCancel />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                  <EmptyState.Title>No Cancelled Order yet</EmptyState.Title>
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
