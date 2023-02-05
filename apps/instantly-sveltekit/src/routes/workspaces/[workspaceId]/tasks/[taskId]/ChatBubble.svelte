<script lang="ts">
	import type { ChatMessageAppType } from '$src/application/stores/chatMessagesStore';

	export let message: ChatMessageAppType;

	export let includeSenderInfo: boolean;
	const formatter = new Intl.DateTimeFormat(undefined, {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
</script>

<div class="flex items-start space-x-4">
	<!-- Avatar -->
	{#if includeSenderInfo}
		<img class="w-10 rounded-full mt-4" src={message.sender.avatarUrl} alt="" />
	{/if}
	<div
		class:ml-14={!includeSenderInfo}
		class:has-arrow={includeSenderInfo}
		class="speech-bubble flex-shrink min-w-[6em] relative px-4 pt-2 my-1 bg-neutral-700 text-neutral-200 pb-6"
	>
		{#if includeSenderInfo}
			<div class="font-semibold text-primary-500">{message.sender.fullName}</div>
		{/if}
		{message.text}
		<span class="absolute bottom-1 right-2 text-sm text-neutral-400 select-none"
			>{formatter.format(message.createdAt)}</span
		>
	</div>
</div>

<style lang="postcss">
	.speech-bubble {
		position: relative;
		border-radius: 0.4em;
	}

	.speech-bubble.has-arrow:after {
		content: '';
		position: absolute;
		left: 0;
		top: 32px;
		width: 0;
		height: 0;
		border: 6px solid transparent;
		border-left: 0;
		margin-top: -6px;
		margin-left: -6px;
		@apply border-r-neutral-700;
	}
</style>
