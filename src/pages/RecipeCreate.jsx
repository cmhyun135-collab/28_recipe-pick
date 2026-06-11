import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { runPipeline } from '../services/aiPipeline';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const RecipeCreate = () => {
  const { user } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState('');
  const [results, setResults] = useState(null);
  const [images, setImages] = useState([]);
  const [requestText, setRequestText] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const formRef = useRef(null);
  const formFileInputRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImage, setFormImage] = useState(null);
  const [formImagePreview, setFormImagePreview] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const processFiles = (files) => {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, 3 - images.length);
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, { data: e.target.result, mimeType: file.type, id: Math.random().toString(36).substring(7) }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) processFiles(e.dataTransfer.files);
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files?.[0]) processFiles(e.target.files);
  };

  const removeImage = (id) => setImages(prev => prev.filter(img => img.id !== id));

  const generateRecipe = async () => {
    if (images.length === 0 && !requestText.trim()) {
      alert('재료 사진을 업로드하거나 재료를 입력해주세요.');
      return;
    }
    setLoading(true); setResults(null); setIsFormVisible(false);
    try {
      const finalRecipes = await runPipeline(images, requestText, (status) => setPipelineStatus(status));
      setResults(finalRecipes);
    } catch (error) {
      alert('에러가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false); setPipelineStatus('');
    }
  };

  const handleStartPost = (markdown) => {
    setFormContent(markdown);
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    setFormTitle(titleMatch ? titleMatch[1] : '');
    setIsFormVisible(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleFormImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => setFormImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) { alert('제목과 내용을 모두 입력해주세요.'); return; }
    setIsPublishing(true);
    try {
      await addDoc(collection(db, 'recipes'), {
        title: formTitle,
        content: formContent,
        imageUrl: formImagePreview || null,
        authorId: user.uid,
        authorName: user.displayName || '익명 요리사',
        authorEmail: user.email,
        likes: 0,
        createdAt: serverTimestamp(),
      });
      alert('게시글이 성공적으로 등록되었습니다!');
      navigate('/recipes');
    } catch (error) {
      console.error('Publish error:', error);
      alert('게시글 등록에 실패했습니다: ' + error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="pt-24 pb-32 min-h-screen bg-[#fafafa]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* ── Page Header ── */}
        <div className="mb-12 md:mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 mb-4 md:mb-6">
            AI 레시피 생성
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 max-w-3xl leading-relaxed">
            냉장고 속 재료 사진을 업로드하거나 원하는 조건을 텍스트로 입력하세요.
            AI가 분석하여 당신만을 위한 완벽한 요리법을 제안합니다.
          </p>
        </div>

        {/* ── Upload Form ── */}
        {!results && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {/* Left Column: Drag & Drop Zone */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-zinc-950">재료 사진</h2>
                <span className="text-sm font-medium text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">최대 3장</span>
              </div>
              <div
                className={`flex-1 min-h-[360px] border-2 border-dashed rounded-3xl p-8 md:p-12 flex flex-col items-center justify-center text-center transition-all duration-200 group ${dragActive
                    ? 'border-zinc-950 bg-zinc-50'
                    : 'border-zinc-300 hover:border-zinc-400 bg-white'
                  }`}
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${dragActive ? 'bg-[#ff4500] text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-zinc-200 group-hover:text-zinc-700'}`}>
                  <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-950 mb-2">클릭하거나 이미지를 드래그하세요</h3>
                <p className="text-zinc-500 mb-8 max-w-sm">
                  PNG, JPG, JPEG 등 고화질 사진일수록 AI가 재료를 더 정확하게 인식합니다.
                </p>

                <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleChange} />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-white border border-zinc-200 text-zinc-950 text-base font-semibold px-8 py-3.5 rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all shadow-sm"
                >
                  파일 선택
                </button>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
                    {images.map(img => (
                      <div key={img.id} className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-sm border border-zinc-200 group/img">
                        <img src={img.data} alt="uploaded" className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105" />
                        <button
                          onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                          className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-sm text-white rounded-full p-1 opacity-0 group-hover/img:opacity-100 hover:bg-black transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Text Input & Actions */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-zinc-950">추가 요청사항</h2>
                <span className="text-sm font-medium text-zinc-400 bg-zinc-100 px-3 py-1 rounded-full">선택사항</span>
              </div>
              <textarea
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                className="flex-1 min-h-[220px] lg:min-h-0 w-full bg-white border border-zinc-200 rounded-3xl p-6 text-zinc-950 text-base focus:outline-none focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 resize-none transition-all shadow-sm placeholder:text-zinc-400"
                placeholder="예: 다이어트 중이라 칼로리가 낮은 요리를 원해. 매운 건 못 먹어."
              />
              <div className="mt-8 pt-8 border-t border-zinc-200">
                <button
                  onClick={generateRecipe}
                  disabled={loading}
                  className="w-full bg-[#ff4500] text-white font-bold text-lg h-16 rounded-2xl hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 shadow-lg shadow-zinc-950/20"
                >
                  <span className="material-symbols-outlined">auto_awesome</span>
                  AI 레시피 생성하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Loading State ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 animate-fade-in bg-white rounded-3xl border border-zinc-200 shadow-sm">
            <div className="w-16 h-16 border-4 border-zinc-100 border-t-zinc-950 rounded-full animate-spin mb-8" />
            <h2 className="text-2xl font-bold text-zinc-950 mb-3 tracking-tight">
              {pipelineStatus || '레시피를 생성하고 있습니다...'}
            </h2>
            <p className="text-zinc-500 text-lg">최적의 요리법과 재료의 조합을 찾고 있어요.</p>
          </div>
        )}

        {/* ── Results State ── */}
        {results && !loading && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-zinc-200">
              <div className="flex items-center gap-3 text-zinc-950">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">생성된 레시피</h2>
              </div>
              {!isFormVisible && (
                <button
                  onClick={() => { setResults(null); setImages([]); setRequestText(''); }}
                  className="text-zinc-500 hover:text-zinc-950 font-medium px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
                >
                  처음으로 돌아가기
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-12 mb-16">
              {results.map((recipe, index) => (
                <div key={index} className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-zinc-200 overflow-hidden relative group">
                  <div className="prose max-w-none">
                    <ReactMarkdown>{recipe.markdown}</ReactMarkdown>
                  </div>
                  <div className="mt-10 pt-8 border-t border-zinc-100 flex justify-end">
                    <button
                      onClick={() => handleStartPost(recipe.markdown)}
                      className="flex items-center justify-center gap-2 bg-[#ff4500] text-white font-semibold px-8 h-14 rounded-xl hover:bg-zinc-800 transition-all active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-lg">edit_document</span>
                      이 레시피로 게시글 작성하기
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Post Editor ── */}
            {isFormVisible && (
              <div ref={formRef} className="animate-fade-in-up pt-8">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-zinc-200/50 border border-zinc-200">
                  <div className="flex items-center gap-4 mb-12">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-zinc-950 text-2xl">stylus_note</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-zinc-950 tracking-tight">레시피 게시글 작성</h2>
                  </div>

                  <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Col: Meta */}
                    <div className="lg:col-span-1 flex flex-col gap-8">
                      <div>
                        <label className="text-sm font-bold text-zinc-950 block mb-3">게시글 제목</label>
                        <input
                          type="text"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          className="w-full px-5 h-14 bg-zinc-50 rounded-xl border border-zinc-200 focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950 outline-none transition-all font-medium text-zinc-950"
                          placeholder="멋진 요리 제목을 입력하세요"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-bold text-zinc-950 block mb-3">대표 이미지</label>
                        <div
                          className="w-full aspect-square rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 flex flex-col items-center justify-center overflow-hidden cursor-pointer hover:border-zinc-400 hover:bg-zinc-100 transition-all group"
                          onClick={() => formFileInputRef.current.click()}
                        >
                          {formImagePreview ? (
                            <img src={formImagePreview} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-zinc-400 text-4xl mb-3">add_photo_alternate</span>
                              <span className="text-sm font-medium text-zinc-500">클릭하여 이미지 업로드</span>
                            </>
                          )}
                        </div>
                        <input type="file" accept="image/*" className="hidden" ref={formFileInputRef} onChange={handleFormImageChange} />
                      </div>
                    </div>

                    {/* Right Col: Editor & Submit */}
                    <div className="lg:col-span-2 flex flex-col gap-8">
                      <div className="flex-1 flex flex-col">
                        <label className="text-sm font-bold text-zinc-950 block mb-3">레시피 상세 내용 (마크다운 지원)</label>
                        <textarea
                          value={formContent}
                          onChange={(e) => setFormContent(e.target.value)}
                          className="flex-1 min-h-[400px] w-full p-6 bg-zinc-50 rounded-2xl border border-zinc-200 focus:border-zinc-950 focus:bg-white focus:ring-1 focus:ring-zinc-950 outline-none transition-all text-base text-zinc-900 leading-relaxed font-mono resize-y"
                          required
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsFormVisible(false)}
                          className="flex-1 bg-white border border-zinc-200 text-zinc-950 font-bold text-lg h-16 rounded-2xl hover:bg-zinc-50 transition-all"
                          disabled={isPublishing}
                        >
                          취소
                        </button>
                        <button
                          type="submit"
                          disabled={isPublishing}
                          className="flex-[2] bg-[#ff4500] text-white font-bold text-lg h-16 rounded-2xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-zinc-950/20 active:scale-[0.98]"
                        >
                          {isPublishing ? (
                            <>
                              <div className="w-5 h-5 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                              업로드 중...
                            </>
                          ) : (
                            <>
                              <span className="material-symbols-outlined text-xl">send</span>
                              커뮤니티에 공유하기
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCreate;
