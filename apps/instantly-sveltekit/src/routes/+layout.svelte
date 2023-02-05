<script lang="ts">
	import { instantlyClient } from '$src/infrastructure/supabase/instantlyClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '$src/app.postcss';

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

<slot />
