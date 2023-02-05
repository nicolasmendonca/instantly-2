import { asyncWritable, type Loadable } from '@square/svelte-store';
import { instantlyClient } from '$src/infrastructure/supabase';
import { taskIdStore } from './taskIdStore';

export type ChatMessage = {
  id: string;
  text: string;
  senderProfile: {
      id: string;
      fullName: string;
      avatarUrl: string;
  };
  createdAt: Date;
}

export const chatMessagesStore = asyncWritable<[Loadable<string>], ChatMessage[]>(
  [taskIdStore],
  async ([$taskId]) => instantlyClient.getMessagesWithSenderProfile($taskId),
  // Accept a function that takes any updated promises to update the UI without performing extra requests
  async (updatedMessages) => updatedMessages
)


