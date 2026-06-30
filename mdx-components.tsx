import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';
import { VideoCarousel } from './app/VideoCarousel';
import { MediaModal } from './app/MediaModal';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-4" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-xl md:text-2xl font-bold mt-8 mb-3 text-gray-800 dark:text-zinc-200"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-lg md:text-xl font-semibold mt-6 mb-2 text-gray-800 dark:text-zinc-200"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-base md:text-lg font-semibold mt-4 mb-2" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 dark:text-zinc-300 leading-snug" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-disc pl-5 space-y-1"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-blue-500 hover:text-blue-700 dark:text-gray-400 hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="overflow-x-auto my-4">
      <table>
        <thead>
          <tr>
            {data.headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700 dark:border-zinc-600 dark:text-zinc-300"
      {...props}
    />
  ),
  Timeline: ({ children }: { children: React.ReactNode }) => (
    <div className="mt-2">{children}</div>
  ),
  YouTube: ({ id, title }: { id: string; title?: string }) => (
    <div className="relative w-full max-w-[480px] aspect-video my-3">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title ?? 'YouTube video'}
        className="absolute inset-0 w-full h-full rounded-md"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  ),
  VideoCarousel,
  Section: ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center gap-3 mt-8 mb-4 first:mt-0">
      <span className="text-[20px] font-bold tracking-[0.08em] uppercase text-black dark:text-white whitespace-nowrap">
        {children}
      </span>
      <span className="flex-1 h-[2px] bg-gradient-to-r from-black/70 to-transparent dark:from-white/50" />
    </div>
  ),
  VideoRow: ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3 [&>*]:max-w-full [&>*]:my-0">
      {children}
    </div>
  ),
  DemoVideo: ({ src, poster }: { src: string; poster?: string }) => (
    <video
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      controls
      className="mx-auto block max-h-[80vh] w-auto rounded-md"
    />
  ),
  GifRow: ({ items }: { items: { src: string; title?: string }[] }) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-black p-2">
      {items.map((it, i) => (
        <figure key={i} className="m-0">
          <img
            src={it.src}
            alt={it.title ?? `demo ${i + 1}`}
            loading="lazy"
            className="w-full rounded-md"
          />
          {it.title && (
            <figcaption className="mt-1.5 text-center text-[11px] leading-tight text-white/70">
              {it.title}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  ),
  Publication: ({
    title,
    titleUrl,
    authors,
    me,
    venue,
    links = [],
  }: {
    title: string;
    titleUrl?: string;
    authors: string;
    me?: string;
    venue?: string;
    links?: { label: string; url: string }[];
  }) => {
    const authorNodes: React.ReactNode[] =
      me && authors.includes(me)
        ? authors.split(me).flatMap((part, i) =>
            i === 0
              ? [part]
              : [
                  <strong
                    key={i}
                    className="font-semibold text-gray-900 dark:text-zinc-100"
                  >
                    {me}
                  </strong>,
                  part,
                ]
          )
        : [authors];
    return (
      <div className="my-5">
        <div className="text-[16px] font-bold leading-snug">
          {titleUrl ? (
            <a
              href={titleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600 dark:hover:text-violet-300"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </div>
        <div className="text-[14px] text-gray-600 dark:text-zinc-400 mt-1">
          {authorNodes}
        </div>
        {venue && (
          <div className="text-[14px] italic text-gray-500 dark:text-zinc-500 mt-0.5">
            {venue}
          </div>
        )}
        {links.length > 0 && (
          <div className="text-[13px] mt-1 space-x-2">
            {links.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-500 dark:text-violet-300 hover:underline"
              >
                [{l.label}]
              </a>
            ))}
          </div>
        )}
      </div>
    );
  },
  ProjectShowcase: ({
    image,
    imageAlt,
    reverse = false,
    title,
    category,
    skills,
    methods,
    children,
  }: {
    image: string;
    imageAlt?: string;
    reverse?: boolean;
    title: string;
    category?: string;
    skills?: string[];
    methods?: string[];
    children?: React.ReactNode;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center my-12">
      <div className={reverse ? 'md:order-2' : 'md:order-1'}>
        <img
          src={image}
          alt={imageAlt ?? title}
          loading="lazy"
          className="w-full rounded-xl border border-gray-200 dark:border-zinc-800 object-cover"
        />
      </div>
      <div className={reverse ? 'md:order-1' : 'md:order-2'}>
        <div className="text-[16px] font-bold leading-tight">{title}</div>
        {category && (
          <div className="text-gray-500 dark:text-zinc-400 mt-1 text-[15px]">
            {category}
          </div>
        )}
        {((methods && methods.length > 0) || (skills && skills.length > 0)) && (
          <div className="mt-1 text-[13px]">
            <span className="font-semibold text-gray-500 dark:text-zinc-400 mr-1">
              Methods / Tech:
            </span>
            {methods && methods.length > 0 && (
              <span className="text-violet-500 dark:text-violet-300">
                {methods.join(' · ')}
              </span>
            )}
            {methods && methods.length > 0 && skills && skills.length > 0 && (
              <span className="mx-2 text-gray-400 dark:text-zinc-600">|</span>
            )}
            {skills && skills.length > 0 && (
              <span className="text-violet-500 dark:text-violet-300">
                {skills.join(' · ')}
              </span>
            )}
          </div>
        )}
        <div className="text-[15px] leading-snug space-y-3 text-justify hyphens-auto break-keep mt-4 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-violet-400 dark:[&_ul]:marker:text-violet-500">
          {children}
        </div>
      </div>
    </div>
  ),
  Project: ({
    number,
    title,
    category,
    note,
    githubUrl,
    skills,
    methods,
    media,
    mediaLabel = 'DEMO',
    mediaCaption,
    mediaIcon = 'youtube',
    variant = 'plain',
    listStyle = 'dot',
    children,
  }: {
    number?: string;
    title: string;
    category?: string;
    note?: string;
    githubUrl?: string;
    skills?: string[];
    methods?: string[];
    media?: React.ReactNode;
    mediaLabel?: string;
    mediaCaption?: string;
    mediaIcon?: 'youtube' | 'play';
    variant?: 'plain' | 'card' | 'outline' | 'accent' | 'zebra';
    listStyle?: 'dot' | 'none' | 'dash' | 'arrow';
    children?: React.ReactNode;
  }) => {
    const header = (
      <div className="relative">
        {number && (
          <div
            aria-hidden
            className="absolute -top-3 -left-2 text-[64px] font-bold leading-none select-none pointer-events-none text-gray-100 dark:text-zinc-800"
          >
            {number}
          </div>
        )}
        <div className={`relative ${number ? 'pt-4' : ''}`}>
          <div className="flex items-center gap-2.5">
            <div className="text-[16px] font-bold leading-tight">{title}</div>
            {media && (
              <MediaModal
                label={mediaLabel}
                caption={mediaCaption}
                icon={mediaIcon}
              >
                {media}
              </MediaModal>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden>
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.92.58.1.79-.25.79-.55 0-.27-.01-.99-.02-1.95-3.2.69-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.92-.39 2.91-.39s1.99.13 2.91.39c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.81-.01 3.19 0 .3.2.66.8.55C20.71 21.39 24 17.08 24 12 24 5.65 18.85.5 12 .5z" />
                </svg>
              </a>
            )}
          </div>
          {category && (
            <div className="text-gray-500 dark:text-zinc-400 mt-1 text-[15px]">
              {category}
            </div>
          )}
          {note && (
            <div className="italic text-gray-500 dark:text-zinc-400 mt-1 text-[13px]">
              {note}
            </div>
          )}
          {((methods && methods.length > 0) ||
            (skills && skills.length > 0)) && (
            <div className="mt-1 text-[13px]">
              <span className="font-semibold text-gray-500 dark:text-zinc-400 mr-1">
                Methods / Tech:
              </span>
              {methods && methods.length > 0 && (
                <span className="text-violet-500 dark:text-violet-300">
                  {methods.join(' · ')}
                </span>
              )}
              {methods && methods.length > 0 && skills && skills.length > 0 && (
                <span className="mx-2 text-gray-400 dark:text-zinc-600">|</span>
              )}
              {skills && skills.length > 0 && (
                <span className="text-violet-500 dark:text-violet-300">
                  {skills.join(' · ')}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
    const variantClass = {
      plain: 'mt-0 mb-6',
      card: 'mt-0 mb-6 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/60 dark:bg-zinc-900/40 p-5',
      outline: 'mt-0 mb-6 rounded-xl border border-gray-200 dark:border-zinc-800 p-5',
      accent:
        'mt-0 mb-6 border-l-4 border-violet-400 dark:border-violet-500 pl-5',
      zebra:
        'mt-0 mb-6 rounded-xl p-5 odd:bg-gray-50 even:bg-violet-50/40 dark:odd:bg-zinc-900/40 dark:even:bg-violet-950/20',
    }[variant];
    const listClass = {
      dot: '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-violet-400 dark:[&_ul]:marker:text-violet-500',
      none: '[&_ul]:list-none [&_ul]:pl-0 [&_li]:pl-0',
      dash: "[&_ul]:list-none [&_ul]:pl-1 [&_li]:relative [&_li]:pl-4 [&_li]:before:content-['–'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-violet-400 dark:[&_li]:before:text-violet-500",
      arrow:
        "[&_ul]:list-none [&_ul]:pl-1 [&_li]:relative [&_li]:pl-4 [&_li]:before:content-['▸'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[12px] [&_li]:before:top-[1px] [&_li]:before:text-violet-400 dark:[&_li]:before:text-violet-500",
    }[listStyle];
    return (
      <div className={variantClass}>
        {header}
        <div
          className={`text-[15px] leading-snug space-y-3 text-justify hyphens-auto break-keep mt-4 ${listClass}`}
        >
          {children}
        </div>
      </div>
    );
  },
  TimelineItem: ({
    date,
    company,
    position,
    dateInline = false,
    children,
  }: {
    date: string;
    company?: string;
    position?: string;
    dateInline?: boolean;
    children?: React.ReactNode;
  }) =>
    dateInline ? (
      <div className="pb-5">
        {company && (
          <div className="flex items-baseline gap-2.5 flex-wrap">
            <span className="text-[18px] font-bold leading-tight">{company}</span>
            {date && (
              <span className="text-[14px] font-medium text-[#555] dark:text-zinc-300">{date}</span>
            )}
          </div>
        )}
        {position && (
          <div className="text-[16px] italic text-[#666] dark:text-zinc-400 leading-tight mt-[2px] mb-2">
            {position}
          </div>
        )}
        <div className="text-[15px] leading-snug space-y-3 text-justify hyphens-auto break-keep">{children}</div>
      </div>
    ) : (
      <div className="grid grid-cols-[80px_1fr] gap-x-3">
        <div className="text-right pr-[5px] text-[14px] text-[#bbb] pt-0.5">
          {date}
        </div>
        <div className="relative border-l-2 border-[#cfcfcf] dark:border-zinc-700 pl-3 pb-5">
          <div className="absolute top-[2px] -left-[6px] w-[10px] h-[10px] rounded-[7px] bg-[#cfcfcf] dark:bg-zinc-600 border-2 border-white dark:border-zinc-950" />
          {company && (
            <div className="text-[18px] font-bold leading-tight">{company}</div>
          )}
          {position && (
            <div className="text-[16px] italic text-[#666] dark:text-zinc-400 leading-tight mt-[2px] mb-2">
              {position}
            </div>
          )}
          <div className="text-[15px] leading-snug space-y-3 text-justify hyphens-auto break-keep">{children}</div>
        </div>
      </div>
    ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}