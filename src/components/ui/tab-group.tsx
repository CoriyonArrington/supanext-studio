'use client';

import { Tabs, TabList, Tab, type TabsProps } from '@chakra-ui/react';

interface TabGroupProps extends Omit<TabsProps, 'children'> {
  // Pass an array of strings for the tab labels
  tabLabels: string[];
  // The onChange handler will receive the index of the selected tab
  onTabChange?: (index: number) => void;
}

export function TabGroup({
  tabLabels,
  onTabChange,
  ...props
}: TabGroupProps) {
  return (
    <Tabs onChange={onTabChange} {...props}>
      <TabList>
        {tabLabels.map((label) => (
          <Tab key={label}>{label}</Tab>
        ))}
      </TabList>
    </Tabs>
  );
}