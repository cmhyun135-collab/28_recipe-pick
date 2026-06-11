import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';

const InputField = ({ label, type, placeholder, value, onChange, required }) => (
  <div className="flex flex-col gap-2">
    <label className="font-body text-sm font-semibold text-[color:var(--color-on-surface)]">{label}</label>
    <input
      className="w-full min-h-[56px] px-5 rounded-xl border border-[color:var(--color-outline-variant)] focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)]/20 outline-none transition-all duration-200 ease-in-out bg-[color:var(--color-surface-bright)] font-body text-base"
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

const Login = () => {
  const [view, setView] = useState('login');
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
    setLoading(true); setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    } finally { setLoading(false); }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError('비밀번호가 일치하지 않습니다.'); return; }
    setLoading(true); setError('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: nickname || name });
      navigate('/');
    } catch {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally { setLoading(false); }
  };

  const handleGoogleLogin = async () => {
    setLoading(true); setError('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/');
    } catch {
      setError('Google 로그인에 실패했습니다.');
    } finally { setLoading(false); }
  };

  return (
    <main className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-pattern" />
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-[color:var(--color-primary-container)]/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-[color:var(--color-primary)]/5 rounded-full blur-[120px]" />

      <section className="relative z-10 w-full container-page py-10 flex flex-col items-center">
        {/* ── Login View ── */}
        {view === 'login' && (
          <div className="w-full max-w-md bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10 md:p-12 rounded-2xl auth-card-shadow animate-[fade-in_0.4s_ease-out_forwards]">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-14 h-14 bg-[color:var(--color-primary-container)] rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant_menu</span>
              </div>
              <h1 className="text-fluid-headline-md text-[color:var(--color-on-surface)] mb-1">다시 오신 것을 환영합니다!</h1>
              <p className="text-[color:var(--color-on-surface-variant)] font-body text-sm">맛있는 이야기가 가득한 RecipeHub입니다.</p>
            </div>

            {error && <p className="text-[color:var(--color-error)] text-center font-body text-xs mb-4 bg-[color:var(--color-error-container)]/30 py-2 px-4 rounded-lg">{error}</p>}

            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              <InputField label="이메일 주소" type="email" placeholder="example@recipehub.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <InputField label="비밀번호" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <div className="flex justify-end -mt-2">
                <a className="font-body text-sm text-[color:var(--color-primary)] hover:underline transition-all" href="#">비밀번호를 잊으셨나요?</a>
              </div>
              <button
                className="w-full min-h-[56px] px-8 bg-[color:var(--color-primary-container)] text-white font-body text-base font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-in-out flex-shrink-0 whitespace-nowrap disabled:opacity-50"
                type="submit" disabled={loading}
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>

              {/* Divider */}
              <div className="relative py-2 flex items-center">
                <div className="flex-grow border-t border-[color:var(--color-outline-variant)]" />
                <span className="flex-shrink-0 mx-4 font-body text-sm text-[color:var(--color-on-surface-variant)]">또는</span>
                <div className="flex-grow border-t border-[color:var(--color-outline-variant)]" />
              </div>

              <button
                className="w-full min-h-[56px] px-8 border border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-bright)] text-[color:var(--color-on-surface)] font-body text-base font-semibold rounded-xl flex items-center justify-center gap-3 hover:bg-[color:var(--color-surface-container-low)] hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-in-out flex-shrink-0 whitespace-nowrap"
                type="button" onClick={handleGoogleLogin}
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google 계정으로 로그인
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[color:var(--color-on-surface-variant)] font-body text-sm">
                계정이 없으신가요?{' '}
                <button className="text-[color:var(--color-primary)] font-bold hover:underline ml-1" onClick={() => { setView('signup'); setError(''); }}>회원가입</button>
              </p>
            </div>
          </div>
        )}

        {/* ── Sign-up View ── */}
        {view === 'signup' && (
          <div className="w-full max-w-lg bg-[color:var(--color-surface-container-lowest)] p-6 sm:p-10 md:p-12 rounded-2xl auth-card-shadow animate-[fade-in_0.4s_ease-out_forwards]">
            <div className="flex flex-col items-center text-center mb-8">
              <h1 className="text-fluid-headline-md text-[color:var(--color-on-surface)] mb-1">RecipeHub 시작하기</h1>
              <p className="text-[color:var(--color-on-surface-variant)] font-body text-sm">나만의 특별한 레시피를 공유하는 공간</p>
            </div>

            {error && <p className="text-[color:var(--color-error)] text-center font-body text-xs mb-4 bg-[color:var(--color-error-container)]/30 py-2 px-4 rounded-lg">{error}</p>}

            <form className="flex flex-col gap-6" onSubmit={handleSignup}>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                <InputField label="이름" type="text" placeholder="홍길동" value={name} onChange={(e) => setName(e.target.value)} />
                <InputField label="닉네임" type="text" placeholder="요리왕" value={nickname} onChange={(e) => setNickname(e.target.value)} />
              </div>
              <InputField label="이메일 주소" type="email" placeholder="example@recipehub.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <InputField label="비밀번호" type="password" placeholder="8자 이상 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <InputField label="비밀번호 확인" type="password" placeholder="비밀번호를 다시 입력하세요" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

              <div className="flex items-start gap-4 py-2">
                <input className="mt-1 w-5 h-5 accent-[color:var(--color-primary)] border-[color:var(--color-outline-variant)] rounded shrink-0 transition-all" id="terms" type="checkbox" required />
                <label className="font-body text-sm text-[color:var(--color-on-surface-variant)] leading-relaxed" htmlFor="terms">
                  <span className="text-[color:var(--color-primary)] underline hover:text-[color:var(--color-primary-container)] transition-colors cursor-pointer">서비스 이용약관</span> 및 <span className="text-[color:var(--color-primary)] underline hover:text-[color:var(--color-primary-container)] transition-colors cursor-pointer">개인정보처리방침</span>에 동의합니다.
                </label>
              </div>

              <button
                className="w-full min-h-[56px] px-8 bg-[color:var(--color-primary-container)] text-white font-body text-base font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 ease-in-out flex-shrink-0 whitespace-nowrap mt-2 disabled:opacity-50"
                type="submit" disabled={loading}
              >
                {loading ? '처리 중...' : '가입 완료'}
              </button>
            </form>

            <div className="mt-6 text-center border-t border-[color:var(--color-outline-variant)] pt-5">
              <p className="text-[color:var(--color-on-surface-variant)] font-body text-sm">
                이미 계정이 있으신가요?{' '}
                <button className="text-[color:var(--color-primary)] font-bold hover:underline ml-1" onClick={() => { setView('login'); setError(''); }}>로그인하기</button>
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Login;
