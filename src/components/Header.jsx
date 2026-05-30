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
    <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-surface-variant shadow-sm transition-all">
      <div className="flex justify-between items-center px-6 h-16 max-w-container mx-auto">
        {/* Logo */}
        <Link to="/" className="font-headline text-headline-md font-bold text-primary hover:opacity-90 transition-opacity">
          RecipeHub
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-body text-body-md transition-colors ${
                isActive(link.to)
                  ? 'text-primary font-bold border-b-2 border-primary pb-1'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link to="/recipes" className="hover:opacity-80 transition-opacity">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
          </Link>

          {user ? (
            <Link
              to="/mypage"
              className="bg-primary-container text-on-primary font-body text-label-md px-6 py-2 rounded-full hover:opacity-90 transition-all shadow-md active:scale-95"
            >
              마이페이지
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-primary-container text-on-primary font-body text-label-md px-6 py-2 rounded-full hover:opacity-90 transition-all shadow-md active:scale-95"
            >
              로그인
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-on-surface">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <nav className="md:hidden fixed inset-0 top-16 bg-surface/95 backdrop-blur-xl z-40 animate-fade-in border-t border-surface-variant">
          <div className="flex flex-col px-8 py-10 gap-6 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-headline text-headline-md py-3 border-b border-surface-variant/50 transition-colors ${
                  isActive(link.to) ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
