import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize with API key from .env (fallback to empty string to avoid crash, but API will fail without it)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

// Helper to convert base64 to Generative Part
const fileToGenerativePart = (base64Data, mimeType) => {
  return {
    inlineData: {
      data: base64Data.split(',')[1],
      mimeType
    },
  };
};

export const runPipeline = async (imagesBase64, requestText, onProgress) => {
  if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const jsonModel = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });
    
    let analystResultText = "[]";
    if (imagesBase64.length > 0) {
      // Step 1: Analyst
      onProgress('AI 애널리스트가 재료를 식별하고 있습니다...');
      const imageParts = imagesBase64.map(img => fileToGenerativePart(img.data, img.mimeType));
      
      const analystPrompt = `당신은 10년 경력의 시각 정보 분석 전문가입니다. 
제공된 사진과 텍스트를 분석하여, 식별 가능한 모든 요리 재료를 리스트 형태로 추출하세요. 
추측보다는 확실한 재료 위주로 작성하며, 텍스트에 언급된 추가 재료도 포함하세요.

사용자 추가 요청: ${requestText || '없음'}

전달 데이터 예시 형식처럼 JSON 문자열 배열로만 반환하세요: ["계란", "양파", "스팸", "찬밥"]`;

      const analystResult = await jsonModel.generateContent([analystPrompt, ...imageParts]);
      analystResultText = analystResult.response.text();
      console.log("Analyst output:", analystResultText);
    } else {
      analystResultText = JSON.stringify([requestText]);
    }

    // Step 2: Chef
    onProgress('AI 셰프가 최적의 요리 레시피를 구상하고 있습니다...');
    const chefPrompt = `당신은 10년 경력의 베테랑 요리사입니다. 
다음은 에이전트 A가 추출한 재료 목록(또는 텍스트 요청)입니다: ${analystResultText}
사용자의 추가 요청 사항: ${requestText || '없음'}

위 재료와 요청 사항을 바탕으로 가장 적합한 요리 3가지를 추천하세요.
각 요리는 반드시 제목, 필요 재료, 상세 조리 순서를 포함한 유효한 JSON 배열 형식으로 출력해야 합니다.

전달 데이터 예시: [{"title": "스팸 계란볶음밥", "ingredients": ["스팸", "계란"], "steps": ["볶는다", "먹는다"]}]`;

    const chefResult = await jsonModel.generateContent(chefPrompt);
    const recipesJSON = chefResult.response.text();
    console.log("Chef output:", recipesJSON);

    // Step 3: Editor
    onProgress('AI 에디터가 커뮤니티 게시글 형태로 편집 중입니다...');
    const editorPrompt = `당신은 10년 경력의 요리 커뮤니티의 인기 에디터입니다. 
다음은 에이전트 B가 생성한 3개의 JSON 레시피 데이터입니다:
${recipesJSON}

사용자가 게시판에 바로 올릴 수 있도록 매력적인 제목과 가독성 좋은 마크다운 형식으로 정리하세요. 
각 레시피는 독립된 카드 형태로 보여질 수 있게 구분하세요.

필수 요구사항:
각 레시피별로 하나씩 분리하여 다음 형태의 JSON 배열로만 반환하세요. JSON 스키마를 엄격히 지키세요.
[
  { "markdown": "# 요리제목\\n\\n레시피 내용..." },
  { "markdown": "# 요리제목2\\n\\n레시피 내용..." }
]`;

    const editorResult = await jsonModel.generateContent(editorPrompt);
    const finalJSON = editorResult.response.text();
    console.log("Editor output:", finalJSON);
    
    return JSON.parse(finalJSON);
  } catch (error) {
    console.error("Pipeline failed:", error);
    throw error;
  }
};
