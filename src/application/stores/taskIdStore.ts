import { page } from '$app/stores';
import { derived } from '@square/svelte-store';

export const taskIdStore = derived(
  [page],
  ([$page]) => $page.params.taskId
)
