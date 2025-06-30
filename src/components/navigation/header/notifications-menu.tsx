'use client';

import {
  Avatar,
  Box,
  Flex,
  HStack, // <-- ADDED THIS IMPORT
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiBell } from '~/lib/icons';

// Define the shape of the notification data
export type ChatNotification = {
  room_id: string;
  other_user_name: string | null;
  last_message_content: string | null;
  last_message_at: string | null;
};

interface NotificationsMenuProps {
  notifications: ChatNotification[];
}

export function NotificationsMenu({ notifications }: NotificationsMenuProps) {
  const hasNotifications = notifications.length > 0;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Notifications"
        icon={
          <Box>
            <Icon as={FiBell} />
            {hasNotifications && (
              <Box
                as="span"
                color="white"
                position="absolute"
                top="-1px"
                right="-1px"
                fontSize="0.6rem"
                bgColor="red.500"
                borderRadius="full"
                zIndex="10"
                p="2px 5px"
              >
                {notifications.length}
              </Box>
            )}
          </Box>
        }
        variant="ghost"
        size="sm"
      />
      <MenuList>
        <Flex justify="space-between" align="center" px={3} py={1}>
          <Text fontWeight="bold">Notifications</Text>
        </Flex>
        <MenuDivider />
        {hasNotifications ? (
          <VStack spacing={0} align="stretch">
            {notifications.map((n) => (
              <MenuItem
                key={n.room_id}
                as={NextLink}
                href={`/chat/${n.room_id}`}
                whiteSpace="normal"
              >
                <HStack align="flex-start" spacing={3}>
                  <Avatar size="sm" name={n.other_user_name ?? 'User'} />
                  <VStack align="flex-start" spacing={0}>
                    <Text fontWeight="bold">{n.other_user_name}</Text>
                    <Text fontSize="xs" noOfLines={1} color="gray.500">
                      {n.last_message_content}
                    </Text>
                  </VStack>
                </HStack>
              </MenuItem>
            ))}
          </VStack>
        ) : (
          <Text px={3} py={2} fontSize="sm" color="gray.500">
            You have no new messages.
          </Text>
        )}
      </MenuList>
    </Menu>
  );
}
