// src/app/(marketing)/contact/page.tsx
import {
  Box,
  Container,
  Divider,
  Heading,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '~/lib/supabase/server';

import { Section } from '~/components/ui/section';
import { CalendlyWidget } from '~/components/ui/calendly-widget';
import { ContactModal } from '~/components/marketing/contact/contact-modal';
import { Hero } from '~/components/ui/hero';

interface ContactContent {
  hero_headline: string;
  hero_subheadline: string;
  contact_sections: { title: string; description: string; cta_link: string; cta_text: string; }[];
}

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: page } = await supabase.from('pages').select('content').eq('slug', 'contact').single();

  if (!page || !page.content) { notFound(); }

  const content = page.content as unknown as ContactContent;
  const { hero_headline, hero_subheadline, contact_sections } = content;

  return (
    <Box>
      <Section pt={{ base: 16, md: 20 }} pb={{ base: 10, md: 12 }}>
        <Hero title={hero_headline} subtitle={hero_subheadline} />
      </Section>
      <Section pt={0} pb={{ base: 16, md: 24 }}>
        <Container maxW="container.xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 12, lg: 16 }}>
            <VStack align="flex-start" spacing={8}>
              <Stack spacing={6} pt={4} w="full">
                {contact_sections.map((section) => (
                  <VStack key={section.title} align="flex-start" spacing={2}>
                    <Heading size="md">{section.title}</Heading>
                    <Text color="gray.600">{section.description}</Text>
                    <ChakraLink as={NextLink} href={section.cta_link} color="teal.500" fontWeight="medium">
                      {section.cta_text}
                    </ChakraLink>
                  </VStack>
                ))}
                <Divider />
                <ContactModal />
              </Stack>
            </VStack>
            <CalendlyWidget url="https://calendly.com/your-username/your-event" />
          </SimpleGrid>
        </Container>
      </Section>
    </Box>
  );
}