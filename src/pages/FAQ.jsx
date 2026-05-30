import React, { useState } from 'react';

const faqData = [
  {
    category: 'AI 레시피 이용',
    items: [
      { q: 'AI가 생성한 레시피의 정확도는 어느 정도인가요?', a: 'RecipeHub의 AI는 수만 개의 신뢰도 높은 조리법 데이터를 학습했습니다. 하지만 재료의 상태나 화력에 따라 미세한 차이가 발생할 수 있으므로, 제안된 레시피를 기본으로 하시되 조리 과정에서 유연하게 조절하시는 것을 권장합니다.' },
      { q: '가지고 있는 재료로만 레시피를 만들 수 있나요?', a: "네, 가능합니다! '냉장고 파먹기' 기능을 통해 현재 보유 중인 재료 최대 5가지를 입력하시면, 해당 재료들을 활용한 최적의 레시피를 AI가 즉석에서 구성해 드립니다." },
    ],
  },
  {
    category: '계정 관련',
    items: [
      { q: '비밀번호를 잊어버렸을 때는 어떻게 하나요?', a: "로그인 화면 하단의 '비밀번호 찾기' 링크를 클릭해 주세요. 가입 시 등록하신 이메일 주소로 비밀번호 재설정 링크를 발송해 드립니다." },
      { q: '계정을 탈퇴하고 싶어요. 데이터는 삭제되나요?', a: "마이페이지 > 설정 > 계정 관리에서 탈퇴 신청이 가능합니다. 탈퇴 즉시 개인정보는 파기되나, 게시판에 작성하신 공유 레시피는 '익명' 처리되어 서비스 유지 목적으로 보존될 수 있습니다." },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  let globalIndex = 0;

  return (
    <main className="pt-32 pb-24 px-6 max-w-[800px] mx-auto min-h-screen">
      {/* Hero Section */}
      <header className="text-center mb-16">
        <h1 className="font-headline text-headline-lg md:text-display-lg mb-4 text-on-surface">자주 묻는 질문</h1>
        <p className="font-body text-body-lg text-on-surface-variant max-w-lg mx-auto">
          RecipeHub 이용 중 궁금하신 점이 있으신가요? 카테고리별로 정리된 답변을 확인해보세요.
        </p>
      </header>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {['전체', 'AI 레시피 이용', '계정 관련', '커뮤니티 가이드', '기타'].map((tab, i) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded-full font-body text-label-md transition-all ${
              i === 0 ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqData.map((section) => (
          <div key={section.category} className="mb-8">
            <h2 className="font-headline text-headline-md mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full"></span>
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.items.map((item) => {
                const idx = globalIndex++;
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-outline-variant/30 hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
                    onClick={() => toggleAccordion(idx)}
                  >
                    <div className="flex justify-between items-center p-6">
                      <span className="font-body text-body-md text-on-surface group-hover:text-primary transition-colors">{item.q}</span>
                      <span className={`material-symbols-outlined text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </div>
                    <div className={`px-6 font-body text-body-md text-on-surface-variant overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 pb-6 border-t border-outline-variant/30' : 'max-h-0'}`}>
                      <p className="pt-4">{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA Section */}
      <section className="mt-20 p-8 rounded-2xl bg-surface-container border border-outline-variant/20 text-center relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="font-headline text-headline-md mb-2">원하는 답변을 찾지 못하셨나요?</h3>
          <p className="font-body text-body-md text-on-surface-variant mb-8">궁금한 점을 직접 문의해 주시면 24시간 이내에 답변해 드립니다.</p>
          <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-body text-label-md shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto">
            <span className="material-symbols-outlined">mail</span>
            1:1 문의하기
          </button>
        </div>
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
      </section>
    </main>
  );
};

export default FAQ;
