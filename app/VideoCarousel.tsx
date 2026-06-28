'use client';

import { useState } from 'react';

type Video = { id: string; title?: string };

export function VideoCarousel({ videos }: { videos: Video[] }) {
  const [index, setIndex] = useState(0);
  const total = videos.length;
  if (total === 0) return null;
  const current = videos[index];
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video">
        <iframe
          key={current.id}
          src={`https://www.youtube.com/embed/${current.id}`}
          title={current.title ?? `video ${index + 1}`}
          className="absolute inset-0 w-full h-full rounded-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous video"
              className="absolute z-10 left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center text-2xl leading-none pb-1 cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next video"
              className="absolute z-10 right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center text-2xl leading-none pb-1 cursor-pointer"
            >
              ›
            </button>
          </>
        )}
      </div>
      {total > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {videos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to video ${i + 1}`}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                i === index
                  ? 'bg-gray-800 dark:bg-zinc-200'
                  : 'bg-gray-300 dark:bg-zinc-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
