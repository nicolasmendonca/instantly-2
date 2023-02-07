<script lang="ts">
	import ChatBubble from './ChatBubble.svelte';
	import ChatInput from './ChatInput.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
	import { authUserProfileStore } from '$src/application/stores/authUserProfileStore';
	import { taskStore } from '$src/application/stores/taskStore';
	import { generateWorkspaceAvatar } from '$src/application/avatar';
	import { workspaceStore } from '$src/application/stores/workspaceStore';
	import Spinner from '$src/components/Spinner.svelte';

	$: authUserProfile = $authUserProfileStore;

	type Messages = Awaited<ReturnType<typeof instantlyClient.getMessagesWithSenderProfile>>;

	let lastMessageIndicator: HTMLDivElement;

	let pageIndex = 0;
	let messages: Messages = [];
	let hasMoreMessages = true;

	let chatContainerRef: HTMLDivElement;
	let hasNotificationPermission = false;
	let intersectionObserver: IntersectionObserver;

	$: {
		console.log(messages);
	}

	const handleSendNewMessage = async (text: string) => {
		if (!authUserProfile) return;
		messages = [
			{
				id: crypto.randomUUID(),
				createdAt: new Date(),
				text,
				senderProfile: {
					id: authUserProfile.id,
					fullName: authUserProfile.fullName!,
					avatarUrl: authUserProfile.avatarUrl!
				}
			},
			...messages
		];
		await instantlyClient.sendMessage({
			text,
			taskId: $page.params.taskId,
			workspaceId: $page.params.workspaceId
		});
	};

	// Load initial messages
	onMount(async () => {
		const loadedMessages = await instantlyClient.getMessagesWithSenderProfile({
			taskId: $page.params.taskId,
			pageIndex
		});
		messages = [...messages, ...loadedMessages];
		chatContainerRef.scrollTop = chatContainerRef.scrollHeight;
	});

	// Load more messages on scroll
	onMount(() => {
		intersectionObserver = new IntersectionObserver(
			async (entry) => {
				const [firstEntry] = entry;
				if (firstEntry.isIntersecting && hasMoreMessages) {
					pageIndex += 1;
					const loadedMessages = await instantlyClient.getMessagesWithSenderProfile({
						taskId: $page.params.taskId,
						pageIndex
					});
					hasMoreMessages = loadedMessages.length > 0;
					messages = [...messages, ...loadedMessages];
				}
			},
			{
				root: chatContainerRef,
				threshold: 0
			}
		);

		intersectionObserver.observe(lastMessageIndicator);

		return () => {
			intersectionObserver.unobserve(lastMessageIndicator);
		};
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
				messages = [message, ...messages];
			}
		);
		subscriptionChannel.subscribe();

		return () => {
			subscriptionChannel.unsubscribe();
		};
	});

	// Handle notifications
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
		class="mb-16 relative h-[calc(100vh_-_58px)] overflow-y-auto pb-6 flex flex-col-reverse"
		bind:this={chatContainerRef}
	>
		{#each messages as message, messageIndex (message.id)}
			<ChatBubble
				{message}
				includeSenderInfo={messages[messageIndex + 1]?.senderProfile.id !==
					message.senderProfile.id || messageIndex === messages.length - 1}
			/>
		{/each}
		{#if hasMoreMessages}
			<div bind:this={lastMessageIndicator} class="flex w-full items-center justify-center py-4">
				<Spinner />
			</div>
		{/if}
	</div>
	<ChatInput onNewMessage={handleSendNewMessage} />
</div>
