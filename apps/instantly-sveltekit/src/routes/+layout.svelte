<script lang="ts">
	import { supabaseClient } from '$src/infrastructure/supabase';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import '$src/app.postcss';
	import { InstantlySupabaseClient } from 'instantly-supabase-client';

	onMount(() => {
		const instantlySupabaseClient = new InstantlySupabaseClient(supabaseClient);
		const {
			data: { subscription }
		} = instantlySupabaseClient.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<slot />
