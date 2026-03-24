'use client';

import Link from 'next/link';

interface NewsletterCardProps {
  newsletter: {
    id: number;
    title: string;
    author: string;
    summary: string;
    created_at: string;
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  return (
    <Link href={`/newsletter/${newsletter.id}`}>
      <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
        <h3 className="text-xl font-serif font-bold mb-2 text-gray-900">
          {newsletter.title}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {newsletter.author} • {formatDate(newsletter.created_at)}
        </p>
        <p className="text-gray-700 line-clamp-3">
          {newsletter.summary}
        </p>
      </div>
    </Link>
  );
}
