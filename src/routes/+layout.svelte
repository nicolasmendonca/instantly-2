<script lang="ts">
	import { supabaseClient } from '$src/infrastructure/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '$src/app.postcss';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />
