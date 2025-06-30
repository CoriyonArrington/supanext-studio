// src/components/account/account-form.tsx
'use client';

import {
  Avatar, Box, Button, FormControl, FormLabel, Heading, HStack, Input, Spinner, Switch, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue, useToast, VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition, type ChangeEvent } from 'react';
import { updateProfile } from '~/lib/actions/profile.action';
import { createStripePortalSession } from '~/lib/actions/billing.action';
import { updateNotificationSettings } from '~/lib/actions/settings.action';
import type { User } from '@supabase/supabase-js';
import type { Database } from '~/lib/database.types';
import { uploadAvatar } from '~/lib/supabase/storage';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

interface AccountFormProps {
  user: User | null;
  profile: Profile | null;
  subscription: Subscription | null;
}

function ProfileTab({ user, profile }: { user: User | null; profile: Profile | null }) {
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    console.log('[account-form.tsx] handleAvatarUpload triggered.');
    if (!user) {
      console.error('[account-form.tsx] User not found for avatar upload.');
      return;
    }
    if (!event.target.files || event.target.files.length === 0) {
      console.log('[account-form.tsx] No file selected.');
      return;
    }

    const file = event.target.files[0];
    console.log('[account-form.tsx] File selected:', file.name);
    setIsUploading(true);
    
    try {
      const newAvatarUrl = await uploadAvatar(user.id, file);
      
      const formData = new FormData();
      // Important: Only send the avatarUrl to prevent validation errors on other fields
      formData.append('avatarUrl', newAvatarUrl);
      
      console.log('[account-form.tsx] Calling updateProfile action with new avatar URL.');
      const result = await updateProfile(formData);
      
      if (result.success) {
        toast({ title: 'Avatar updated!', status: 'success', isClosable: true });
        router.refresh();
      } else {
        console.error('[account-form.tsx] updateProfile action failed after upload:', result.message);
        throw new Error(result.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred.';
      console.error('[account-form.tsx] Full upload/update process error:', error);
      toast({ title: 'Upload Error', description: message, status: 'error', isClosable: true });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = (formData: FormData) => {
    console.log('[account-form.tsx] handleFormSubmit triggered for name/email update.');
    startTransition(async () => {
      const result = await updateProfile(formData);
      toast({ title: result.success ? 'Success' : 'Error', description: result.message, status: result.success ? 'success' : 'error', isClosable: true });
      if (result.success) router.refresh();
    });
  };

  return (
    <VStack as="form" action={handleFormSubmit} spacing={6} align="stretch">
      <FormControl>
        <FormLabel>Avatar</FormLabel>
        <HStack spacing={4}>
          <Avatar size="lg" name={profile?.full_name || ''} src={profile?.avatar_url || ''} />
          <Input id="avatar-upload" type="file" name="avatar" accept="image/*" onChange={handleAvatarUpload} isDisabled={isUploading} p={1.5} sx={{'::file-selector-button': { mr: 4 }}}/>
          {isUploading && <Spinner size="sm" />}
        </HStack>
      </FormControl>

      <FormControl>
        <FormLabel>Full Name</FormLabel>
        <Input name="fullName" defaultValue={profile?.full_name || ''} size="lg" />
      </FormControl>
      <FormControl>
        <FormLabel>Email Address</FormLabel>
        <Input name="email" defaultValue={user?.email || ''} size="lg" />
      </FormControl>
      <Button type="submit" colorScheme="teal" alignSelf="flex-start" isLoading={isPending}>
        Update Profile
      </Button>
    </VStack>
  );
}

function BillingTab({ subscription }: { subscription: AccountFormProps['subscription'] }) {
    const [isPending, startTransition] = useTransition();
    const toast = useToast();
    const cardBg = useColorModeValue('gray.50', 'gray.700');
  
    const handleManageSubscription = () => {
      startTransition(async () => {
        const result = await createStripePortalSession();
        if (result.error) { toast({ title: 'Error', description: result.error, status: 'error' }); }
        else if (result.url) { window.location.href = result.url; }
      });
    };
  
    const hasActiveSubscription = subscription && subscription.status === 'active';
    const planName = hasActiveSubscription ? 'Pro Plan' : 'Hobby Plan';
  
    return (
      <VStack spacing={6} align="stretch">
        <Box p={4} bg={cardBg} borderRadius="md">
          <HStack justify="space-between">
            <Text fontWeight="medium">Your current plan:</Text>
            <Text fontWeight="bold" textTransform="capitalize">{planName}</Text>
          </HStack>
        </Box>
        {hasActiveSubscription ? (
          <>
            <Text>Manage your subscription and view payment history in the Stripe Customer Portal.</Text>
            <Button onClick={handleManageSubscription} colorScheme="teal" alignSelf="flex-start" isLoading={isPending}>
              Manage Billing
            </Button>
          </>
        ) : (
          <>
            <Text>You are currently on the free Hobby plan. Upgrade to unlock pro features.</Text>
            <Button as={NextLink} href="/pricing" colorScheme="teal" alignSelf="flex-start">
              Upgrade to Pro
            </Button>
          </>
        )}
      </VStack>
    );
  }
  
function SettingsTab({ profile }: { profile: Profile | null }) {
      const toast = useToast();
  
      const handleSettingChange = async (setting: 'email' | 'push', value: boolean) => {
          const settingKey = setting === 'email' ? 'email_notifications_enabled' : 'push_notifications_enabled';
          const result = await updateNotificationSettings({ [settingKey]: value });
  
          toast({
              title: result.success ? 'Setting Saved' : 'Error',
              description: result.message,
              status: result.success ? 'success' : 'error',
              isClosable: true,
              duration: 3000
          });
      }
  
      return (
          <VStack spacing={6} align="stretch">
              <Text>Manage your application preferences here.</Text>
              <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="email-notifications" mb="0">Email Notifications</FormLabel>
                  <Switch 
                      id="email-notifications" 
                      defaultChecked={profile?.email_notifications_enabled}
                      onChange={(e) => handleSettingChange('email', e.target.checked)}
                  />
              </FormControl>
               <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="push-notifications" mb="0">Push Notifications</FormLabel>
                  <Switch 
                      id="push-notifications" 
                      defaultChecked={profile?.push_notifications_enabled}
                      onChange={(e) => handleSettingChange('push', e.target.checked)}
                  />
              </FormControl>
          </VStack>
      );
  }

export function AccountForm({ user, profile, subscription }: AccountFormProps) {
  return (
    <VStack spacing={8} align="stretch">
      <Heading as="h1" size="lg">Account Settings</Heading>
      <Tabs variant="enclosed-colored" colorScheme="teal">
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Billing</Tab>
          <Tab>Settings</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><ProfileTab user={user} profile={profile} /></TabPanel>
          <TabPanel><BillingTab subscription={subscription} /></TabPanel>
          <TabPanel><SettingsTab profile={profile} /></TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}