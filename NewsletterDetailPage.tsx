'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PasswordModal from '@/app/PasswordModal';
import ReactMarkdown from 'react-markdown';

interface Newsletter {
  id: number;
  title: string;
  author: string;
  content: string;
  created_at: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export default function NewsletterDetailPage() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    fetchNewsletter();
  }, [id]);

  const fetchNewsletter = async () => {
    try {
      const res = await fetch(`/api/newsletters/${id}`);
      if (res.ok) {
        const data = await res.json();
        setNewsletter(data);
      } else {
        setError('뉴스레터를 찾을 수 없습니다.');
      }
    } catch (err) {
      setError('뉴스레터를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordConfirm = async (password: string) => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setDeleting(true);
    setError('');

    try {
      const res = await fetch(`/api/newsletters/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || '삭제에 실패했습니다.');
        setDeleting(false);
        return;
      }

      router.push('/');
    } catch (err) {
      setError('삭제 중 오류가 발생했습니다.');
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">로딩 중...</div>;
  }

  if (error || !newsletter) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <button
        onClick={() => router.push('/')}
        className="mb-6 text-blue-600 hover:text-blue-800"
      >
        ← 목록으로 돌아가기
      </button>

      <article>
        <h1 className="text-4xl font-serif font-bold mb-4">
          {newsletter.title}
        </h1>
        <div className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8">
          <p className="text-gray-600">
            {newsletter.author} • {formatDate(newsletter.created_at)}
          </p>
          <button
            onClick={handleDeleteClick}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            삭제
          </button>
        </div>

        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{newsletter.content}</ReactMarkdown>
        </div>
      </article>

      <PasswordModal
        isOpen={showPasswordModal && !showDeleteConfirm}
        onClose={() => {
          setShowPasswordModal(false);
          setShowDeleteConfirm(false);
        }}
        onConfirm={handlePasswordConfirm}
        title={showDeleteConfirm ? "정말 삭제하시겠습니까?" : "비밀번호 입력"}
      />

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => { setShowDeleteConfirm(false); setShowPasswordModal(false); }}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-serif font-bold mb-4">정말 삭제하시겠습니까?</h2>
            <p className="text-gray-600 mb-6">이 작업은 되돌릴 수 없습니다.</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setShowPasswordModal(false);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={() => handlePasswordConfirm('')}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
