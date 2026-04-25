import { SubscribeButton } from '@/components/subscription/subscribe-button';

export function SubscribeCTA() {
  // cta blokje, subskribe btn (let op styling)
  return (
    <div className="bg-[var(--yale-blue)] border-[var(--color-rule)] border-2 mt-12 overflow-hidden p-8 relative rounded-sm shadow-xl text-center text-white">
      <div className="absolute bg-[var(--cerulean)]/20 blur-3xl h-40 -mr-10 -mt-10 right-0 rounded-full top-0 w-40" />
      <div className="relative z-10">
        <h3 className="font-black font-serif italic mb-4 text-3xl leading-tight">
          Keep reading
        </h3>
        <p className="font-light max-w-md mb-8 mx-auto text-[var(--sky-blue-light)]">
          Subscribe to unlock
        </p>
        <div className="flex justify-center">
          <SubscribeButton isSubscribed={false} />
        </div>
      </div>
    </div>
  );
}
