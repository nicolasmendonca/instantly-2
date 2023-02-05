<script lang="ts">
	import { page } from '$app/stores';

	$: message = $page.error!.message;
	$: supaError = $page.error!.supaError;
</script>

<main class="flex items-center justify-center h-screen">
	<div class="bg-neutral-600 rounded-lg p-4 py-12">
		<h1 class="font-extrabold text-2xl mb-4">Oops! we messed up 😱</h1>
		<pre
			class="bg-neutral-700 text-white rounded-md p-2">{message} {#if supaError}- {supaError.message}{/if}</pre>
	</div>
</main>
