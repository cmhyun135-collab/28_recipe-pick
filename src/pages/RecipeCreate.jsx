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

  // Post Form State
  const formRef = useRef(null);
  const formFileInputRef = useRef(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImage, setFormImage] = useState(null);
  const [formImagePreview, setFormImagePreview] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/')).slice(0, 3 - images.length);
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prev => [...prev, {
          data: e.target.result,
          mimeType: file.type,
          id: Math.random().toString(36).substring(7)
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const generateRecipe = async () => {
    if (images.length === 0 && !requestText.trim()) {
      alert("재료 사진을 업로드하거나 재료를 입력해주세요.");
      return;
    }

    setLoading(true);
    setResults(null);
    setIsFormVisible(false); // Reset form visibility on new generation
    try {
      const finalRecipes = await runPipeline(images, requestText, (status) => {
        setPipelineStatus(status);
      });
      setResults(finalRecipes);
    } catch (error) {
      alert("에러가 발생했습니다: " + error.message);
    } finally {
      setLoading(false);
      setPipelineStatus('');
    }
  };

  const handleStartPost = (markdown) => {
    setFormContent(markdown);
    // Extract title (e.g. # Title)
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      setFormTitle(titleMatch[1]);
    } else {
      setFormTitle('');
    }
    setIsFormVisible(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFormImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormImage(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormImagePreview(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    
    setIsPublishing(true);
    try {
      let imageUrl = null;
      if (formImagePreview) {
        // Firestore 1MB 제한을 고려해 Base64 문자열로 직접 저장
        imageUrl = formImagePreview;
      }

      await addDoc(collection(db, 'recipes'), {
        title: formTitle,
        content: formContent,
        imageUrl: imageUrl,
        authorId: user.uid,
        authorName: user.displayName || '익명 요리사',
        authorEmail: user.email,
        likes: 0,
        createdAt: serverTimestamp()
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
    <div className="pt-24 pb-20 min-h-screen px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="font-headline text-display-lg font-bold text-on-surface mb-4">
          AI 레시피 생성
        </h1>
        <p className="font-body text-body-lg text-on-surface-variant">
          냉장고에 있는 재료 사진을 올리거나 텍스트로 입력하면 AI 멀티에이전트 파이프라인이 완벽한 레시피를 만들어줍니다.
        </p>
      </div>

      {!results && !loading && (
        <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${dragActive ? 'border-primary bg-primary/5' : 'border-outline-variant bg-surface-container-lowest hover:border-primary/50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <span className="material-symbols-outlined text-4xl text-primary mb-4 block">
              cloud_upload
            </span>
            <h3 className="font-headline text-headline-md font-bold text-on-surface mb-2">
              재료 사진 업로드 (최대 3장)
            </h3>
            <p className="font-body text-body-md text-on-surface-variant mb-6">
              클릭하여 파일을 선택하거나 이곳으로 이미지를 드래그하세요.
            </p>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleChange}
            />
            <button 
              onClick={() => fileInputRef.current.click()}
              className="bg-primary text-on-primary font-body text-label-md px-6 py-3 rounded-full hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-md"
            >
              파일 선택하기
            </button>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="flex justify-center gap-4 mt-8">
                {images.map(img => (
                  <div key={img.id} className="relative w-24 h-24 rounded-xl overflow-hidden shadow-sm border border-surface-variant">
                    <img src={img.data} alt="uploaded" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeImage(img.id)}
                      className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/80 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-surface-variant"></div>
            <span className="flex-shrink-0 mx-4 font-body text-label-md text-on-surface-variant">또는 추가 요청</span>
            <div className="flex-grow border-t border-surface-variant"></div>
          </div>

          <div className="space-y-4">
            <label className="font-headline text-body-lg font-bold text-on-surface block">
              재료 또는 추가 요청사항 직접 입력
            </label>
            <textarea
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              className="w-full h-32 p-4 bg-surface-container-lowest border border-surface-variant rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors font-body text-body-md resize-none"
              placeholder="예: 다이어트 중이라 칼로리가 낮은 요리를 원해. 매운 건 못 먹어."
            ></textarea>
          </div>

          <button
            onClick={generateRecipe}
            disabled={loading}
            className="w-full bg-primary text-on-primary font-headline text-body-lg font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-editorial disabled:opacity-50"
          >
            AI 레시피 만들기
          </button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-6"></div>
          <h2 className="font-headline text-headline-md font-bold text-on-surface mb-2">
            {pipelineStatus || '레시피를 생성하고 있습니다...'}
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            최적의 요리법과 재료의 조합을 찾고 있어요.
          </p>
        </div>
      )}

      {results && !loading && (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-3 text-primary mb-8 justify-center">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="font-headline text-label-md font-bold uppercase tracking-wider">
              생성 완료
            </span>
          </div>
          
          <div className="space-y-8 mb-12">
            {results.map((recipe, index) => (
              <div key={index} className="bg-surface-container-lowest rounded-3xl p-8 shadow-editorial border border-surface-variant">
                <div className="prose prose-p:font-body prose-headings:font-headline max-w-none text-on-surface">
                  <ReactMarkdown>{recipe.markdown}</ReactMarkdown>
                </div>
                <div className="mt-8 pt-6 border-t border-surface-variant flex justify-end">
                  <button 
                    onClick={() => handleStartPost(recipe.markdown)}
                    className="flex items-center gap-2 bg-primary-container text-on-primary-container font-body text-label-md px-6 py-3 rounded-full hover:opacity-90 transition-all shadow-md active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[20px]">edit_document</span>
                    이 레시피로 게시글 작성하기
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!isFormVisible && (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setResults(null);
                  setImages([]);
                  setRequestText('');
                }}
                className="bg-surface-container text-on-surface font-headline text-body-lg font-bold px-8 py-4 rounded-2xl hover:bg-surface-container-high transition-colors"
              >
                다시 생성하기
              </button>
            </div>
          )}
        </div>
      )}

      {/* Post Editor Form */}
      {isFormVisible && (
        <div ref={formRef} className="mt-16 animate-fade-in-up border-t-2 border-primary/20 pt-16">
          <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 shadow-editorial border border-surface-variant">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-3xl">stylus_note</span>
              <h2 className="font-headline text-display-lg font-bold text-on-surface">
                레시피 게시글 작성
              </h2>
            </div>

            <form onSubmit={handlePublish} className="space-y-6">
              {/* Title */}
              <div>
                <label className="font-headline text-body-lg font-bold text-on-surface block mb-2">제목</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border border-surface-variant focus:border-primary focus:bg-surface-container-lowest focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body text-body-lg"
                  placeholder="멋진 요리 제목을 입력하세요"
                  required
                />
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="font-headline text-body-lg font-bold text-on-surface block mb-2">대표 이미지</label>
                <div className="flex items-center gap-4">
                  <div 
                    className="w-40 h-40 md:w-48 md:h-48 rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary hover:bg-surface-container-low transition-all"
                    onClick={() => formFileInputRef.current.click()}
                  >
                    {formImagePreview ? (
                      <img src={formImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-outline-variant text-4xl">add_photo_alternate</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-body-md text-on-surface-variant mb-2">
                      게시판 리스트에 보여질 먹음직스러운 완성 사진을 올려주세요.
                    </p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      ref={formFileInputRef}
                      onChange={handleFormImageChange}
                    />
                    <button 
                      type="button"
                      onClick={() => formFileInputRef.current.click()}
                      className="bg-surface-container-high text-on-surface font-body text-label-md px-6 py-2 rounded-full hover:bg-surface-variant transition-colors"
                    >
                      {formImagePreview ? '이미지 변경' : '이미지 추가'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Markdown Editor */}
              <div>
                <label className="font-headline text-body-lg font-bold text-on-surface block mb-2">레시피 상세 내용 (수정 가능)</label>
                <textarea
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  className="w-full h-[400px] p-6 bg-surface-container-low rounded-2xl border border-surface-variant focus:border-primary focus:bg-surface-container-lowest focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body text-body-md resize-y leading-relaxed"
                  required
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t border-surface-variant">
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="flex-1 bg-surface-container-high text-on-surface font-headline text-body-lg font-bold py-4 rounded-2xl hover:bg-surface-variant transition-colors"
                  disabled={isPublishing}
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isPublishing}
                  className="flex-1 bg-primary text-on-primary font-headline text-body-lg font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isPublishing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-on-primary/20 border-t-on-primary rounded-full animate-spin"></div>
                      업로드 중...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[20px]">send</span>
                      게시하기
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCreate;
