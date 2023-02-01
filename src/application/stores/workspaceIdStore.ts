import { page } from '$app/stores';
import { derived } from '@square/svelte-store';

export const workspaceIdStore = derived(
  [page],
  ([$page]) => $page.params.workspaceId
)
