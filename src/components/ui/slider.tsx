'use client';

import {
  Box,
  Flex,
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormLabel,
  FormControl,
  type SliderProps,
} from '@chakra-ui/react';

interface SliderComponentProps extends SliderProps {
  // Make the label prop optional
  label?: string;
  leftLabel?: string;
  rightLabel?: string;
}

export function Slider({
  label,
  leftLabel,
  rightLabel,
  ...props
}: SliderComponentProps) {
  // The core slider element
  const slider = (
    <>
      <ChakraSlider {...props}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </ChakraSlider>
      {(leftLabel || rightLabel) && (
        <Flex justify="space-between" mt={1}>
          <Box as="span" fontSize="xs" color="gray.500">
            {leftLabel}
          </Box>
          <Box as="span" fontSize="xs" color="gray.500">
            {rightLabel}
          </Box>
        </Flex>
      )}
    </>
  );

  // If a label is provided, wrap the slider in a FormControl.
  // Otherwise, just return the slider itself.
  return label ? (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      {slider}
    </FormControl>
  ) : (
    slider
  );
}