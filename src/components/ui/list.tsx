'use client';

import {
  List as ChakraList,
  ListItem,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  type ListProps,
} from '@chakra-ui/react';
import { FaUserCircle } from 'react-icons/fa'; // Example icon

// Define the shape of each item the list will accept
export interface ListItemData {
  id: string;
  primaryText: string;
  icon?: React.ElementType;
}

interface ListComponentProps extends ListProps {
  items: ListItemData[];
}

// This component renders a styled list of items.
export function ListComponent({ items, ...props }: ListComponentProps) {
  const listItemBg = useColorModeValue('white', 'gray.700');

  return (
    <ChakraList spacing={3} {...props}>
      {items.map((item) => (
        <ListItem
          key={item.id}
          p={3}
          bg={listItemBg}
          borderWidth="1px"
          rounded="md"
          shadow="sm"
        >
          <Flex align="center">
            <Icon
              as={item.icon || FaUserCircle} // Use passed icon or a default
              color="gray.500"
              mr={3}
            />
            <Text>{item.primaryText}</Text>
          </Flex>
        </ListItem>
      ))}
    </ChakraList>
  );
}