<script lang="ts">
	import Alert from '$components/Alert.svelte';
	import Card from '$components/Card.svelte';
	import AppLogo from '$components/AppLogo.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		setTimeout(() => {
			goto('/workspaces');
		}, 7000);
	});
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<AppLogo />
		<Card>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Create a new account
				</h1>

				<Alert variant="success">
					Your account has been confirmed. Let us take you to your workspaces
				</Alert>
			</div>
		</Card>
	</div>
</section>
