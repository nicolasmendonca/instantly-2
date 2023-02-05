<script lang="ts">
	import Alert from '$components/Alert.svelte';
	import Card from '$components/Card.svelte';
	import AppLogo from '$components/AppLogo.svelte';
	import Label from '$components/Label.svelte';
	import { classNames } from '$components/classNames';
	import type { ActionData } from './$types';
	import Button from '$components/Button.svelte';

	export let form: ActionData;
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<AppLogo />
		<Card>
			<form class="p-6 space-y-4 md:space-y-6 sm:p-8" action="?/requestPasswordReset" method="POST">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Forgot your password?
				</h1>
				<p class="font-light text-gray-500 dark:text-gray-400">
					Don't fret! Just type in your email and we will send you a code to reset your password!
				</p>

				<Label label="Your email" isRequired>
					<input
						type="email"
						name="email"
						id="email"
						class={classNames.textInput}
						placeholder="name@company.com"
						required
					/>
				</Label>

				<Button type="submit" className="w-full {classNames.buttonPrimary}">Reset password</Button>

				{#if form}
					{@const variant = form.success ? 'success' : 'danger'}
					<Alert {variant}>{form.message}</Alert>
				{/if}
			</form>
		</Card>
	</div>
</section>
