'use client';

import React, { useState, useEffect } from 'react';

export function MediaModal({
  label = 'DEMO',
  caption,
  icon = 'youtube',
  children,
}: {
  label?: string;
  caption?: string;
  icon?: 'youtube' | 'play';
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Show demo"
        title="Show demo"
        className={`inline-flex shrink-0 items-center align-middle transition-transform hover:scale-110 cursor-pointer ${
          icon === 'youtube'
            ? 'text-[#FF0000]'
            : 'text-violet-500 dark:text-violet-300'
        }`}
      >
        {icon === 'youtube' ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
            <path d="M23.5 6.2a3 3 0 0 0-2.11-2.12C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.39.53A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.11 2.12c1.89.53 9.39.53 9.39.53s7.5 0 9.39-.53a3 3 0 0 0 2.11-2.12A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.5 6.27a.5.5 0 0 1 .76-.43l5.1 3.23a.5.5 0 0 1 0 .86l-5.1 3.23a.5.5 0 0 1-.76-.43V8.27z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute -top-9 right-0 text-2xl leading-none text-white/70 transition-colors hover:text-white cursor-pointer"
            >
              ✕
            </button>
            {label && (
              <div className="mb-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300">
                  {label}
                </span>
              </div>
            )}
            <div className="flex items-center justify-center overflow-hidden rounded-xl bg-black shadow-2xl ring-1 ring-white/10 [&>*]:my-0 [&_*]:max-w-full [&_iframe]:block">
              {children}
            </div>
            {caption && (
              <div className="mt-3 text-center text-[13px] italic text-white/70">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
