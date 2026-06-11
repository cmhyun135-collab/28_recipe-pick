import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/recipes', label: 'AI 레시피' },
    { to: '/create', label: '레시피 작성' },
    { to: '/faq', label: 'FAQ' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 transition-all">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-extrabold text-[#ff4500] tracking-tight hover:opacity-80 transition-opacity shrink-0"
        >
          RecipeHub
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${isActive(link.to)
                ? 'text-[#ff4500] font-bold'
                : 'text-zinc-500 hover:text-[#ff4500]'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link to="/recipes" className="hover:opacity-80 transition-opacity hidden sm:block p-2">
            <span className="material-symbols-outlined text-zinc-500 text-xl">search</span>
          </Link>

          {user ? (
            <Link
              to="/mypage"
              className="bg-[#ff4500] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap"
            >
              마이페이지
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-[#ff4500] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-zinc-800 transition-colors whitespace-nowrap"
            >
              로그인
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#ff4500]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <nav className="md:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-xl z-40 border-t border-zinc-200">
          <div className="flex flex-col px-6 py-8 gap-4 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg py-3 border-b border-zinc-100 transition-colors ${isActive(link.to)
                  ? 'text-[#ff4500] font-bold'
                  : 'text-zinc-500'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-6">
              {user ? (
                <Link
                  to="/mypage"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-zinc-950 text-white font-semibold py-3.5 rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  마이페이지
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-zinc-950 text-white font-semibold py-3.5 rounded-xl hover:bg-zinc-800 transition-colors"
                >
                  로그인
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
