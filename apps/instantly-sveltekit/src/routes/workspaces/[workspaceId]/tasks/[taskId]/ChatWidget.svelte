<script lang="ts">
	import ChatBubble from './ChatBubble.svelte';
	import ChatInput from './ChatInput.svelte';
	import { chatMessagesStore, createChannel } from '$src/application/stores/chatMessagesStore';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { instantlyClient } from '$src/infrastructure/supabase';

	onMount(async () => {
		const user = await instantlyClient.getAuthUser();
		const channel = createChannel({
			taskId: $page.params.taskId,
			workspaceId: $page.params.workspaceId,
			authUserId: user!.id
		});
		channel.subscribe();

		return () => {
			channel.unsubscribe();
		};
	});
</script>

<!-- Messages list -->
<div class="max-h-screen overflow-y-hidden">
	<!-- Container -->
	<div class="px-8 mb-16 relative h-[calc(100vh_-_58px)] overflow-y-auto pt-8">
		{#await chatMessagesStore.load() then}
			{#if $chatMessagesStore}
				{#each $chatMessagesStore as message, messageIndex (message.id)}
					<ChatBubble
						{message}
						includeSenderInfo={$chatMessagesStore[messageIndex - 1]?.sender.id !==
							message.sender.id}
					/>
				{/each}
			{/if}
		{/await}
	</div>
	<ChatInput />
</div>
