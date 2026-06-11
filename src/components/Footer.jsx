import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-white border-t border-zinc-200">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="text-xl font-extrabold text-zinc-950 tracking-tight">
            RecipeHub
          </Link>
          <p className="text-sm text-zinc-500 max-w-xs text-center md:text-left font-medium">
            전 세계 요리사들과 함께하는 가장 따뜻한 레시피 커뮤니티
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6">
          {['서비스 이용약관', '개인정보처리방침', '고객센터', '광고문의'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-semibold text-zinc-500 hover:text-primary transition-colors whitespace-nowrap"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-zinc-400 text-sm font-medium text-center md:text-right">
          © 2024 RecipeHub Community.<br className="md:hidden" /> All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
