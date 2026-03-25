import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold">최신 블로그</h2>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">아직 발행된 포스트가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-xl font-serif font-bold mb-2 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {post.author} • {formatDate(post.date)}
                </p>
                <p className="text-gray-700 line-clamp-3">
                  {post.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}