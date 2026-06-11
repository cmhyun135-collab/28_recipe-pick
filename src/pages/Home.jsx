import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-[#fafafa] min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative h-[90vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden pt-16">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Vr8czWLV-FTFp4k8HcKpYyVkIQ_Fip2ob3dXzBDnmmuuW4MG6dQrhzONPNvK4pQdEBuIXVpru9o9IzJt-dt0V2V7pVW5Ss0-qptAMcuZk1HNhJAxDQq9Yfl2YgMSDKO-S-1EERJtuFTDvwmmfAdGJkuy2WsSfrsR9DLZIa6rOmAQVFA48p2yW6PZRQTLHKQswyJuJ4CGqifoto-W3oHT2KjiShFTKD96d9Jka8A7GbCRh91OeyBxfwaqg7uuDszgY1xeLcbJK2ug"
            alt="Rustic dinner table with gourmet Mediterranean dishes"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto px-6 md:px-12 flex flex-col items-center text-center animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            당신의 냉장고 속에 잠든<br />숨은 맛을 깨우세요
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl font-medium">
            전문 셰프의 감각과 AI의 지능이 만났습니다. 재료 사진 한 장으로 당신만의 미식 가이드를 완성해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/create"
              className="flex items-center justify-center gap-3 bg-white text-zinc-950 font-bold text-lg px-10 h-16 rounded-2xl hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-2xl"
            >
              <span className="material-symbols-outlined text-xl">photo_camera</span>
              사진 찍고 레시피 받기
            </Link>
          </div>
        </div>
      </section>

      {/* ── Editorial Section ── */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Text */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-400 tracking-widest uppercase mb-3">Our Philosophy</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-950 mb-6 tracking-tight leading-tight">
                요리는 즐거움이어야 합니다
              </h2>
              <p className="text-lg text-zinc-500 leading-relaxed mb-10 max-w-lg">
                RecipeHub는 단순한 레시피 저장소가 아닙니다. 남은 식재료를 통해 새로운 창의성을 발견하고, 낭비 없는 식탁을 지향하는 미식가들의 커뮤니티입니다.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-zinc-100 mb-4">
                    <span className="material-symbols-outlined text-zinc-950">auto_awesome</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 mb-2">AI 큐레이션</h3>
                  <p className="text-sm text-zinc-500">사용자의 취향을 학습하는 똑똑한 제안</p>
                </div>
                <div className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-zinc-100 mb-4">
                    <span className="material-symbols-outlined text-zinc-950">group</span>
                  </div>
                  <h3 className="text-lg font-bold text-zinc-950 mb-2">셰프 커뮤니티</h3>
                  <p className="text-sm text-zinc-500">5만 명의 홈셰프가 공유하는 리얼 팁</p>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-zinc-100">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh3JLpcaKql1TOG0aATGMbdHaRUtTdclaMQIFydxrCsFtq_35b3GadiPVRPpPMOLfzN6Jg6BUwP7wCn-SMPPSV5D1e3hr_Q3ZYFoVSzdgHHZu4jJT4pw6OZNHpynwG_qJ79Ysd5L9Tt0RM8qz19K81Ppn_k2hSmt23i_IjZCof9WLD0cCQ5uAyG7G0pmPTavkink32Hmc75AFz9JOHfBRITDvR6HRQfVmqKKNLW9pGyipgydNCO2bEJD8iGatLzfEg5cuy0mVXiC7s"
                  alt="Fresh herbs on a cutting board"
                />
              </div>
              {/* Floating Quote */}
              <div className="absolute -bottom-8 -left-8 p-6 bg-white shadow-2xl rounded-3xl border border-zinc-100 max-w-sm hidden lg:block">
                <p className="text-base italic text-zinc-600 leading-relaxed mb-4">
                  "냉장고 속 평범한 재료들이 RecipeHub를 만나 특별한 파인 다이닝으로 변했습니다."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-200" />
                  <div>
                    <p className="text-sm font-bold text-zinc-950">김지수</p>
                    <p className="text-xs text-zinc-500">Home Chef of the Month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trending Bento Grid ── */}
      <section className="py-24 lg:py-32 bg-[#fafafa]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center mb-12 lg:mb-16 text-center">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight mb-4">오늘의 트렌딩 레시피</h2>
            <p className="text-lg text-zinc-500 max-w-2xl">가장 많은 사랑을 받은 최고의 레시피를 만나보세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature card – spans 2 cols / 2 rows on lg */}
            <Link
              to="/recipe/1"
              className="lg:col-span-2 lg:row-span-2 group relative overflow-hidden rounded-[2rem] bg-zinc-100 h-[400px] lg:h-auto lg:aspect-square"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-QBgRtV1DGUZ3fVuHw17fGq5p13z7VM-QSyv5z54HuevNSA8Hzu2NDl_AJWVqP486CVefi1tB45Yd074xpqUvaCzpdly39D6esW6iUCzIlQXxlSy6ayUxTsoNuSmJIuloWvHZr1hP-5kR_nyO0YU18mly6R6hfK6vcvU3ktO0v9jESb9XtjW7jZQvroKNeW4kaDa9uczZVryKdprEBNo4OAGYrXoe4CvJCTyv8DL5fA9mVwYydn0xqB7MqKTMNbLveReUlKUvRHz2"
                alt="Fresh pasta"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="bg-white text-zinc-950 px-3 py-1 rounded-lg text-xs font-bold w-fit mb-3">EDITOR'S PICK</span>
                <h3 className="text-3xl font-bold mb-2 tracking-tight">프레쉬 바질 토마토 파스타</h3>
                <p className="text-white/80">15분 만에 즐기는 정통 이탈리아의 맛</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link to="/recipe/2" className="group relative overflow-hidden rounded-[2rem] bg-zinc-100 h-[280px] lg:h-[320px]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvmBNZa_amIKLE-_cJjkbSUTC0kJhq3oJsO7io28X1YwZ1SsGu8gWuKdXk0O-XPkdeDiPxxJR1jR9kqUvHA_7DGL5gNrXzUzA6EazxN7dD5Vbf6e6ZBUp3KQTmAFy_yeRnwv_UqcGdsUQae_YG04_kY_0OmfD0hZeFC2881SRZBi5tU9RxXWH9yHnSgAY1vg-OmN1ZyQ6Lc9hPqUwZ96u4pd1WrYt90tQOeNPyxusV7R8ZYJD_Qtz9XfKywaxYRMr7wTW1JB-9Sy-S"
                alt="Vegan superfood bowl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-1">비건 슈퍼푸드 볼</h3>
                <p className="text-sm text-white/80">활력을 채워주는 건강한 한 끼</p>
              </div>
            </Link>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-[2rem] bg-zinc-100 h-[280px] lg:h-[320px]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNxaA80G6-nRXZOGZcIp_QUUr8ev831jiSgjXCsnzzRPLvhaChSRQQq-stYjU42WlJAFLDnVImWNakcztPgG8YJsSuve2GOblWUlZFTmcuDp6ZOXSEWp-fXywbhEtgiMHPVdcGGlscInQ3uHW6sMtyKLBEmUkZLzvTdasCST0KQmoB0ddWCJhDOj4xtfhZRDuNrb1Ouzw0wFE_9K9su3bzVuUNRa9mtJGDLGFEtkwVMsBPbdwulxm8k8oo8otPWN--_lSydydQ1L4A"
                alt="Chocolate lava cake"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold">달콤한 휴식</h3>
              </div>
            </div>

            {/* Card 4 - spans 2 cols on md/lg */}
            <div className="md:col-span-2 group relative overflow-hidden rounded-[2rem] bg-zinc-100 h-[280px] lg:h-[320px]">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlB5UOiBXeHbqnBN8UX-rxaxvmZQVUjedn6zv7jKVxKsoFjDNYewFKssdS1HtVnCrh2p6mkhf6qghy7a7lwOtfpv35StaQNX8CVn4S2hTeupmAQnLLcIgZU-R8O-JBE8XhLmGPBuYSw-cOl6J5hPRKsgfCdS7U-yTWDtZ_u9llhSnEusW59fC0WYP8Wj0c6zMWXjPTOxfZD7lV-2SOcVtzRxtr3sMIToAaJcjENfCNdSSkOhsA7mOhB_yCbLTuLwSTHazq0GTFzXa5"
                alt="Fresh smoothies"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-1">데일리 스무디 레시피 5선</h3>
                <p className="text-white/80">아침을 깨우는 상쾌한 한 잔</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 lg:py-32 bg-zinc-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="w-16 h-16 bg-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-3xl">restaurant</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
            오늘 밤, 어떤 요리를 준비하시겠어요?
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed">
            망설이지 말고 지금 바로 재료 사진을 업로드하세요.<br />
            RecipeHub AI가 당신을 위해 최적의 레시피를 설계해 드립니다.
          </p>
          <Link
            to="/create"
            className="inline-flex items-center justify-center bg-white text-zinc-950 font-bold text-lg px-12 h-16 rounded-2xl hover:bg-zinc-200 transition-all active:scale-[0.98]"
          >
            지금 바로 시작하기
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
