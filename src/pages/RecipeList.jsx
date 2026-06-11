import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const categories = ['전체', '#비건', '#15분요리', '#다이어트', '#베이킹', '#홈파티', '#간식'];

const RecipeList = () => {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const q = query(collection(db, 'recipes'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedRecipes = [];
        querySnapshot.forEach((doc) => {
          fetchedRecipes.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <main className="pt-24 pb-32 min-h-screen bg-[#fafafa]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* ── Search Hero ── */}
        <section className="py-12 md:py-16 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-950 mb-6 tracking-tight">
            오늘 어떤 요리를 해볼까요?
          </h1>
          <p className="text-lg md:text-xl font-medium text-zinc-500 max-w-2xl mx-auto mb-12">
            수천 가지 프리미엄 레시피와 AI가 추천하는 맞춤형 요리 가이드를 만나보세요.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-zinc-400 text-2xl group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input
              className="w-full bg-white border border-zinc-200 py-5 pl-16 pr-32 rounded-2xl text-lg text-zinc-950 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
              placeholder="재료나 요리 이름을 입력하세요..."
              type="text"
            />
            <button className="absolute inset-y-2.5 right-2.5 bg-primary text-white px-8 rounded-xl text-base font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 active:scale-95 transition-all">
              검색
            </button>
          </div>
        </section>

        {/* ── Category Filter ── */}
        <section className="mb-12">
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all shadow-sm shrink-0 ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-primary/20 border border-primary'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* ── Recipe Grid ── */}
        <section>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-16 h-16 border-4 border-zinc-100 border-t-primary rounded-full animate-spin mb-6" />
              <p className="text-lg font-bold text-zinc-500">레시피를 불러오는 중입니다...</p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {recipes.map((recipe) => (
                <Link
                  to={`/recipe/${recipe.id}`}
                  key={recipe.id}
                  className="group bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[4/3] bg-zinc-100 relative overflow-hidden flex items-center justify-center">
                    {recipe.imageUrl ? (
                      <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={recipe.imageUrl}
                        alt={recipe.title}
                      />
                    ) : (
                      <span className="material-symbols-outlined text-5xl text-zinc-300">restaurant</span>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      <span className="text-sm font-bold text-zinc-950">{recipe.likes || 0}</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-extrabold text-zinc-950 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      {recipe.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-500 shrink-0">
                        {(recipe.authorName || 'U').charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-zinc-500 truncate">{recipe.authorName || '익명'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-3xl border border-zinc-200 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-zinc-400">info</span>
              </div>
              <p className="text-2xl font-extrabold text-zinc-950 mb-2">아직 등록된 레시피가 없습니다.</p>
              <p className="text-zinc-500 font-medium">당신의 멋진 레시피를 첫 번째로 공유해보세요!</p>
            </div>
          )}

          {/* Pagination */}
          {!loading && recipes.length > 0 && (
            <nav className="mt-16 flex justify-center items-center gap-2">
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-500 transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white text-base font-bold shadow-md shadow-primary/20">1</button>
              <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-500 transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </nav>
          )}
        </section>

        {/* FAB */}
        <Link
          to="/create"
          className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
          aria-label="레시피 작성하기"
        >
          <span className="material-symbols-outlined text-3xl">edit</span>
        </Link>
      </div>
    </main>
  );
};

export default RecipeList;
