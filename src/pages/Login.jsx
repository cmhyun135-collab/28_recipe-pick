import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [view, setView] = useState('login'); // login | signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: nickname || name });
      navigate('/');
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError('Google 로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 bg-pattern"></div>
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-[120px]"></div>
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>

      <section className="relative z-10 w-full max-w-container px-6 py-12 flex flex-col items-center">
        {/* Login View */}
        {view === 'login' && (
          <div className="w-full max-w-[480px] bg-surface-container-lowest p-10 md:p-12 rounded-xl auth-card-shadow animate-fade-in">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 bg-primary-container rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary-container/20">
                <span className="material-symbols-outlined text-on-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
              </div>
              <h1 className="font-headline text-headline-md text-on-surface mb-2">다시 오신 것을 환영합니다!</h1>
              <p className="text-on-surface-variant font-body text-body-md">맛있는 이야기가 가득한 RecipeHub입니다.</p>
            </div>

            {error && <p className="text-error text-center font-body text-caption mb-4">{error}</p>}

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label className="block font-body text-label-md text-on-surface mb-2">이메일 주소</label>
                <input
                  className="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-bright font-body text-body-md"
                  placeholder="example@recipehub.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block font-body text-label-md text-on-surface mb-2">비밀번호</label>
                <input
                  className="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all bg-surface-bright font-body text-body-md"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <a className="font-body text-caption text-primary hover:underline" href="#">비밀번호를 잊으셨나요?</a>
              </div>
              <button
                className="w-full h-14 bg-primary-container text-on-primary font-body text-body-md rounded-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>
              <div className="relative py-4 flex items-center">
                <div className="flex-grow border-t border-outline-variant"></div>
                <span className="flex-shrink mx-4 font-body text-caption text-on-surface-variant">또는</span>
                <div className="flex-grow border-t border-outline-variant"></div>
              </div>
              <button
                className="w-full h-14 border border-outline-variant bg-surface-bright text-on-surface font-body text-body-md rounded-lg flex items-center justify-center gap-3 hover:bg-surface-container-low active:scale-[0.98] transition-all"
                type="button"
                onClick={handleGoogleLogin}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google 계정으로 로그인
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-on-surface-variant font-body text-body-md">
                계정이 없으신가요?{' '}
                <button className="text-primary font-bold hover:underline ml-1" onClick={() => { setView('signup'); setError(''); }}>회원가입</button>
              </p>
            </div>
          </div>
        )}

        {/* Sign-up View */}
        {view === 'signup' && (
          <div className="w-full max-w-[520px] bg-surface-container-lowest p-10 md:p-12 rounded-xl auth-card-shadow animate-fade-in">
            <div className="flex flex-col items-center text-center mb-10">
              <h1 className="font-headline text-headline-md text-on-surface mb-2">RecipeHub 시작하기</h1>
              <p className="text-on-surface-variant font-body text-body-md">나만의 특별한 레시피를 공유하는 공간</p>
            </div>

            {error && <p className="text-error text-center font-body text-caption mb-4">{error}</p>}

            <form className="space-y-4" onSubmit={handleSignup}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-label-md text-on-surface mb-2">이름</label>
                  <input className="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-bright font-body text-body-md" placeholder="홍길동" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="block font-body text-label-md text-on-surface mb-2">닉네임</label>
                  <input className="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-bright font-body text-body-md" placeholder="요리왕" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block font-body text-label-md text-on-surface mb-2">이메일 주소</label>
                <input className="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-bright font-body text-body-md" placeholder="example@recipehub.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="block font-body text-label-md text-on-surface mb-2">비밀번호</label>
                <input className="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-bright font-body text-body-md" placeholder="8자 이상 입력해주세요" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div>
                <label className="block font-body text-label-md text-on-surface mb-2">비밀번호 확인</label>
                <input className="w-full h-12 px-4 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-bright font-body text-body-md" placeholder="비밀번호를 다시 입력하세요" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>
              <div className="flex items-start gap-3 py-2">
                <input className="mt-1 w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary" id="terms" type="checkbox" required />
                <label className="font-body text-caption text-on-surface-variant" htmlFor="terms">
                  <span className="text-primary underline">서비스 이용약관</span> 및 <span className="text-primary underline">개인정보처리방침</span>에 동의합니다.
                </label>
              </div>
              <button className="w-full h-14 bg-primary-container text-on-primary font-body text-body-md rounded-lg shadow-md hover:opacity-90 active:scale-[0.98] transition-all mt-4 disabled:opacity-50" type="submit" disabled={loading}>
                {loading ? '처리 중...' : '가입 완료'}
              </button>
            </form>

            <div className="mt-8 text-center border-t border-outline-variant pt-6">
              <p className="text-on-surface-variant font-body text-body-md">
                이미 계정이 있으신가요?{' '}
                <button className="text-primary font-bold hover:underline ml-1" onClick={() => { setView('login'); setError(''); }}>로그인하기</button>
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Login;
