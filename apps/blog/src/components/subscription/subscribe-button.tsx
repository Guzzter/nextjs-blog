'use client';

import { useTransition } from 'react';
import { subscribe, unsubscribe } from '@/app/actions/subscription';

type Props = {
  isSubscribed: boolean;
};

export function SubscribeButton({ isSubscribed }: Props) {
  const [pending, startTransition] = useTransition();

  const toggle = () => {
    startTransition(async () => {
      if (isSubscribed) {
        await unsubscribe();
      } else {
        await subscribe();
      }
    });
  };

  if (isSubscribed) {
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={pending}
        className="border border-rule disabled:opacity-50 font-bold px-4 py-2 rounded-full text-xs cursor-pointer hover:bg-[var(--color-rule)]/5 transition-colors"
      >
        {pending ? '...' : 'Subscribed'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={pending}
      className="bg-ink disabled:opacity-50 font-bold px-4 py-2 rounded-full text-white text-xs cursor-pointer hover:opacity-90 transition-opacity"
    >
      {pending ? '...' : 'Subscribe'}
    </button>
  );
}
