import { asyncWritable } from '@square/svelte-store';
import { supabaseClient } from '$src/infrastructure/supabase';
import { taskIdStore } from './taskIdStore';
import { z } from 'zod';

export const chatMessageDBSchema = z.object({
  id: z.string(),
  sender_id: z.object({
    id: z.string(),
    full_name: z.string(),
    avatar_url: z.string()
  }),
  text: z.string(),
  created_at: z.string()
})

export type ChatMessageAppType = {
  id: string;
  sender: {
    id: string;
    fullName: string;
    avatarUrl: string;
  },
  text: string;
  createdAt: Date;
}

export const getDbQuery = (taskId: string) => supabaseClient
      .from('messages')
      .select(`
        id,
        sender_id:profiles ( id, full_name, avatar_url ),
        text,
        created_at
      `)
      .eq('task_id', taskId)

export const parseMessageWithProfileFromDb = (queryResult: any): ChatMessageAppType => {
  const parsedMessageDb = chatMessageDBSchema.parse(queryResult)
  return <ChatMessageAppType>{
    id: parsedMessageDb.id,
    sender: {
      id: parsedMessageDb.sender_id.id,
      avatarUrl: parsedMessageDb.sender_id.avatar_url,
      fullName: parsedMessageDb.sender_id.full_name
    },
    text: parsedMessageDb.text,
    createdAt: new Date(parsedMessageDb.created_at)
  }
}

export const parseMessageListWithProfileFromDb = (queryResult: Awaited<ReturnType<typeof getDbQuery>>): ChatMessageAppType[] => {
  const parsedMessageDbList = z.array(z.any()).parse(queryResult.data);
  return parsedMessageDbList.map((item) => parseMessageWithProfileFromDb(item))
}

export const createChannel = ({
  taskId,
  // workspaceId,
  // authUserId,
}: {
  taskId: string;
  workspaceId: string;
  authUserId: string;
}) => supabaseClient.channel(`${taskId}/messages`).on(
		'postgres_changes',
		{
			schema: 'public',
			event: 'INSERT',
			table: 'messages',
      filter: `task_id=eq.${taskId}`
		},
		async (payload) => {
			const parsedMessage = z.object({
        new: z.object({ id: z.string() })
      }).parse(payload);
			console.log(parsedMessage);
			const queryResult = await getDbQuery(taskId)
				.eq('id', parsedMessage.new.id)
				.single();
			const parsedMessageWithProfile = parseMessageWithProfileFromDb(queryResult.data);
			chatMessagesStore.update((prevMessages) => prevMessages.concat(parsedMessageWithProfile));
			console.log(parsedMessageWithProfile);
		}
	);

export const chatMessagesStore = asyncWritable(
  [taskIdStore],
  async ([$taskId]) => getDbQuery($taskId).then(parseMessageListWithProfileFromDb)
)


