<script lang="ts">
	import Card from '$components/Card.svelte';
	import Alert from '$components/Alert.svelte';
	import AppLogo from '$components/AppLogo.svelte';
	import Label from '$components/Label.svelte';
	import { classNames } from '$components/classNames';
	import type { ActionData } from './$types';
	import { goto } from '$app/navigation';

	export let form: ActionData;

	$: {
		if (form?.success) {
			setTimeout(() => {
				goto('/workspaces');
			}, 7000);
		}
	}
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<AppLogo />
		<Card>
			<form class="p-6 space-y-4 md:space-y-6 sm:p-8" action="?/setPassword" method="POST">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Set your new password
				</h1>

				<Label label="Password" isRequired>
					<input
						type="password"
						name="password"
						id="password"
						class={classNames.textInput}
						placeholder="********"
						required
					/>
				</Label>

				<button type="submit" class="w-full {classNames.buttonPrimary}">Set new password</button>

				{#if form}
					{@const variant = form.success ? 'success' : 'danger'}
					<Alert {variant}>{form.message}</Alert>
				{/if}
			</form>
		</Card>
	</div>
</section>
