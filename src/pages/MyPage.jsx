import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const MyPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-recipes');

  const handleLogout = async () => {
    try { await signOut(auth); }
    catch (error) { console.error('로그아웃 실패:', error); }
  };

  const stats = [
    { label: '작성한 레시피', value: '12' },
    { label: '받은 좋아요', value: '342' },
    { label: '팔로워', value: '89' },
  ];

  return (
    <main className="pt-24 pb-32 min-h-screen bg-[#fafafa]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* ── Profile Section ── */}
        <section className="mb-12">
          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col sm:flex-row items-center gap-8 md:gap-12 shadow-sm border border-zinc-200">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white ring-4 ring-primary/20 bg-zinc-100">
                <img
                  alt="Profile Picture"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD787WKNVrEd1PLW0hPF4bu35mqpDUeSv3Oo5eST5dYT-oUuDDnnTkHfVNx2a03K87dyKTUXChXfL0SEfjgPCpDbgn_pdbg--UUHEPJxTLuUuAcDC8jFrXOGV-95tFRpFzXjA74kmEqXBzb5wyD3SwogsiVn6jhfobD3l_X7ADRyP9mKkU6s82UCsGBDCmXZpoEBLm_gv2_77ILyYi3FFqFBaxzr3MZDTx1wwrKet64DHggsmazUMh9jdg6-L0UjqucGyMBDk2Rkmcr"
                />
              </div>
              <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary-hover hover:scale-105 transition-all">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-6">
                <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight">
                  {user?.displayName || '셰프 민수'}
                </h2>
                <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-bold inline-block w-fit mx-auto sm:mx-0">
                  베테랑 요리사
                </span>
              </div>
              <div className="flex justify-center sm:justify-start gap-10 md:gap-16">
                {stats.map((s) => (
                  <div key={s.label} className="text-center sm:text-left">
                    <p className="text-2xl md:text-3xl font-extrabold text-primary mb-1">{s.value}</p>
                    <p className="text-sm font-semibold text-zinc-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Tabs ── */}
        <section className="mb-10">
          <div className="flex border-b border-zinc-200">
            {[
              { id: 'my-recipes', label: '나의 레시피' },
              { id: 'favorites', label: '즐겨찾기' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 text-base font-bold transition-all ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── Empty State ── */}
        <section className="py-24 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-zinc-200 shadow-sm animate-fade-in-up">
          <div className="w-24 h-24 mb-6 rounded-3xl bg-zinc-50 flex items-center justify-center text-zinc-300">
            <span className="material-symbols-outlined text-6xl">receipt_long</span>
          </div>
          <h3 className="text-2xl font-extrabold text-zinc-950 mb-3 tracking-tight">
            {activeTab === 'my-recipes' ? '아직 저장된 레시피가 없어요' : '아직 즐겨찾기한 레시피가 없어요'}
          </h3>
          <p className="text-base font-medium text-zinc-500 mb-8 max-w-sm">
            당신만의 특별한 레시피를 공유하거나 마음에 드는 레시피를 즐겨찾기 해보세요.
          </p>
          <Link
            to="/"
            className="bg-primary text-white px-10 h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center"
          >
            홈으로 가기
          </Link>
        </section>

        {/* ── Logout ── */}
        <section className="mt-12 flex justify-center md:justify-end">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-zinc-500 hover:text-red-600 transition-colors text-sm font-bold bg-white border border-zinc-200 px-6 py-3 rounded-xl hover:border-red-200 hover:bg-red-50"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            로그아웃
          </button>
        </section>
      </div>
    </main>
  );
};

export default MyPage;
