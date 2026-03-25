'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordModal from '@/components/PasswordModal';
import NewsletterCard from '@/components/NewsletterCard';
import { getAllNewsletters, Newsletter } from '@/lib/github';

export default function Home() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const data = await getAllNewsletters();
      setNewsletters(data);
    } catch (error) {
      console.error('Failed to fetch newsletters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewArticle = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordConfirm = (password: string) => {
    router.push('/write');
  };

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold">최신 뉴스레터</h2>
        <button
          onClick={handleNewArticle}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          새 글 쓰기
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">로딩 중...</p>
      ) : newsletters.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">아직 발행된 뉴스레터가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {newsletters.map((newsletter) => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>
      )}

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onConfirm={handlePasswordConfirm}
        title="새 글을 쓰기 위해 비밀번호를 입력하세요"
      />
    </div>
  );
}