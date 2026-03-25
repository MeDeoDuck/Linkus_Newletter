import { useRouter, useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPostById, getAllPosts } from '@/lib/posts';
import Link from 'next/link';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const post = getPostById(params.id);

  if (!post) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">포스트를 찾을 수 없습니다.</p>
        <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <Link href="/" className="mb-6 text-blue-600 hover:text-blue-800">
        ← 목록으로 돌아가기
      </Link>

      <article>
        <h1 className="text-4xl font-serif font-bold mb-4">
          {post.title}
        </h1>
        <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8">
          <p className="text-gray-600">
            {post.author} • {formatDate(post.date)}
          </p>
        </div>

        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}