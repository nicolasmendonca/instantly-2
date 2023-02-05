<script lang="ts">
	import type { ChatMessage } from '$src/application/stores/chatMessagesStore';

	export let message: ChatMessage;

	export let includeSenderInfo: boolean;
	const formatter = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
</script>

<div
	class:pb-2={!includeSenderInfo}
	class="px-8 flex items-start space-x-4 group relative w-full transition-all hover:bg-neutral-900 hover:bg-opacity-40 rounded-lg"
>
	<!-- Avatar -->
	{#if includeSenderInfo}
		<img class="w-14 rounded-full" src={message.senderProfile.avatarUrl} alt="" />
	{:else}
		<div
			class="min-w-[3.5rem] relative text-xs text-neutral-500 select-none opacity-0 group-hover:opacity-100"
		>
			<div class="pt-1">
				{formatter.format(message.createdAt)}
			</div>
		</div>
	{/if}
	<div
		class:ml-14={!includeSenderInfo}
		class:has-arrow={includeSenderInfo}
		class="text-neutral-200"
	>
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
