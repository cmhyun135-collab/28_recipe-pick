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
        console.error("Error fetching recipes: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <main className="pt-24 pb-20 px-6 max-w-container mx-auto min-h-screen">
      {/* Search Hero */}
      <section className="mb-12">
        <div className="text-center mb-10">
          <h1 className="font-headline text-display-lg text-on-surface mb-4">오늘 어떤 요리를 해볼까요?</h1>
          <p className="font-body text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            수천 가지 프리미엄 레시피와 AI가 추천하는 맞춤형 요리 가이드를 만나보세요.
          </p>
        </div>
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline text-2xl group-focus-within:text-primary-container transition-colors">search</span>
          </div>
          <input
            className="w-full bg-surface-container-lowest border border-surface-variant py-5 pl-16 pr-8 rounded-full font-body text-body-lg focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-editorial hover:shadow-lg"
            placeholder="재료나 요리 이름을 입력하세요..."
            type="text"
          />
          <button className="absolute inset-y-2 right-2 bg-primary-container text-on-primary px-8 rounded-full font-body text-label-md hover:brightness-110 active:scale-95 transition-all">
            검색
          </button>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="flex gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-body text-label-md whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-primary-container text-on-primary'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Recipe Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="font-body text-body-md text-on-surface-variant">게시글을 불러오는 중...</p>
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe.id}`} key={recipe.id} className="group cursor-pointer bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-sm hover:shadow-editorial hover:-translate-y-2 transition-all duration-300 pb-4">
              <div className="aspect-[4/3] rounded-t-2xl overflow-hidden mb-4 relative bg-surface-container flex items-center justify-center">
                {recipe.imageUrl ? (
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={recipe.imageUrl}
                    alt={recipe.title}
                  />
                ) : (
                  <span className="material-symbols-outlined text-4xl text-outline-variant">restaurant</span>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary-container text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  <span className="font-body text-label-md text-xs text-on-surface">{recipe.likes || 0}</span>
                </div>
              </div>
              <div className="px-4">
                <h3 className="font-headline text-headline-md text-on-surface mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-[10px] font-bold">
                      {(recipe.authorName || 'U').charAt(0).toUpperCase()}
                    </div>
                    <span className="font-body text-caption text-on-surface-variant line-clamp-1">{recipe.authorName || '익명'}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-surface-container-lowest rounded-3xl border border-surface-variant shadow-sm">
          <span className="material-symbols-outlined text-4xl text-surface-variant mb-4 block">info</span>
          <p className="font-body text-body-lg text-on-surface">아직 등록된 레시피가 없습니다.</p>
          <p className="font-body text-body-md text-on-surface-variant mt-2">첫 번째 레시피를 작성해보세요!</p>
        </div>
      )}

      {/* Pagination */}
      {!loading && recipes.length > 0 && (
        <nav className="mt-20 flex justify-center items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-container text-on-primary font-body text-label-md">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-low text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </nav>
      )}

      {/* FAB */}
      <Link
        to="/create"
        className="fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </Link>
    </main>
  );
};

export default RecipeList;
