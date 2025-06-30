// src/components/ui/theme-switcher.tsx
'use client';

import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorMode,
  type IconButtonProps,
  Icon,
  Text,
  HStack,
} from '@chakra-ui/react';
import { FaCheckCircle, FaDesktop, FaMoon, FaSun } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export const ThemeSwitcher = (props: Omit<IconButtonProps, 'aria-label'>) => {
  const { colorMode, setColorMode } = useColorMode();
  // FIX: Explicitly type the state to allow for 'system'
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    // FIX: Correctly type the value from localStorage
    const savedTheme = localStorage.getItem('chakra-ui-color-mode') as 'light' | 'dark' | 'system' | null;
    setTheme(savedTheme || 'system');
  }, []);

  const handleSetTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setColorMode(newTheme);
  };

  const menuOptions = [
    { value: 'light', text: 'Light', icon: FaSun },
    { value: 'dark', text: 'Dark', icon: FaMoon },
    { value: 'system', text: 'System', icon: FaDesktop },
  ];

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Toggle theme"
        variant="ghost"
        icon={colorMode === 'dark' ? <FaMoon /> : <FaSun />}
        {...props}
      />
      <MenuList minW="0" w="160px">
        {menuOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSetTheme(option.value as 'light' | 'dark' | 'system')}
          >
            <HStack w="full" justify="space-between">
              <HStack>
                <Icon as={option.icon} mr={2} />
                <Text>{option.text}</Text>
              </HStack>
              {theme === option.value && <Icon as={FaCheckCircle} color="teal.500" />}
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};