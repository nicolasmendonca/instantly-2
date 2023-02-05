<script lang="ts">
	import ChatBubble from './ChatBubble.svelte';
	import ChatInput from './ChatInput.svelte';
	import { chatMessagesStore } from '$src/application/stores/chatMessagesStore';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { instantlyClient } from '$src/infrastructure/supabase';
	import { authUserProfileStore } from '$src/application/stores/authUserProfileStore';

	$: authUserProfile = $authUserProfileStore;

	const handleSendNewMessage = async (text: string) => {
		chatMessagesStore.update((messages) => {
			if (!authUserProfile) throw new Error('User profile is not loaded');
			return [
				...messages,
				{
					id: crypto.randomUUID(),
					createdAt: new Date(),
					text,
					senderProfile: {
						id: authUserProfile.id,
						fullName: authUserProfile.fullName!,
						avatarUrl: authUserProfile.avatarUrl!
					}
				}
			];
		});
		await instantlyClient.sendMessage({
			text,
			taskId: $page.params.taskId,
			workspaceId: $page.params.workspaceId
		});
	};

	onMount(async () => {
		chatMessagesStore.load();
		const subscriptionChannel = instantlyClient.createSubscriptionToNewMessages(
			{
				taskId: $page.params.taskId
			},
			(message) => {
				// Skip if the message was sent by the current user. We'll optimistically set it
				if (message.senderProfile.id === authUserProfile?.id) return;
				chatMessagesStore.update((messages) => {
					return [...messages, message];
				});
			}
		);
		subscriptionChannel.subscribe();

		return () => {
			subscriptionChannel.unsubscribe();
		};
	});
</script>

<!-- Messages list -->
<div class="max-h-screen overflow-y-hidden">
	<!-- Container -->
	<div class="px-8 mb-16 relative h-[calc(100vh_-_58px)] overflow-y-auto pt-8">
		{#if $chatMessagesStore}
			{#each $chatMessagesStore as message, messageIndex (message.id)}
				<ChatBubble
					{message}
					includeSenderInfo={$chatMessagesStore[messageIndex - 1]?.senderProfile.id !==
						message.senderProfile.id}
				/>
			{/each}
		{/if}
	</div>
	<ChatInput onNewMessage={handleSendNewMessage} />
</div>
