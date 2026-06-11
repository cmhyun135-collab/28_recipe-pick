import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReactMarkdown from 'react-markdown';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, 'recipes', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRecipe({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[color:var(--color-primary)]/20 border-t-[color:var(--color-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="material-symbols-outlined text-6xl text-[color:var(--color-surface-variant)]">error_outline</span>
        <h2 className="text-fluid-headline-md font-bold text-[color:var(--color-on-surface)]">레시피를 찾을 수 없습니다.</h2>
        <Link to="/recipes" className="mt-2 text-[color:var(--color-primary)] hover:underline font-body text-sm font-medium">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16 md:pb-24">
      {/* ── Hero Image ── */}
      <div className="relative w-full h-56 sm:h-72 md:h-[50vh] max-h-[500px] bg-[color:var(--color-surface-container)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {recipe.imageUrl ? (
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[color:var(--color-surface-container-high)] flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-[color:var(--color-outline-variant)] mb-2">restaurant</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-20 md:top-24 left-4 md:left-6 z-10">
          <Link
            to="/recipes"
            className="flex items-center gap-2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-3 md:px-4 py-2 rounded-full transition-all text-sm"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span className="font-body text-sm font-medium">목록으로</span>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-5 md:p-10 text-white animate-[fade-in-up_0.6s_ease-out_forwards]">
          <h1 className="text-fluid-display mb-2 md:mb-4">{recipe.title}</h1>
          <div className="flex items-center gap-3 font-body text-sm opacity-90">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-sm shrink-0">
              {(recipe.authorName || 'U').charAt(0).toUpperCase()}
            </div>
            <span>{recipe.authorName || '익명 작성자'}</span>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container-page max-w-4xl mx-auto mt-8 md:mt-16">
        <div
          className="bg-[color:var(--color-surface-container-lowest)] rounded-3xl p-6 md:p-10 shadow-sm border border-[color:var(--color-surface-variant)] animate-[fade-in-up_0.6s_ease-out_forwards]"
          style={{ animationDelay: '0.1s' }}
        >
          <div className="prose max-w-none">
            <ReactMarkdown>{recipe.content || '내용이 없습니다.'}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
