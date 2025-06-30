'use client';

import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  type AlertProps,
} from '@chakra-ui/react';

interface ReusableAlertProps extends AlertProps {
  title: string;
  description?: string;
}

export function Alert({ title, description, ...props }: ReusableAlertProps) {
  return (
    <ChakraAlert status={props.status || 'info'} borderRadius="md" {...props}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </ChakraAlert>
  );
}