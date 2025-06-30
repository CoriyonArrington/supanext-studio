// src/app/(marketing)/faqs/page.tsx
import { Box, Text, VStack, Heading } from '@chakra-ui/react';
import { createClient } from '~/lib/supabase/server';
import { notFound } from 'next/navigation';

import { Hero } from '~/components/ui/hero';
import { CtaSection } from '~/components/ui/cta-section';
import { Accordion, type AccordionItemData } from '~/components/ui/accordion';
import { Section } from '~/components/ui/section';

interface FaqItem {
  question: string;
  answer: string;
  category: string | null;
}

export default async function FaqPage() {
  const supabase = await createClient();
  const pagePromise = supabase.from('pages').select('content').eq('slug', 'faqs').single();
  const faqsPromise = supabase.from('marketing_faqs').select('question, answer, category').order('display_order');
  const [{ data: page }, { data: faqs }] = await Promise.all([ pagePromise, faqsPromise ]);

  if (!page || !page.content || !faqs) { notFound(); }

  const content = page.content as { hero_headline?: string; hero_subheadline?: string; };
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'General';
    if (!acc[category]) { acc[category] = []; }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, FaqItem[]>);

  return (
    <Box>
      <Section pt={{ base: 16, md: 20 }} pb={{ base: 10, md: 12 }}>
        <Hero
          title={content.hero_headline ?? 'Frequently Asked Questions'}
          subtitle={content.hero_subheadline ?? "Find answers to common questions about our platform, features, and security."}
        />
      </Section>
      <Section pt={0} pb={{ base: 16, md: 24 }}>
        <VStack spacing={16} align="stretch" maxW="container.md" mx="auto">
          {Object.entries(groupedFaqs).map(([category, items]) => {
            const accordionItems: AccordionItemData[] = items.map(faq => ({
              title: faq.question,
              content: <Text whiteSpace="pre-wrap">{faq.answer}</Text>
            }));
            return (
              <VStack key={category} spacing={8} align="stretch">
                <Heading as="h2" size="lg">{category}</Heading>
                {accordionItems.length > 0 ? (
                  <Accordion items={accordionItems} />
                ) : (
                  <Text textAlign="center">No frequently asked questions have been added yet.</Text>
                )}
              </VStack>
            );
          })}
        </VStack>
      </Section>
      <CtaSection
        title="Still have questions?"
        subtitle="Our team is here to help. Reach out to us and we'll get back to you as soon as possible."
        primaryActionText="Contact Us"
        primaryActionLink="/contact"
        secondaryActionText="Back to Home"
        secondaryActionLink="/"
      />
    </Box>
  );
}