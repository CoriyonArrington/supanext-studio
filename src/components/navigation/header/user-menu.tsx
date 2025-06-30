// src/components/navigation/header/user-menu.tsx
'use client';

import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { logout } from '~/lib/actions/logout.action';
import type { User } from '@supabase/supabase-js';

interface UserMenuProps {
  user: User | null;
}

export function UserMenu({ user }: UserMenuProps) {
  if (!user) return null;

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        minW={0}
      >
        <Avatar
          size="md"
          name={user.user_metadata.full_name || user.email}
          src={user.user_metadata.avatar_url || ''}
        />
      </MenuButton>
      <MenuList>
        <MenuItem as={NextLink} href="/account">
          Account
        </MenuItem>
        <MenuItem>Support</MenuItem>
        <MenuDivider />
        <form action={logout}>
          <MenuItem as="button" type="submit" w="full" textAlign="left">
            Log Out
          </MenuItem>
        </form>
      </MenuList>
    </Menu>
  );
}