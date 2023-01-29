<script lang="ts">
	import Alert from '$components/Alert.svelte';
	import Card from '$components/Card.svelte';
	import Label from '$components/Label.svelte';
	import type { ActionData } from './$types';
	import { classNames } from '$components/classNames';
	import AppLogo from '$components/AppLogo.svelte';
	import Button from '$components/Button.svelte';

	export let form: ActionData;
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<AppLogo />
		<Card>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Sign in to your account
				</h1>
				<form class="space-y-4 md:space-y-6" action="?/login" method="POST">
					<div>
						<Label label="Your email">
							<input
								type="email"
								name="email"
								placeholder="name@company.com"
								required
								class={classNames.textInput}
							/>
						</Label>
					</div>
					<div>
						<Label label="Password">
							<input
								type="password"
								name="password"
								id="password"
								placeholder="••••••••"
								class={classNames.textInput}
								required
							/>
						</Label>
					</div>
					<a
						href="/auth/forgot-password"
						class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
						>Forgot password?</a
					>
					<div class="flex items-center justify-between">
						<Button type="submit" className="w-full">Sign in</Button>
					</div>

					{#if form?.incorrect}
						<Alert variant="danger">
							{form?.message}
						</Alert>
					{/if}
				</form>
			</div>
		</Card>
	</div>
</section>
