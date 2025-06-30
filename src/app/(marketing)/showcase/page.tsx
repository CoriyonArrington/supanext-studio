// src/app/(marketing)/showcase/page.tsx
import { Box, SimpleGrid } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import { Hero } from '~/components/ui/hero';
import { Section } from '~/components/ui/section';
import { createClient } from '~/lib/supabase/server';
import { ShowcaseCard } from '~/components/marketing/showcase/showcase-card';
import { CtaSection } from '~/components/ui/cta-section';

const showcaseItems = [
  {
    title: 'DBT App Platform',
    description: 'A HIPAA-conscious mental health application connecting therapists and clients with digital diary cards, progress tracking, and secure messaging.',
    // FIX: Updated to a descriptive placeholder image
    imageUrl: 'https://placehold.co/1000x800/2AB07A/FFFFFF/png?text=DBT+App+Platform',
    link: 'https://dbt-app-platform.vercel.app/',
    tags: ['Health Tech', 'B2B SaaS', 'Next.js'],
  },
  {
    title: "Coriyon's Studio",
    description: 'A digital product studio building design-driven starter kits and applications to help founders and developers launch faster.',
    // FIX: Updated to a descriptive placeholder image
    imageUrl: 'https://placehold.co/1000x800/4A69E2/FFFFFF/png?text=Coriyon%27s+Studio',
    link: 'https://www.coriyon.com/',
    tags: ['Portfolio', 'Design Systems', 'Chakra UI'],
  },
];

interface ShowcasePageContent {
  hero_headline?: string;
  hero_subheadline?: string;
}

export default async function ShowcasePage() {
  const supabase = await createClient();
  const { data: page } = await supabase.from('pages').select('content').eq('slug', 'showcase').single();

  if (!page || !page.content) { notFound(); }

  const content = page.content as ShowcasePageContent;

  return (
    <Box>
      <Section pt={{ base: 16, md: 20 }} pb={{ base: 10, md: 12 }}>
        <Hero
          title={content.hero_headline ?? 'Built with This Starter'}
          subtitle={content.hero_subheadline ?? 'Explore a gallery of real-world applications built by developers using this starter kit.'}
        />
      </Section>
      <Section pt={0} pb={{ base: 16, md: 24 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {showcaseItems.map((item) => (
            <ShowcaseCard key={item.title} item={item} />
          ))}
        </SimpleGrid>
      </Section>
      <CtaSection
        title="Ready to build your own?"
        subtitle="Use this starter kit to launch your next idea in days, not months."
        primaryActionText="Get Started"
        primaryActionLink="/pricing"
        secondaryActionText="View on GitHub"
        secondaryActionLink="#"
      />
    </Box>
  );
}