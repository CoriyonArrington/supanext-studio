'use client';

import { Box, AspectRatio } from '@chakra-ui/react';
// 1. Import the Next.js Image component
import Image from 'next/image';

interface DeviceMockupProps {
  deviceType?: 'iphone' | 'ipad' | 'macbook';
  mediaType?: 'image' | 'video';
  mediaSrc: string;
  // 2. Add priority prop to be passed down for LCP optimization
  priority?: boolean;
}

export function DeviceMockup({
  deviceType = 'iphone',
  mediaType = 'image',
  mediaSrc,
  // 3. Default the priority prop to false
  priority = false,
}: DeviceMockupProps) {
  
  const mediaContent = mediaType === 'image' ? (
    // 4. Use the Next.js Image component
    <Image
      src={mediaSrc}
      alt="Device content"
      // Provide explicit width and height for layout stability
      width={deviceType === 'macbook' ? 1200 : 600}
      height={deviceType === 'macbook' ? 750 : 1300}
      // Pass the priority prop to tell Next.js to preload this image
      priority={priority}
      // Use inline styles for styling with next/image
      style={{ height: '100%', width: '100%', objectFit: 'cover' }}
    />
  ) : (
    <video src={mediaSrc} autoPlay loop muted playsInline style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
  );

  // Render a MacBook Pro frame
  if (deviceType === 'macbook') {
    return (
      <Box w={{ base: '90%', md: '100%' }} maxW="600px" mx="auto">
        <Box position="relative" w="full">
          <Box
            pt="65%" // ~16:10 aspect ratio for the screen area
            bg="black"
            borderRadius="xl"
            border="8px solid"
            borderColor="gray.700"
            position="relative"
            overflow="hidden"
          >
            <Box position="absolute" top="0" left="0" right="0" bottom="0">
              {mediaContent}
            </Box>
          </Box>
          <Box
            position="absolute"
            bottom="-10px"
            left="5%"
            right="5%"
            h="12px"
            bg="gray.300"
            _dark={{ bg: 'gray.800' }}
            borderBottomRadius="xl"
          />
        </Box>
      </Box>
    );
  }

  // Render an iPad frame
  if (deviceType === 'ipad') {
    return (
      <Box position="relative" border="10px solid black" borderRadius="24px" boxShadow="xl" bg="black" overflow="hidden" w="360px" mx="auto">
        <AspectRatio ratio={3 / 4}>
          {mediaContent}
        </AspectRatio>
      </Box>
    );
  }

  // Default to iPhone frame
  return (
    <Box position="relative" border="8px solid black" borderRadius="40px" boxShadow="xl" bg="black" overflow="hidden" w="300px" mx="auto">
      <AspectRatio ratio={9 / 19.5}>
        {mediaContent}
      </AspectRatio>
    </Box>
  );
}