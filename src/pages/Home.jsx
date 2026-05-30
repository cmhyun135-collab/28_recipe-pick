import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Vr8czWLV-FTFp4k8HcKpYyVkIQ_Fip2ob3dXzBDnmmuuW4MG6dQrhzONPNvK4pQdEBuIXVpru9o9IzJt-dt0V2V7pVW5Ss0-qptAMcuZk1HNhJAxDQq9Yfl2YgMSDKO-S-1EERJtuFTDvwmmfAdGJkuy2WsSfrsR9DLZIa6rOmAQVFA48p2yW6PZRQTLHKQswyJuJ4CGqifoto-W3oHT2KjiShFTKD96d9Jka8A7GbCRh91OeyBxfwaqg7uuDszgY1xeLcbJK2ug"
            alt="Rustic dinner table with gourmet Mediterranean dishes"
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>
        <div className="relative z-10 px-6 max-w-4xl animate-fade-in-up">
          <h1 className="font-headline text-display-lg md:text-display-lg text-white mb-6 leading-tight drop-shadow-lg">
            당신의 냉장고 속에 잠든<br />숨은 맛을 깨우세요
          </h1>
          <p className="font-body text-body-lg text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md">
            전문 셰프의 감각과 AI의 지능이 만났습니다. 재료 사진 한 장으로 당신만의 미식 가이드를 완성해보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/create"
              className="group relative flex items-center gap-3 bg-primary-container text-on-primary font-headline text-headline-md px-10 py-5 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95"
            >
              <span className="material-symbols-outlined">photo_camera</span>
              <span>냉장고 파먹기: 사진 찍고 레시피 받기</span>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <span className="material-symbols-outlined text-4xl">expand_more</span>
        </div>
      </section>

      {/* Magazine Style Editorial Section */}
      <section className="py-24 px-6 max-w-container mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="w-full md:w-1/2">
            <div className="border-l-4 border-primary pl-6 mb-8">
              <span className="font-body text-label-md text-primary tracking-widest uppercase mb-2 block">Our Philosophy</span>
              <h2 className="font-headline text-headline-lg text-on-surface">요리는 즐거움이어야 합니다</h2>
            </div>
            <p className="font-body text-body-lg text-on-surface-variant leading-relaxed mb-8">
              RecipeHub는 단순한 레시피 저장소가 아닙니다. 우리는 남은 식재료를 통해 새로운 창의성을 발견하고, 낭비 없는 식탁을 지향하는 미식가들의 커뮤니티입니다. 에디터들이 엄선한 주간 테마 레시피와 AI가 분석한 최적의 맛의 조합을 경험하세요.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-primary mb-3">auto_awesome</span>
                <h3 className="font-headline text-headline-md mb-1">AI 큐레이션</h3>
                <p className="font-body text-caption text-on-surface-variant">사용자의 취향을 학습하는 똑똑한 제안</p>
              </div>
              <div className="p-6 bg-surface-container-low rounded-xl">
                <span className="material-symbols-outlined text-primary mb-3">group</span>
                <h3 className="font-headline text-headline-md mb-1">셰프 커뮤니티</h3>
                <p className="font-body text-caption text-on-surface-variant">5만 명의 홈셰프가 공유하는 리얼 팁</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh3JLpcaKql1TOG0aATGMbdHaRUtTdclaMQIFydxrCsFtq_35b3GadiPVRPpPMOLfzN6Jg6BUwP7wCn-SMPPSV5D1e3hr_Q3ZYFoVSzdgHHZu4jJT4pw6OZNHpynwG_qJ79Ysd5L9Tt0RM8qz19K81Ppn_k2hSmt23i_IjZCof9WLD0cCQ5uAyG7G0pmPTavkink32Hmc75AFz9JOHfBRITDvR6HRQfVmqKKNLW9pGyipgydNCO2bEJD8iGatLzfEg5cuy0mVXiC7s"
                alt="Fresh herbs on a cutting board with vegetables"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 p-8 bg-white shadow-xl rounded-xl max-w-xs hidden lg:block">
              <p className="font-body text-body-md italic text-on-surface-variant">
                "냉장고 속 평범한 재료들이 RecipeHub를 만나 특별한 파인 다이닝으로 변했습니다."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-fixed"></div>
                <div>
                  <p className="font-body text-label-md text-on-surface">김지수</p>
                  <p className="font-body text-caption text-on-surface-variant">Home Chef of the Month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Highlights */}
      <section className="bg-surface-container py-24">
        <div className="px-6 max-w-container mx-auto">
          <h2 className="font-headline text-headline-lg text-on-surface mb-12 text-center">오늘의 트렌딩 레시피</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] md:auto-rows-[280px] gap-6">
            <Link to="/recipe/1" className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-2xl cursor-pointer">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-QBgRtV1DGUZ3fVuHw17fGq5p13z7VM-QSyv5z54HuevNSA8Hzu2NDl_AJWVqP486CVefi1tB45Yd074xpqUvaCzpdly39D6esW6iUCzIlQXxlSy6ayUxTsoNuSmJIuloWvHZr1hP-5kR_nyO0YU18mly6R6hfK6vcvU3ktO0v9jESb9XtjW7jZQvroKNeW4kaDa9uczZVryKdprEBNo4OAGYrXoe4CvJCTyv8DL5fA9mVwYydn0xqB7MqKTMNbLveReUlKUvRHz2"
                alt="Fresh pasta with cherry tomatoes and basil"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <span className="bg-primary px-3 py-1 rounded-full text-[10px] w-fit mb-3">EDITOR'S PICK</span>
                <h3 className="font-headline text-headline-lg mb-2">프레쉬 바질 토마토 파스타</h3>
                <p className="font-body text-body-md opacity-80">15분 만에 즐기는 정통 이탈리아의 맛</p>
              </div>
            </Link>
            <Link to="/recipe/2" className="md:col-span-2 group relative overflow-hidden rounded-2xl cursor-pointer">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvmBNZa_amIKLE-_cJjkbSUTC0kJhq3oJsO7io28X1YwZ1SsGu8gWuKdXk0O-XPkdeDiPxxJR1jR9kqUvHA_7DGL5gNrXzUzA6EazxN7dD5Vbf6e6ZBUp3KQTmAFy_yeRnwv_UqcGdsUQae_YG04_kY_0OmfD0hZeFC2881SRZBi5tU9RxXWH9yHnSgAY1vg-OmN1ZyQ6Lc9hPqUwZ96u4pd1WrYt90tQOeNPyxusV7R8ZYJD_Qtz9XfKywaxYRMr7wTW1JB-9Sy-S"
                alt="Vegan superfood bowl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-headline text-headline-md mb-1">비건 슈퍼푸드 볼</h3>
                <p className="font-body text-body-md opacity-80">활력을 채워주는 건강한 한 끼</p>
              </div>
            </Link>
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNxaA80G6-nRXZOGZcIp_QUUr8ev831jiSgjXCsnzzRPLvhaChSRQQq-stYjU42WlJAFLDnVImWNakcztPgG8YJsSuve2GOblWUlZFTmcuDp6ZOXSEWp-fXywbhEtgiMHPVdcGGlscInQ3uHW6sMtyKLBEmUkZLzvTdasCST0KQmoB0ddWCJhDOj4xtfhZRDuNrb1Ouzw0wFE_9K9su3bzVuUNRa9mtJGDLGFEtkwVMsBPbdwulxm8k8oo8otPWN--_lSydydQ1L4A"
                alt="Chocolate lava cake"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-body text-label-md">달콤한 휴식</h3>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl cursor-pointer">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlB5UOiBXeHbqnBN8UX-rxaxvmZQVUjedn6zv7jKVxKsoFjDNYewFKssdS1HtVnCrh2p6mkhf6qghy7a7lwOtfpv35StaQNX8CVn4S2hTeupmAQnLLcIgZU-R8O-JBE8XhLmGPBuYSw-cOl6J5hPRKsgfCdS7U-yTWDtZ_u9llhSnEusW59fC0WYP8Wj0c6zMWXjPTOxfZD7lV-2SOcVtzRxtr3sMIToAaJcjENfCNdSSkOhsA7mOhB_yCbLTuLwSTHazq0GTFzXa5"
                alt="Fresh smoothies"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-body text-label-md">데일리 스무디</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <span className="material-symbols-outlined text-primary text-6xl mb-6">restaurant</span>
          <h2 className="font-headline text-headline-lg text-on-surface mb-6">오늘 밤, 어떤 요리를 준비하시겠어요?</h2>
          <p className="font-body text-body-lg text-on-surface-variant mb-10">
            망설이지 말고 지금 바로 재료 사진을 업로드하세요. RecipeHub AI가 당신을 위해 최적의 레시피를 설계해 드립니다.
          </p>
          <Link
            to="/create"
            className="inline-block bg-primary-container text-white font-headline text-headline-md px-12 py-5 rounded-full hover:opacity-90 transition-all shadow-lg active:scale-95"
          >
            지금 바로 시작하기
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
