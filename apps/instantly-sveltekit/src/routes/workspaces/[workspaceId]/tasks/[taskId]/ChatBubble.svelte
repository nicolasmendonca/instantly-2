<script lang="ts">
	import type { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
	import Avatar from '$src/components/Avatar.svelte';

	type ChatMessage = Awaited<
		ReturnType<typeof instantlyClient.getMessagesWithSenderProfile>
	>[number];

	export let message: ChatMessage;

	export let includeSenderInfo: boolean;
	const formatter = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
</script>

<div
	class:mt-4={includeSenderInfo}
	class="px-8 py-1 grid grid-cols-[4rem,_1fr] items-center group relative w-full transition-all hover:bg-neutral-900 hover:bg-opacity-40 rounded-lg"
>
	<!-- Avatar -->
	{#if includeSenderInfo}
		<Avatar avatarUrl={message.senderProfile.avatarUrl} />
	{:else}
		<div
			class="h-full relative text-xs text-neutral-500 select-none opacity-0 group-hover:opacity-100"
		>
			<div class="absolute inset-0 top-1 right-1">
				{formatter.format(message.createdAt)}
			</div>
		</div>
	{/if}
	<div class:has-arrow={includeSenderInfo} class="text-neutral-200">
		{#if includeSenderInfo}
			<div class="flex items-center space-x-2">
				<div class="text-primary-500">
					{message.senderProfile.fullName}
				</div>
				<div class="relative text-xs text-neutral-500 font-semibold pt-2">
					{formatter.format(message.createdAt)}
				</div>
			</div>
		{/if}
		{message.text}
	</div>
</div>
