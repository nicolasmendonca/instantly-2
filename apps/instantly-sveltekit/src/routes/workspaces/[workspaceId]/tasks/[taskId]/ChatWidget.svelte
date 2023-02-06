<script lang="ts">
	import ChatBubble from './ChatBubble.svelte';
	import ChatInput from './ChatInput.svelte';
	import { chatMessagesStore } from '$src/application/stores/chatMessagesStore';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
	import { authUserProfileStore } from '$src/application/stores/authUserProfileStore';
	import { taskStore } from '$src/application/stores/taskStore';
	import { generateWorkspaceAvatar } from '$src/application/avatar';
	import { workspaceStore } from '$src/application/stores/workspaceStore';

	$: authUserProfile = $authUserProfileStore;

	let chatContainerRef: HTMLDivElement;
	let priorToLastMessageElement: HTMLDivElement;
	let hasNotificationPermission = false;

	function isInViewport(el: HTMLElement) {
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	const handleSendNewMessage = async (text: string) => {
		let tempIsScrolledBottom = isInViewport(priorToLastMessageElement);
		await chatMessagesStore.update((messages) => {
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
		if (tempIsScrolledBottom) {
			chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
		}
		await instantlyClient.sendMessage({
			text,
			taskId: $page.params.taskId,
			workspaceId: $page.params.workspaceId
		});
	};

	// Load messages
	onMount(() => {
		chatMessagesStore.load().then(() => {
			chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
		});
	});

	// Subscribe to new Messages
	onMount(async () => {
		const subscriptionChannel = instantlyClient.createSubscriptionToNewMessages(
			{
				taskId: $page.params.taskId
			},
			async (message) => {
				// Skip if the message was sent by the current user. We'll optimistically set it
				if (message.senderProfile.id === authUserProfile?.id) return;

				if (hasNotificationPermission && document.hidden) {
					new Notification(`${$taskStore.title}`, {
						body: message.text,
						icon: $workspaceStore ? generateWorkspaceAvatar($workspaceStore?.name) : undefined
					});
				}
				// keep a temp reference if the chat is at the bottom position before we add the new message
				let tempIsScrolledBottom = isInViewport(priorToLastMessageElement);
				await chatMessagesStore.update((messages) => {
					return [...messages, message];
				});
				// now we scroll
				if (tempIsScrolledBottom) {
					chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
				}
			}
		);
		subscriptionChannel.subscribe();

		return () => {
			subscriptionChannel.unsubscribe();
		};
	});

	onMount(async () => {
		if ('Notification' in window) {
			if (Notification.permission === 'granted') return;
			const result = await Notification.requestPermission();
			hasNotificationPermission = result === 'granted';
		}
	});
</script>

<!-- Messages list -->
<div class="max-h-screen overflow-y-hidden">
	<!-- Container -->
	<div
		class="mb-16 relative h-[calc(100vh_-_58px)] overflow-y-auto pb-6"
		bind:this={chatContainerRef}
	>
		{#if $chatMessagesStore}
			{#each $chatMessagesStore as message, messageIndex (message.id)}
				{#if $chatMessagesStore.length - 1 === messageIndex}
					<div bind:this={priorToLastMessageElement} />
				{/if}
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
