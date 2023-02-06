<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '$src/app.postcss';
	import { browser } from '$app/environment';

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});

	onMount(() => {
		const {
			data: { subscription }
		} = instantlyClient.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<QueryClientProvider client={queryClient}>
	<slot />
</QueryClientProvider>
