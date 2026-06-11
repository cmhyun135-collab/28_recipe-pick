import React, { useState } from 'react';

const faqData = [
  {
    category: 'AI 레시피 이용',
    items: [
      {
        q: 'AI가 생성한 레시피의 정확도는 어느 정도인가요?',
        a: 'RecipeHub의 AI는 수만 개의 신뢰도 높은 조리법 데이터를 학습했습니다. 하지만 재료의 상태나 화력에 따라 미세한 차이가 발생할 수 있으므로, 제안된 레시피를 기본으로 하시되 조리 과정에서 유연하게 조절하시는 것을 권장합니다.',
      },
      {
        q: '가지고 있는 재료로만 레시피를 만들 수 있나요?',
        a: "네, 가능합니다! '냉장고 파먹기' 기능을 통해 현재 보유 중인 재료 최대 5가지를 입력하시면, 해당 재료들을 활용한 최적의 레시피를 AI가 즉석에서 구성해 드립니다.",
      },
    ],
  },
  {
    category: '계정 관련',
    items: [
      {
        q: '비밀번호를 잊어버렸을 때는 어떻게 하나요?',
        a: "로그인 화면 하단의 '비밀번호 찾기' 링크를 클릭해 주세요. 가입 시 등록하신 이메일 주소로 비밀번호 재설정 링크를 발송해 드립니다.",
      },
      {
        q: '계정을 탈퇴하고 싶어요. 데이터는 삭제되나요?',
        a: "마이페이지 > 설정 > 계정 관리에서 탈퇴 신청이 가능합니다. 탈퇴 즉시 개인정보는 파기되나, 게시판에 작성하신 공유 레시피는 '익명' 처리되어 서비스 유지 목적으로 보존될 수 있습니다.",
      },
    ],
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (idx) => setOpenIndex(openIndex === idx ? null : idx);
  let globalIndex = 0;

  return (
    <main className="pt-24 pb-32 min-h-screen bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-6">
        {/* ── Hero ── */}
        <header className="text-center mb-16 animate-fade-in-up">
          <div className="w-16 h-16 bg-zinc-100 rounded-3xl flex items-center justify-center mx-auto mb-6 text-zinc-500">
            <span className="material-symbols-outlined text-3xl">help</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-950 mb-4 tracking-tight">자주 묻는 질문</h1>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto font-medium">
            RecipeHub 이용 중 궁금하신 점이 있으신가요? 카테고리별로 정리된 답변을 확인해보세요.
          </p>
        </header>

        {/* ── Category Tabs ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['전체', 'AI 레시피 이용', '계정 관련', '커뮤니티 가이드', '기타'].map((tab, i) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${
                i === 0
                  ? 'bg-primary text-white border border-primary shadow-primary/20'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Accordion ── */}
        <div className="space-y-12">
          {faqData.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-extrabold text-zinc-950 mb-6 flex items-center gap-3 tracking-tight">
                <span className="w-1.5 h-6 bg-primary rounded-full shrink-0" />
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => {
                  const idx = globalIndex++;
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                        isOpen ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                      onClick={() => toggleAccordion(idx)}
                    >
                      <div className="flex justify-between items-center p-6 gap-6">
                        <span className={`text-base font-bold transition-colors ${isOpen ? 'text-primary' : 'text-zinc-950'}`}>
                          {item.q}
                        </span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${isOpen ? 'bg-primary/10 text-primary' : 'bg-zinc-50 text-zinc-400'}`}>
                          <span className={`material-symbols-outlined text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            expand_more
                          </span>
                        </div>
                      </div>
                      <div className={`px-6 text-base text-zinc-500 overflow-hidden transition-all duration-300 font-medium ${isOpen ? 'max-h-64 pb-6 border-t border-zinc-100' : 'max-h-0'}`}>
                        <p className="pt-4 leading-relaxed">{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Contact CTA ── */}
        <section className="mt-20 p-10 md:p-12 rounded-3xl bg-white border border-zinc-200 shadow-sm text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-extrabold text-zinc-950 mb-3 tracking-tight">원하는 답변을 찾지 못하셨나요?</h3>
            <p className="text-base text-zinc-500 mb-8 font-medium">궁금한 점을 직접 문의해 주시면 24시간 이내에 답변해 드립니다.</p>
            <button className="bg-primary text-white px-10 h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto">
              <span className="material-symbols-outlined">mail</span>
              1:1 문의하기
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default FAQ;
