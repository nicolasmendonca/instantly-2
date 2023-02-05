import { asyncReadable } from '@square/svelte-store';
import { instantlyClient } from '$src/infrastructure/supabase';

export const authUserProfileStore = asyncReadable(
  null,
  async () => {
    const authUser = await instantlyClient.getAuthUser()
    if (!authUser) throw new Error('No auth user')
    const profile = await instantlyClient.getProfile(authUser.id)
    return profile
  }
  )
