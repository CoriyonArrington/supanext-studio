'use client';

import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  useNumberInput,
  type UseNumberInputProps,
} from '@chakra-ui/react';

interface NumberInputStepperProps extends UseNumberInputProps {
  label?: string;
}

export function NumberInputStepper({
  label,
  ...props
}: NumberInputStepperProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      ...props,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const stepper = (
    // Set width to full and remove max-width
    <HStack w="full">
      <Button {...dec}>-</Button>
      {/* Allow the input to grow and fill the space */}
      <Input {...input} textAlign="center" flex={1} />
      <Button {...inc}>+</Button>
    </HStack>
  );

  return label ? (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      {stepper}
    </FormControl>
  ) : (
    stepper
  );
}