// src/app/(marketing)/page.tsx
import { createClient } from '~/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Box } from '@chakra-ui/react';

import { HeroSection } from '~/components/marketing/home/hero-section';
import { FeatureGrid } from '~/components/ui/feature-grid';
import { TestimonialsSection } from '~/components/ui/testimonials-section';
import { CtaSection } from '~/components/ui/cta-section';
import { SolutionSection } from '~/components/ui/solution-section';
import { ComponentShowcase } from '~/components/marketing/home/component-showcase';
import { AnalyticsShowcase } from '~/components/marketing/home/analytics-showcase';
import { SecurityShowcase } from '~/components/marketing/home/security-showcase';


interface HomePageContent {
  hero_headline?: string;
  hero_subheadline?: string;
  problem_headline?: string;
  problem_subheadline?: string;
  final_cta_headline?: string;
  final_cta_subheadline?: string;
  solution_1_headline?: string;
  solution_1_subheadline?: string;
  solution_2_headline?: string;
  solution_2_subheadline?: string;
  solution_3_headline?: string;
  solution_3_subheadline?: string;
}

interface Feature {
  id: string;
  section_id: string;
  icon_name: string;
  title: string;
  description: string;
}

export default async function LandingPage() {
  const supabase = await createClient();

  const pagePromise = supabase.from('pages').select('content').eq('slug', 'home').single();
  const featuresPromise = supabase.from('marketing_features').select('id, section_id, icon_name, title, description').order('display_order');
  const [{ data: pageData }, { data: featuresData }] = await Promise.all([ pagePromise, featuresPromise ]);

  if (!pageData?.content || !featuresData) {
    notFound();
  }

  const content = pageData.content as HomePageContent;
  const allFeatures = featuresData as Feature[];
  const problemFeatures = allFeatures.filter(f => f.section_id === 'problem');
  const solutionFeatures = allFeatures.filter(f => f.section_id.startsWith('solution_'));
  const solutionContent = [
    <ComponentShowcase key="solution-1" />,
    <AnalyticsShowcase key="solution-2" />,
    <SecurityShowcase key="solution-3" />
  ];

  return (
    <Box>
      <HeroSection
        headline={content.hero_headline ?? 'A Better Way to Build Your Next Idea'}
        subheadline={
          content.hero_subheadline ??
          'Our platform provides the foundation you need to build, launch, and scale your SaaS application faster than ever before.'
        }
      />

      <FeatureGrid
        headline={content.problem_headline ?? 'Stop Rebuilding the Wheel'}
        subheadline={
          content.problem_subheadline ??
          'Building a new SaaS product involves solving the same problems every time: authentication, payments, user profiles. This starter kit handles it all for you.'
        }
        features={problemFeatures.map((f) => ({
          icon: f.icon_name,
          title: f.title,
          description: f.description,
        }))}
        iconColor="red.500"
        py={{ base: 16, md: 24 }}
      />

      {solutionFeatures.map((feature, index) => (
        <SolutionSection
          key={feature.id}
          iconName={feature.icon_name}
          headline={content[`solution_${index + 1}_headline` as keyof HomePageContent] as string ?? feature.title}
          subheadline={content[`solution_${index + 1}_subheadline` as keyof HomePageContent] as string ?? feature.description}
          isReversed={index % 2 !== 0}
          py={{ base: 16, md: 24 }}
        >
          {solutionContent[index]}
        </SolutionSection>
      ))}

      {/* FIX: Added padding to the TestimonialsSection */}
      <Box py={{ base: 16, md: 24 }}>
        <TestimonialsSection />
      </Box>

      <CtaSection
        title={content.final_cta_headline ?? 'Ready to Build Your Vision?'}
        subtitle={
          content.final_cta_subheadline ??
          'Start for free today or explore our flexible pricing plans for your business.'
        }
        primaryActionText="Get Started Free"
        primaryActionLink="/sign-up"
        secondaryActionText="View Pricing"
        secondaryActionLink="/pricing"
      />
    </Box>
  );
}