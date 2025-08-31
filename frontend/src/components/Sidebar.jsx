import { Button, CloseButton, Drawer, Portal, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "@/api";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const { name } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (name === "Categories") {
      const getCategories = async () => {
        try {
          const res = await api.get("categories/");
          setCategories(res.data);
        } catch (error) {
          console.error("error in category fetching: ", error);
        }
      };

      getCategories()
    }
  }, [name]);

  return (
    <Drawer.Root size={'xs'}>
      <Drawer.Trigger asChild>
        <Text cursor={"pointer"}>{name}</Text>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md">
            <Drawer.Header>
              <Drawer.Title>{name}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              
              <VStack as={"ul"} justifySelf={'center'} align={'start'} gap={4} w={'full'}>
                {categories.map((cat) => (
                    <Button as={Link} to={`/categories/${cat.id}`} w='full' variant={'outline'} key={cat.id}>
                        <li>{cat.name}</li>
                    </Button>
                ))}
              </VStack>
              
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default Sidebar;
