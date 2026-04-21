'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function subscribe() {
  const jar = await cookies();
  jar.set('supscriptoin', 'true', {
    maxAge: 3600 * 24 * 365, // = een jaar
    path: '/',
    sameSite: 'lax',
  });
  // revalidate: UI direct verversen met nieuwe state
  revalidatePath('/', 'layout');
}

export async function unsubscribe() {
  // Verwijder het koekje
  const jar = await cookies();
  jar.delete('supscriptoin');
  // revalidate: UI direct verversen
  revalidatePath('/', 'layout');
}

export async function getSubscribed(): Promise<boolean> {
  // Check of het koekje bestaat
  const jar = await cookies();
  return jar.get('supscriptoin')?.value === 'true';
}
