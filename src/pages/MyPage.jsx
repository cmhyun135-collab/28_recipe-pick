import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const MyPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-recipes');

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <main className="pt-24 pb-12 min-h-screen max-w-container mx-auto px-6">
      {/* Profile Section */}
      <section className="mb-12">
        <div className="bg-surface-container-lowest rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-editorial">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-high ring-4 ring-primary/10">
              <img
                alt="Profile Picture"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD787WKNVrEd1PLW0hPF4bu35mqpDUeSv3Oo5eST5dYT-oUuDDnnTkHfVNx2a03K87dyKTUXChXfL0SEfjgPCpDbgn_pdbg--UUHEPJxTLuUuAcDC8jFrXOGV-95tFRpFzXjA74kmEqXBzb5wyD3SwogsiVn6jhfobD3l_X7ADRyP9mKkU6s82UCsGBDCmXZpoEBLm_gv2_77ILyYi3FFqFBaxzr3MZDTx1wwrKet64DHggsmazUMh9jdg6-L0UjqucGyMBDk2Rkmcr"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-sm">edit</span>
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg text-on-surface">
                {user?.displayName || '셰프 민수'}
              </h2>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-caption font-body inline-block w-fit mx-auto md:mx-0">베테랑 요리사</span>
            </div>
            <div className="flex justify-center md:justify-start gap-12">
              <div className="text-center md:text-left">
                <p className="font-headline text-headline-md text-primary">12</p>
                <p className="font-body text-caption text-on-surface-variant">작성한 레시피</p>
              </div>
              <div className="text-center md:text-left">
                <p className="font-headline text-headline-md text-primary">342</p>
                <p className="font-body text-caption text-on-surface-variant">받은 좋아요</p>
              </div>
              <div className="text-center md:text-left">
                <p className="font-headline text-headline-md text-primary">89</p>
                <p className="font-body text-caption text-on-surface-variant">팔로워</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Menu */}
      <section className="mb-8">
        <div className="flex border-b border-surface-container-highest">
          <button
            onClick={() => setActiveTab('my-recipes')}
            className={`px-8 py-4 font-body text-label-md transition-all ${activeTab === 'my-recipes' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
          >
            나의 레시피
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-8 py-4 font-body text-label-md transition-all ${activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
          >
            즐겨찾기
          </button>
        </div>
      </section>

      {/* Empty State */}
      <section className="py-20 flex flex-col items-center justify-center text-center animate-fade-in">
        <div className="w-24 h-24 mb-6 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant/30">
          <span className="material-symbols-outlined text-6xl">receipt_long</span>
        </div>
        <h3 className="font-headline text-headline-md text-on-surface mb-2">
          {activeTab === 'my-recipes' ? '아직 저장된 레시피가 없어요' : '아직 즐겨찾기한 레시피가 없어요'}
        </h3>
        <p className="font-body text-body-md text-on-surface-variant mb-8 max-w-sm">
          당신만의 특별한 레시피를 공유하거나<br />마음에 드는 레시피를 즐겨찾기 해보세요.
        </p>
        <Link to="/" className="bg-primary text-on-primary px-8 py-3 rounded-full font-body text-label-md shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
          홈 바로가기
        </Link>
      </section>

      {/* Logout Section */}
      <section className="mt-12 pt-8 border-t border-surface-container-highest flex justify-center md:justify-end">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-on-surface-variant hover:text-error transition-colors font-body text-label-md"
        >
          <span className="material-symbols-outlined">logout</span>
          로그아웃
        </button>
      </section>
    </main>
  );
};

export default MyPage;
