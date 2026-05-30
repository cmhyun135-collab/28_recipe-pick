import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full py-12 bg-surface-container">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-container mx-auto gap-8">
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="font-headline text-headline-md text-on-surface font-bold mb-2">
            RecipeHub
          </Link>
          <p className="font-body text-caption text-on-surface-variant max-w-xs text-center md:text-left">
            전 세계 요리사들과 함께하는 가장 따뜻한 레시피 커뮤니티
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="font-body text-caption text-on-surface-variant hover:text-primary transition-colors">서비스 이용약관</a>
          <a href="#" className="font-body text-caption text-on-surface-variant hover:text-primary transition-colors">개인정보처리방침</a>
          <a href="#" className="font-body text-caption text-on-surface-variant hover:text-primary transition-colors">고객센터</a>
          <a href="#" className="font-body text-caption text-on-surface-variant hover:text-primary transition-colors">광고문의</a>
        </div>

        <div className="text-on-surface-variant font-body text-caption">
          © 2024 RecipeHub Community. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
