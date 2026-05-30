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
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-surface-variant mb-4">error_outline</span>
        <h2 className="font-headline text-headline-md font-bold text-on-surface">레시피를 찾을 수 없습니다.</h2>
        <Link to="/recipes" className="mt-4 text-primary hover:underline">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Hero Image Section */}
      <div className="relative h-[50vh] md:h-[60vh] max-h-[500px] w-full bg-surface-container flex items-center justify-center">
        <div className="absolute inset-0">
          {recipe.imageUrl ? (
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full bg-surface-container-high flex flex-col items-center justify-center">
               <span className="material-symbols-outlined text-6xl text-outline-variant mb-2">restaurant</span>
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>
        
        {/* Back Button */}
        <div className="absolute top-24 left-6 z-10">
          <Link to="/recipes" className="flex items-center gap-2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            <span className="font-body text-label-md">목록으로</span>
          </Link>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white animate-fade-in-up">
          <h1 className="font-headline text-display-lg mb-4">{recipe.title}</h1>
          <div className="flex items-center gap-4 font-body text-body-md opacity-90">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold">
                {(recipe.authorName || 'U').charAt(0).toUpperCase()}
              </div>
              <span>{recipe.authorName || '익명 작성자'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16">
        <div className="bg-surface-container-lowest rounded-3xl p-8 md:p-12 shadow-editorial border border-surface-variant animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="prose prose-lg prose-p:font-body prose-headings:font-headline max-w-none text-on-surface">
            <ReactMarkdown>{recipe.content || '내용이 없습니다.'}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
