import {
  GoogleGenAI,
  Type,
  GenerateContentResponse,
  HarmCategory,
  HarmBlockThreshold
} from '@google/genai';
import {
  ClinicalCorrelation,
  Examination,
  ExamStep,
  DiagnosisSuggestion,
  ClinicalCondition,
  ConditionInvestigation,
  DifferentialSynthesis,
  PatientContext,
  InvestigationDetail,
  TherapeuticGuidance,
  AntibioticInfo,
  PathogenInfo,
  ECGPattern,
  RadiologyFinding,
  AppTheme,
  ClarifyingQuestion,
  ClarifyingResponse,
  MCQQuestion,
  AnaesthesiaDrug,
  DrugInfo,
  DrugMapping,
  InteractionResult,
  PathophysiologyInfo
} from '../types';
import { storage } from './storageService';

interface GenerateContentParams {
  model: string;
  contents: unknown;
  config?: {
    responseMimeType?: string;
    responseSchema?: unknown;
    temperature?: number;
    safetySettings?: Array<{
      category: HarmCategory;
      threshold: HarmBlockThreshold;
    }>;
    [key: string]: unknown;
  };
}

interface RawModule {
  step_title?: string;
  explanation?: string;
  findings?: {
    positive?: string[];
    negative?: string[];
  };
  pathophysiology?: PathophysiologyInfo[];
  clinical_pearls?: string[];
  media_placeholders?: string[];
}
import {
  searchExaminationAsCondition,
  searchECGPattern,
  searchRadiologyFinding,
  searchTherapeuticGuidance,
  searchClinicalCorrelation,
  searchAntibiotic,
  searchPathogen
} from './bm25SearchService';

export class GeminiService {
  private getAI(): GoogleGenAI {
    let apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && !apiKey.startsWith('AIzaSy')) {
      try {
        apiKey = atob(apiKey);
      } catch (e) {
        // Fallback if not base64 or failed to decode
      }
    }
    if (!apiKey) {
      console.warn('GEMINI_API_KEY not found in environment. Gemini features may be limited.');
    }
    return new GoogleGenAI({ apiKey: apiKey || '' });
  }

  private readonly MEDICAL_SYSTEM_INSTRUCTION = `You are an elite medical information system designed for senior medical staff and fellowship candidates (CICM, ANZCA, RACP). 
    All information provided must be evidence-based and derived from reputable medical sources such as:
    - Peer-reviewed journals (NEJM, Lancet, JAMA, BMJ)
    - Professional bodies (AHA, ESC, RACGP, NICE, RACP, ANZCA, CICM)
    - Academic medical centers (Mayo Clinic, Cleveland Clinic, LITFL, Radiopaedia, DermNet NZ)
    - Specialized medical databases (UpToDate, eTG, CHRISP)
    
    CRITICAL REGIONAL CONTEXT: You are operating in Tropical North Queensland (TNQ). You MUST prioritize and integrate:
    - Queensland Health (CHRISP) guidelines.
    - Local TNQ hospital protocols (Cairns Hospital, Townsville University Hospital).
    - Regional endemic diseases ONLY when clinically relevant (Melioidosis, Dengue, Scrub Typhus, Irukandji syndrome). 
      NOTE: Do NOT over-suggest Melioidosis as a mimic for minor or non-septic presentations. Only include it in differentials if there is genuine clinical suspicion (e.g., sepsis, pneumonia, high-risk skin lesions, or high-risk patient factors like DM/heavy ETOH).
    
    ANTIMICROBIAL STEWARDSHIP (AMS):
    - You MUST prioritize AMS principles. 
    - Restricted antibiotics (e.g., Meropenem, Ceftazidime) should only be suggested when strictly indicated by clinical guidelines for specific, high-suspicion cases (e.g., suspected Melioidosis in a septic patient).
    - Always consider narrower-spectrum alternatives first where appropriate.
    
    STANDARDS:
    - Use precise medical terminology.
    - Provide specific references or citations where possible. 
    - If information is not well-supported, state the level of evidence or uncertainty.
    - NEVER hallucinate clinical data.
    - For pathophysiology, explain at the cellular or molecular level where appropriate.`;

  private cleanJson(text: string): string {
    if (typeof text !== 'string') return text;

    // Try to find a JSON block enclosed in curly braces or square brackets
    const match = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) {
      return match[0];
    }

    // Fallback: Remove markdown code blocks if present
    return text.replace(/```json\n?|```/g, '').trim();
  }

  private async generateContentWithRetry(
    params: GenerateContentParams,
    retries = 3,
    delayMs = 1000
  ): Promise<GenerateContentResponse> {
    if (params) {
      if (!params.config) {
        params.config = {};
      }
      if (!params.config.safetySettings) {
        params.config.safetySettings = [
          {
            category: 'HARM_CATEGORY_HATE_SPEECH' as HarmCategory,
            threshold: 'BLOCK_LOW_AND_ABOVE' as HarmBlockThreshold
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT' as HarmCategory,
            threshold: 'BLOCK_LOW_AND_ABOVE' as HarmBlockThreshold
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT' as HarmCategory,
            threshold: 'BLOCK_LOW_AND_ABOVE' as HarmBlockThreshold
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT' as HarmCategory,
            threshold: 'BLOCK_LOW_AND_ABOVE' as HarmBlockThreshold
          }
        ];
      }
    }
    for (let i = 0; i < retries; i++) {
      try {
        const ai = this.getAI();
        return await ai.models.generateContent(params);
      } catch (error: unknown) {
        if (i === retries - 1) throw error;
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn(
          `Gemini API call failed (attempt ${i + 1}/${retries}). Retrying in ${delayMs}ms...`,
          errorMessage
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2; // Exponential backoff
      }
    }
    throw new Error('Failed to generate content after retries');
  }

  public async generateIllustration(
    prompt: string,
    isPro: boolean = false
  ): Promise<string | undefined> {
    try {
      const ai = this.getAI();
      const systemPrompt = `Generate a professional medical textbook illustration of: ${prompt}. Clean white background, scientific diagram style, clear labeling. Ensure anatomical accuracy based on standard medical texts.`;

      if (isPro) {
        // Use Imagen 4.0 for Pro users
        const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: systemPrompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/png',
            aspectRatio: '16:9'
          }
        });

        if (response.generatedImages?.[0]?.image?.imageBytes) {
          return `data:image/png;base64,${response.generatedImages[0].image.imageBytes}`;
        }
      } else {
        // Use Gemini 2.5 Flash Image for standard users
        const response = await this.generateContentWithRetry({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: systemPrompt }] },
          config: {
            imageConfig: { aspectRatio: '16:9' },
            systemInstruction: this.MEDICAL_SYSTEM_INSTRUCTION
          }
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            return `data:image/png;base64,${part.inlineData.data}`;
          }
        }
      }
    } catch (error) {
      console.error('Illustration generation failed:', error);
    }
    return undefined;
  }

  async getClinicalCorrelation(
    sign: string,
    context: string,
    isPro: boolean = false,
    forceRefresh: boolean = false
  ): Promise<ClinicalCorrelation> {
    // 1. Check IndexedDB exact-match cache
    if (!forceRefresh) {
      try {
        const cached = await storage.getCorrelation(sign);
        if (cached) return cached;
      } catch (e) {
        console.warn('Correlation cache check failed:', e);
      }
    }

    // 2. BM25 offline search over cached correlations
    if (!forceRefresh) {
      try {
        const localHit = await searchClinicalCorrelation(sign);
        if (localHit) {
          console.log(`[offline-first] BM25 correlation hit for: ${sign}`);
          return localHit;
        }
      } catch (e) {
        console.warn('BM25 correlation search failed:', e);
      }
    }

    const prompt = `Explain the clinical and physiological significance of '${sign}' in a ${context} context. 
      Focus on pathophysiology and causes. 
      If this is a dermatological sign, use morphology and terminology consistent with DermNet NZ (dermnetnz.org).
      Determine if this sign involves circulatory changes (e.g. valvular disease, shunts), specific cardiac function (PV loops), or specific anatomy. 
      Return as JSON with fields: sign, context, pathophysiology, causes[], clinicalSignificance, imagePrompt, needsCirculationDiagram, circulationSide, needsPVLoopDiagram, needsAnatomyDiagram, affectedAnatomy.`;

    const response = await this.generateContentWithRetry({
      model: isPro ? 'gemini-3.1-pro-preview' : 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sign: { type: Type.STRING },
            context: { type: Type.STRING },
            pathophysiology: { type: Type.STRING },
            causes: { type: Type.ARRAY, items: { type: Type.STRING } },
            clinicalSignificance: { type: Type.STRING },
            imagePrompt: { type: Type.STRING },
            needsCirculationDiagram: { type: Type.BOOLEAN },
            circulationSide: { type: Type.STRING, description: 'left-sided or right-sided' },
            needsPVLoopDiagram: { type: Type.BOOLEAN },
            needsAnatomyDiagram: { type: Type.BOOLEAN },
            affectedAnatomy: { type: Type.STRING }
          },
          required: ['sign', 'pathophysiology', 'causes', 'clinicalSignificance', 'imagePrompt']
        }
      }
    });

    const rawData = JSON.parse(this.cleanJson(response.text || '{}'));
    const correlation: ClinicalCorrelation = {
      sign: rawData.sign || sign,
      pathophysiology: rawData.pathophysiology || '',
      causes: Array.isArray(rawData.causes) ? rawData.causes : [],
      clinicalSignificance: rawData.clinicalSignificance || '',
      imagePrompt: rawData.imagePrompt || sign,
      needsCirculationDiagram: !!rawData.needsCirculationDiagram,
      circulationSide: rawData.circulationSide,
      needsPVLoopDiagram: !!rawData.needsPVLoopDiagram,
      needsAnatomyDiagram: !!rawData.needsAnatomyDiagram,
      affectedAnatomy: rawData.affectedAnatomy,
      retrievedAt: Date.now()
    };

    // Generate illustrations in parallel
    const illustrationPromises = [
      this.generateIllustration(correlation.imagePrompt || correlation.sign, isPro).then(
        (url) => (correlation.imageUrl = url)
      )
    ];

    if (correlation.needsCirculationDiagram) {
      illustrationPromises.push(
        this.generateIllustration(
          `Medical diagram of ${correlation.circulationSide || 'systemic'} circulation pathophysiology for ${correlation.sign}`,
          isPro
        ).then((url) => (correlation.circulationImageUrl = url))
      );
    }
    if (correlation.needsPVLoopDiagram) {
      illustrationPromises.push(
        this.generateIllustration(
          `Cardiac pressure-volume (PV) loop diagram showing ${correlation.sign} pathology`,
          isPro
        ).then((url) => (correlation.pvLoopImageUrl = url))
      );
    }
    if (correlation.needsAnatomyDiagram) {
      illustrationPromises.push(
        this.generateIllustration(
          `Detailed anatomical diagram of the ${correlation.affectedAnatomy || correlation.sign} showing clinical pathology`,
          isPro
        ).then((url) => (correlation.anatomyImageUrl = url))
      );
    }

    await Promise.all(illustrationPromises);

    // Save to cache
    try {
      await storage.saveCorrelation(correlation);
    } catch (e) {
      console.warn('Failed to save correlation to cache:', e);
    }

    return correlation;
  }

  async populateExamination(exam: Examination): Promise<Partial<Examination>> {
    const prompt = `Generate a highly detailed, medical-student/junior-doctor level clinical examination protocol for '${exam.name}' within the ${exam.system} system. 
      The depth and structure MUST match the following JSON format exactly:
      {
        "reference_standard": "e.g., Talley and O'Connor, Macleod's",
        "modules": [
          {
            "step_title": "Name of the step",
            "explanation": "Detailed explanation of how to perform the step",
            "media_placeholders": ["video_url: ...", "image_url: ..."],
            "findings": {
              "positive": ["List of positive findings"],
              "negative": ["List of normal/negative findings"]
            },
            "pathophysiology": [
              { "finding": "Name of finding", "mechanism": "Detailed pathophysiological mechanism" }
            ],
            "clinical_pearls": ["List of clinical pearls"]
          }
        ],
        "headerImagePrompt": "Prompt for a header image",
        "differentialDiagnoses": [{"condition": "...", "reasoning": "...", "findings": ["..."]}],
        "visualAids": [{"title": "...", "type": "...", "description": "..."}],
        "sources": [{"title": "...", "uri": "..."}]
      }
      
      Ensure the pathophysiology is detailed and the clinical pearls are high-yield.
      You MUST provide a list of reputable medical sources used to generate this protocol.`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: this.MEDICAL_SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }]
      }
    });

    const data = JSON.parse(this.cleanJson(response.text || '{}'));
    const headerImageUrl = await this.generateIllustration(data.headerImagePrompt, false);

    // Extract grounding sources
    const groundingSources =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk) => ({
          title: chunk.web?.title || 'Source',
          uri: chunk.web?.uri || ''
        }))
        .filter((s): s is { title: string; uri: string } => !!s.uri) || [];

    // Map the new "modules" structure to ExamStep
    const mappedSteps: ExamStep[] = ((data.modules as RawModule[]) || []).map((mod, index) => ({
      id: `step_${index}`,
      title: mod.step_title || '',
      description: mod.explanation || '',
      category: 'Examination',
      positiveFindings: (mod.findings?.positive || []).map((f: string) => ({ description: f })),
      negativeFindings: mod.findings?.negative || [],
      pathophysiology: mod.pathophysiology || [],
      clinicalPearls: mod.clinical_pearls || [],
      mediaPlaceholders: mod.media_placeholders || []
    }));

    return {
      steps: mappedSteps,
      referenceStandard: data.reference_standard,
      headerImageUrl,
      headerImagePrompt: data.headerImagePrompt,
      differentialDiagnoses: Array.isArray(data.differentialDiagnoses)
        ? data.differentialDiagnoses
        : [],
      visualAids: Array.isArray(data.visualAids) ? data.visualAids : [],
      sources: [...(Array.isArray(data.sources) ? data.sources : []), ...groundingSources]
    };
  }

  async refineExamination(
    exam: Examination,
    refinementPrompt: string
  ): Promise<Partial<Examination>> {
    const currentStepsJson = JSON.stringify(
      exam.steps.map((s) => ({
        title: s.title,
        description: s.description,
        findings: {
          positive: s.positiveFindings?.map((f) => f.description) || [],
          negative: s.negativeFindings || []
        },
        pathophysiology: s.pathophysiology || [],
        clinical_pearls: s.clinicalPearls || []
      })),
      null,
      2
    );

    const prompt = `You are a senior medical educator. I have an existing clinical examination protocol for '${exam.name}' (${exam.system} system).
      The user wants to refine or add more detail to it based on this request: "${refinementPrompt}".
      
      CURRENT PROTOCOL STEPS:
      ${currentStepsJson}
      
      TASK:
      1. Review the current steps.
      2. Apply the requested refinements.
      3. If the user asks for more detail in a specific section, expand that section significantly with high-yield clinical information, specific maneuvers, and detailed pathophysiology.
      4. CRITICAL: Do NOT remove any existing steps from the protocol unless the user explicitly requests their removal. The final output must be a complete, comprehensive, and ready-to-use protocol that preserves the integrity of the original examination while adding the requested improvements.
      5. Return the ENTIRE updated protocol in the following JSON format:
      {
        "reference_standard": "e.g., Talley and O'Connor, Macleod's",
        "modules": [
          {
            "step_title": "Name of the step",
            "explanation": "Detailed explanation of how to perform the step",
            "findings": {
              "positive": ["List of positive findings"],
              "negative": ["List of normal/negative findings"]
            },
            "pathophysiology": [
              { "finding": "Name of finding", "mechanism": "Detailed pathophysiological mechanism" }
            ],
            "clinical_pearls": ["List of clinical pearls"]
          }
        ],
        "differentialDiagnoses": [{"condition": "...", "reasoning": "...", "findings": ["..."]}],
        "sources": [{"title": "...", "uri": "..."}]
      }
      
      Ensure the output is medically accurate, collegiate level, and directly addresses the user's refinement request.`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: this.MEDICAL_SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }]
      }
    });

    const data = JSON.parse(this.cleanJson(response.text || '{}'));

    const groundingSources =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk) => ({
          title: chunk.web?.title || 'Source',
          uri: chunk.web?.uri || ''
        }))
        .filter((s): s is { title: string; uri: string } => !!s.uri) || [];

    const mappedSteps: ExamStep[] = ((data.modules as RawModule[]) || []).map((mod, index) => ({
      id: `step_${index}`,
      title: mod.step_title || '',
      description: mod.explanation || '',
      category: 'Examination',
      positiveFindings: (mod.findings?.positive || []).map((f: string) => ({ description: f })),
      negativeFindings: mod.findings?.negative || [],
      pathophysiology: mod.pathophysiology || [],
      clinicalPearls: mod.clinical_pearls || [],
      mediaPlaceholders: mod.media_placeholders || []
    }));

    return {
      steps: mappedSteps,
      referenceStandard: data.reference_standard || exam.referenceStandard,
      differentialDiagnoses: Array.isArray(data.differentialDiagnoses)
        ? data.differentialDiagnoses
        : exam.differentialDiagnoses,
      sources: [...(Array.isArray(data.sources) ? data.sources : []), ...groundingSources]
    };
  }

  async getDifferentialDiagnosis(
    findings: string[],
    system: string
  ): Promise<DiagnosisSuggestion[]> {
    const prompt = `Differential diagnosis for: [${findings.join(', ')}] in ${system}. Return as JSON array of objects with fields: condition, likelihood, reasoning.`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    const data = JSON.parse(this.cleanJson(response.text || '[]'));
    return Array.isArray(data) ? data : [];
  }

  async generateECGPattern(patternName: string): Promise<ECGPattern> {
    // 1. BM25 offline search over cached ECG patterns
    try {
      const localHit = await searchECGPattern(patternName);
      if (localHit) {
        console.log(`[offline-first] BM25 ECG pattern hit for: ${patternName}`);
        return localHit;
      }
    } catch (e) {
      console.warn('BM25 ECG search failed:', e);
    }

    // 2. Gemini API fallback
    const prompt = `Generate a detailed clinical ECG pattern profile for '${patternName}'.
      Include diagnostic criteria, clinical significance, and management steps.
      Search for a high-quality 12-lead ECG trace image URL (e.g. from Life in the Fast Lane or similar reputable sources).
      
      Return as JSON:
      {
        "name": "...",
        "category": "Ischemia | Arrhythmia | Conduction | Metabolic | Other",
        "description": "...",
        "criteria": ["..."],
        "clinicalSignificance": "...",
        "management": ["..."],
        "imageUrl": "..."
      }`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: this.MEDICAL_SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }]
      }
    });

    const raw = JSON.parse(this.cleanJson(response.text || '{}'));

    // Extract image from grounding if not provided in JSON or to verify
    if (!raw.imageUrl) {
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const imageSource = chunks?.find(
        (c) =>
          c.web?.uri?.toLowerCase().includes('.jpg') ||
          c.web?.uri?.toLowerCase().includes('.png') ||
          c.web?.uri?.toLowerCase().includes('litfl')
      );
      if (imageSource) raw.imageUrl = imageSource.web?.uri;
    }

    const pattern: ECGPattern = {
      id: raw.id || patternName.toLowerCase().replace(/\s+/g, '-'),
      name: raw.name || patternName,
      category: raw.category || 'Other',
      description: raw.description || '',
      criteria: Array.isArray(raw.criteria) ? raw.criteria : [],
      clinicalSignificance: raw.clinicalSignificance || '',
      management: Array.isArray(raw.management) ? raw.management : [],
      imageUrl: raw.imageUrl
    };

    // 3. Cache result for future offline use
    try {
      await storage.saveECGPattern(pattern);
    } catch (e) {
      console.warn('Failed to cache ECG pattern:', e);
    }

    return pattern;
  }

  async generateRadiologyFinding(findingName: string): Promise<Partial<RadiologyFinding>> {
    // 1. BM25 offline search over cached radiology findings
    try {
      const localHit = await searchRadiologyFinding(findingName);
      if (localHit) {
        console.log(`[offline-first] BM25 radiology hit for: ${findingName}`);
        return localHit;
      }
    } catch (e) {
      console.warn('BM25 radiology search failed:', e);
    }

    // 2. Gemini API fallback
    const prompt = `Generate a detailed clinical radiology finding profile for '${findingName}'.
      Include modality (CXR, AXR, CT, MRI, US), key signs, clinical significance, and management.
      Search for a real-world clinical image URL from Radiopaedia or similar reputable medical imaging repositories.
      
      Return as JSON:
      {
        "name": "...",
        "modality": "CXR | AXR | CT | MRI | US",
        "category": "Chest | Abdomen | Neuro | MSK | Other",
        "description": "...",
        "keySigns": ["..."],
        "clinicalSignificance": "...",
        "management": ["..."],
        "imageUrl": "..."
      }`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: this.MEDICAL_SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }]
      }
    });

    const data = JSON.parse(this.cleanJson(response.text || '{}'));

    // Extract image from grounding if not provided in JSON or to verify
    if (!data.imageUrl) {
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const imageSource = chunks?.find(
        (c) =>
          c.web?.uri?.toLowerCase().includes('radiopaedia.org') ||
          c.web?.uri?.toLowerCase().includes('.jpg') ||
          c.web?.uri?.toLowerCase().includes('.png')
      );
      if (imageSource) data.imageUrl = imageSource.web?.uri;
    }

    // 3. Cache result for future offline use
    if (data.id && data.name && data.keySigns) {
      try {
        await storage.saveRadiologyFinding(data as RadiologyFinding);
      } catch (e) {
        console.warn('Failed to cache radiology finding:', e);
      }
    }

    return data;
  }

  async generateDesignAdvice(
    userPrompt: string,
    currentTheme: AppTheme
  ): Promise<{ advice: string; theme?: Partial<AppTheme> }> {
    const prompt = `You are a world-class UI/UX designer specialized in medical software.
      The user wants to update the app's look or layout based on this request: "${userPrompt}".
      
      CURRENT THEME:
      ${JSON.stringify(currentTheme, null, 2)}
      
      TASK:
      1. Provide professional design advice on how to achieve the requested look.
      2. If appropriate, suggest specific updates to the app's theme configuration (colors, border radius, glass effects).
      3. Return a JSON object with:
         - "advice": A clear, concise explanation of your design choices.
         - "theme": (Optional) An object containing the updated theme properties.
      
      THEME SCHEMA:
      {
        "primaryColor": "hex code",
        "secondaryColor": "hex code",
        "accentColor": "hex code",
        "borderRadius": "none | sm | md | lg | xl | 2xl | full",
        "fontSans": "font family name",
        "glassEffect": "none | low | medium | high"
      }`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are a master of Tailwind CSS and modern UI design.'
      }
    });

    return JSON.parse(this.cleanJson(response.text || '{}'));
  }

  async suggestExaminationsForSymptoms(symptoms: string): Promise<{
    suggestedExams: { id: string; name: string; reason: string }[];
    explanation: string;
  }> {
    const prompt = `A user has inputted the following symptoms: "${symptoms}".
    
    Based on these symptoms, suggest which physical examinations (from standard clinical practice) should be considered.
    Return the response as a JSON object with this exact structure:
    {
      "explanation": "A short clinical reasoning summary explaining why these exams are appropriate.",
      "suggestedExams": [
        {
          "id": "e.g., cvs-exam, resp-exam, gi-exam, neuro-upper, etc.",
          "name": "Name of the examination",
          "reason": "Specific reason for performing this exam based on the symptoms"
        }
      ]
    }`;

    try {
      const response = await this.generateContentWithRetry({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: this.MEDICAL_SYSTEM_INSTRUCTION
        }
      });
      const data = JSON.parse(this.cleanJson(response.text || '{}'));
      return {
        suggestedExams: data.suggestedExams || [],
        explanation: data.explanation || 'No explanation provided.'
      };
    } catch (error) {
      console.error('Error generating symptom checker suggestions:', error);
      throw new Error('Failed to analyze symptoms.', { cause: error });
    }
  }

  async getFindingsForCondition(conditionName: string): Promise<ClinicalCondition> {
    // 1. BM25 offline search over ALL_EXAMINATIONS
    try {
      const localHit = searchExaminationAsCondition(conditionName);
      if (localHit) {
        console.log(`[offline-first] BM25 examination hit for: ${conditionName}`);
        return localHit;
      }
    } catch (e) {
      console.warn('BM25 examination search failed:', e);
    }

    // 2. Gemini API fallback
    const prompt = `Physical exam findings for '${conditionName}'. 
      If this is a dermatological condition, prioritize terminology and descriptions consistent with DermNet NZ (dermnetnz.org).
      Return as JSON with fields: name, description, findings[{category, sign, significance, link}].`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    const data = JSON.parse(this.cleanJson(response.text || '{}'));
    return {
      ...data,
      findings: Array.isArray(data.findings) ? data.findings : []
    };
  }

  async getInvestigationsForCondition(conditionName: string): Promise<ConditionInvestigation> {
    const prompt = `Diagnostic investigations for '${conditionName}'. Categorize into first-line/bedside, gold standard/definitive, and monitoring. Provide a brief clinical reasoning for this strategy. Return as JSON with fields: condition, reasoning, firstLine[], goldStandard[], monitoring[].`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });
    const data = JSON.parse(this.cleanJson(response.text || '{}'));
    return {
      ...data,
      firstLine: Array.isArray(data.firstLine) ? data.firstLine : [],
      goldStandard: Array.isArray(data.goldStandard) ? data.goldStandard : [],
      monitoring: Array.isArray(data.monitoring) ? data.monitoring : []
    };
  }

  async synthesizeDifferentials(
    findings: string[],
    context?: PatientContext,
    isPro: boolean = false,
    forceRefresh: boolean = false,
    clarifyingResponses?: ClarifyingResponse[]
  ): Promise<DifferentialSynthesis> {
    const findingsId = [...findings].sort().join('|');
    const contextId = context ? JSON.stringify(context) : 'no-context';
    const responseId = clarifyingResponses ? JSON.stringify(clarifyingResponses) : 'no-responses';
    const cacheId = `synthesis_${findingsId}_${contextId}_${responseId}`;

    if (!forceRefresh) {
      try {
        const cached = await storage.getSynthesis(cacheId);
        if (cached) return cached;
      } catch (e) {
        console.warn('Synthesis cache check failed:', e);
      }
    }

    const contextStr = context
      ? `
      Patient Context:
      - Age: ${context.age || 'Unknown'}
      - Height/Weight: ${context.height || 'Unknown'} / ${context.weight || 'Unknown'}
      - Ethnicity: ${context.ethnicity || 'Unknown'}
      - PMHx: ${context.pmhx || 'None provided'}
      - Smoker: ${context.smoker ? 'Yes' : 'No'}
      - Alcohol: ${context.alcohol || 'Unknown'}
      - Other Drugs: ${context.otherDrugs || 'Unknown'}
      - Recent Presentations: ${context.recentPresentations || 'None'}
    `
      : '';

    const responsesStr =
      clarifyingResponses && clarifyingResponses.length > 0
        ? `
      Additional Clarifying Information Provided:
      ${clarifyingResponses.map((r) => `- Question ID ${r.questionId}: ${r.response}`).join('\n')}
    `
        : '';

    const prompt = `You are a Senior Consultant Physician and Clinical Diagnostician. 
      Synthesize a comprehensive differential diagnosis list based on these clinical findings: [${findings.join(', ')}]. 
      ${contextStr}
      ${responsesStr}
      
      CRITICAL REGIONAL CONTEXT: The patient is in Tropical North Queensland (TNQ). Consider regional endemic diseases ONLY where relevant (e.g., Melioidosis, Dengue, Scrub Typhus, Leptospirosis, Q Fever, Irukandji syndrome, etc.). 
      NOTE: Avoid "diagnostic laziness" with Melioidosis. It is a great mimic but should primarily be considered in patients with appropriate risk factors (DM, heavy ETOH, CKD) or presentations (severe sepsis, necrotizing pneumonia, deep-seated abscesses). Do not include it as a generic mimic for low-acuity presentations.
      
      ANTIMICROBIAL STEWARDSHIP: Ensure that differentials do not lead to unnecessary "just in case" broad-spectrum coverage unless clinically justified by the severity of the presentation.
      
      For each differential:
      1. Provide a specific likelihood/confidence interval based on clinical prevalence.
      2. Explain the reasoning clearly.
      3. List supporting findings (from the input or expected).
      4. List conflicting/refuting findings.
      5. Provide a list of "Differentiation Questions" (History/Exam) to narrow the diagnosis.
      6. Provide a list of "Investigations" (Bedside, Labs, Imaging).
      
      Limit to the top 5 most likely differentials plus any "Must-Not-Miss" critical conditions.
      
      Return the response as a valid JSON object with the following structure:
      {
        "summary": "A concise clinical summary of the presentation and diagnostic challenge.",
        "tnqContext": "Detailed regional considerations specific to this presentation in North Queensland.",
        "differentials": [
          {
            "condition": "Condition Name",
            "likelihood": "e.g., 60% (Moderate)",
            "isCritical": true/false,
            "reasoning": "Detailed clinical reasoning.",
            "supportingFindings": ["finding 1", "finding 2"],
            "conflictingFindings": ["finding 1"],
            "differentiationQuestions": ["question 1", "question 2"],
            "investigations": ["investigation 1", "investigation 2"],
            "scientificReference": "Optional reference"
          }
        ]
      }`;

    try {
      const response = await this.generateContentWithRetry({
        model: isPro ? 'gemini-3.1-pro-preview' : 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction:
            'You are an elite medical diagnostic engine specializing in complex undifferentiated presentations and tropical medicine.'
        }
      });

      const text = response.text;
      if (!text) throw new Error('Empty response from AI');

      const data = JSON.parse(this.cleanJson(text));
      const synthesis: DifferentialSynthesis = {
        summary: data.summary || 'No summary provided.',
        tnqContext:
          data.tnqContext || 'No specific regional context identified for this presentation.',
        differentials: Array.isArray(data.differentials) ? data.differentials : [],
        retrievedAt: Date.now()
      };

      // Save to cache
      try {
        await storage.saveSynthesis(cacheId, synthesis);
      } catch (e) {
        console.warn('Failed to save synthesis to cache:', e);
      }

      return synthesis;
    } catch (error) {
      console.error('Synthesis failed:', error);
      throw error;
    }
  }

  async getClarifyingQuestions(
    findings: string[],
    differentials: string[],
    context?: PatientContext
  ): Promise<ClarifyingQuestion[]> {
    const contextStr = context
      ? `
      Patient Context:
      - Age: ${context.age || 'Unknown'}
      - PMHx: ${context.pmhx || 'None provided'}
    `
      : '';

    const prompt = `You are a Senior Consultant Physician. Based on the following findings: [${findings.join(', ')}] and the current top differentials: [${differentials.join(', ')}], generate 3-5 high-yield clarifying questions (history or physical exam) that would most effectively differentiate between these conditions.
      ${contextStr}
      
      For each question, provide:
      1. A unique ID.
      2. The question text.
      3. The type (boolean, text, or choice).
      4. Options if it's a choice type.
      5. A brief rationale explaining how this question helps narrow the differential.
      
      Return as a JSON array of objects with fields: id, question, type, options, rationale.`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const data = JSON.parse(this.cleanJson(response.text || '[]'));
    return Array.isArray(data) ? data : [];
  }

  async getInvestigationDetails(testName: string, context?: string): Promise<InvestigationDetail> {
    const prompt = `Provide a thorough medical explanation for the diagnostic test/investigation: '${testName}'${context ? ` in the context of ${context}` : ''}. 
      Include:
      1. Technique: How the test is performed.
      2. Findings: What constitutes normal vs. abnormal results.
      3. Interpretation: Clinical significance of findings.
      Return as JSON with fields: testName, technique, findings, interpretation, clinicalContext.`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const data = JSON.parse(this.cleanJson(response.text || '{}'));
    return {
      testName: data.testName || testName,
      technique: data.technique || 'Information not available.',
      findings: data.findings || 'Information not available.',
      interpretation: data.interpretation || 'Information not available.',
      clinicalContext: data.clinicalContext || context
    };
  }

  async getTherapeuticGuidance(
    condition: string,
    forceRefresh: boolean = false,
    referenceUrl?: string
  ): Promise<TherapeuticGuidance> {
    // 1. Check IndexedDB exact-match cache
    if (!forceRefresh) {
      try {
        const cached = await storage.getProtocol(condition);
        if (cached) {
          console.log(`[offline-first] Exact protocol cache hit for: ${condition}`);
          return cached;
        }
      } catch (e) {
        console.warn('Failed to check protocol cache:', e);
      }
    }

    // 2. BM25 offline search over cached protocols + graph nodes
    if (!forceRefresh) {
      try {
        const localHit = await searchTherapeuticGuidance(condition);
        if (localHit) {
          console.log(`[offline-first] BM25 therapeutic guidance hit for: ${condition}`);
          return localHit;
        }
      } catch (e) {
        console.warn('BM25 therapeutic guidance search failed:', e);
      }
    }

    // Special handling for ACS if the user provided a link
    const acsPathway =
      'https://www.health.qld.gov.au/__data/assets/pdf_file/0029/1491707/suspected-acute-coronary-syndrome-clinical-pathway.pdf';
    const isAcs =
      condition.toLowerCase().includes('acs') ||
      condition.toLowerCase().includes('acute coronary syndrome');
    const effectiveReferenceUrl = referenceUrl || (isAcs ? acsPathway : undefined);

    const contextStr = effectiveReferenceUrl
      ? `
      CRITICAL REFERENCE: Use the following official clinical pathway as the primary source of truth for this synthesis: ${effectiveReferenceUrl}. 
      Ensure all management steps, risk stratification, and investigations align with this specific document.
    `
      : '';

    const prompt = `Provide the most up-to-date therapeutic guidelines for: '${condition}'. 
      
      ${contextStr}
      
      CRITICAL REGIONAL CONTEXT: The patient is in Tropical North Queensland (TNQ). Prioritize Queensland Health (CHRISP), eTG (Therapeutic Guidelines Australia), and local TNQ hospital protocols (e.g., Cairns Hospital).
      
      Include:
      1. A concise summary of the current management strategy.
      2. First-line treatments (including dosages where relevant).
      3. Second-line or alternative options.
      4. Monitoring and follow-up requirements.
      5. Specific TNQ considerations (e.g., specific protocols for endemic diseases like Melioidosis, but only if relevant to the presentation).
      6. ANTIMICROBIAL STEWARDSHIP: Explicitly mention stewardship considerations if recommending restricted or ultra-broad-spectrum antibiotics (e.g., Meropenem).
      
      You MUST use Google Search to find the most recent versions of these guidelines.
      
      Return as JSON with fields: 
      condition: string,
      summary: string,
      firstLine: string[],
      secondLine: string[],
      monitoring: string[],
      tnqSpecifics: string,
      sources: [{title: string, uri: string}] (Include direct links to the source documents or pages).`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }, ...(effectiveReferenceUrl ? [{ urlContext: {} }] : [])],
        systemInstruction:
          'You are a senior clinical pharmacist and consultant physician specializing in Australian and Tropical North Queensland therapeutic protocols.'
      }
    });

    const text = response.text;
    if (!text) throw new Error('Empty response from AI');

    const data = JSON.parse(this.cleanJson(text));

    // Extract grounding sources if available
    const groundingSources =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk) => ({
          title: chunk.web?.title || 'Source',
          uri: chunk.web?.uri || ''
        }))
        .filter((s): s is { title: string; uri: string } => !!s.uri) || [];

    const guidance: TherapeuticGuidance = {
      condition: data.condition || condition,
      summary: data.summary || 'No summary provided.',
      firstLine: Array.isArray(data.firstLine) ? data.firstLine : [],
      secondLine: Array.isArray(data.secondLine) ? data.secondLine : [],
      monitoring: Array.isArray(data.monitoring) ? data.monitoring : [],
      tnqSpecifics: data.tnqSpecifics || 'No specific regional considerations identified.',
      sources: [...(Array.isArray(data.sources) ? data.sources : []), ...groundingSources],
      retrievedAt: Date.now(),
      referenceUrl: effectiveReferenceUrl
    };

    // Persist to local storage
    try {
      await storage.saveProtocol(guidance);
    } catch (e) {
      console.warn('Failed to save protocol to cache:', e);
    }

    return guidance;
  }

  async getAntibioticInfo(name: string): Promise<AntibioticInfo> {
    // 1. Check exact-match IndexedDB cache
    try {
      const cached = await storage.getAntibiotic(name);
      if (cached) return cached;
    } catch (e) {
      console.warn('Antibiotic cache check failed:', e);
    }

    // 2. BM25 offline search (alias resolution + fuzzy name match)
    try {
      const localHit = await searchAntibiotic(name);
      if (localHit) {
        console.log(`[offline-first] BM25 antibiotic hit for: ${name}`);
        return localHit;
      }
    } catch (e) {
      console.warn('BM25 antibiotic search failed:', e);
    }

    const prompt = `Provide detailed educational information for the antibiotic: '${name}'. 
      Focus on helping junior doctors understand its spectrum and properties.
      
      Include:
      1. Antibiotic class.
      2. Mechanism: Is it Bactericidal or Bacteriostatic?
      3. Spectrum of activity.
      4. Specific Gram-positive, Gram-negative, Atypical, and Anaerobic coverage.
      5. Common clinical indications.
      6. ANTIMICROBIAL STEWARDSHIP: Include a "Stewardship Note" (e.g., "Restricted", "Pharmacy Approval Required", or "Narrow-spectrum alternative preferred") if applicable.
      
      Return as JSON with fields: 
      name: string,
      class: string,
      mechanism: 'Bactericidal' | 'Bacteriostatic',
      spectrum: string,
      gramPositiveCoverage: string,
      gramNegativeCoverage: string,
      atypicalCoverage: string,
      anaerobicCoverage: string,
      commonIndications: string[],
      stewardshipNote: string (Optional stewardship guidance)`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const data = JSON.parse(this.cleanJson(response.text || '{}'));
    const info: AntibioticInfo = {
      name: data.name || name,
      class: data.class || 'Unknown',
      mechanism: data.mechanism || 'Bactericidal',
      spectrum: data.spectrum || 'Unknown',
      gramPositiveCoverage: data.gramPositiveCoverage || 'None',
      gramNegativeCoverage: data.gramNegativeCoverage || 'None',
      atypicalCoverage: data.atypicalCoverage || 'None',
      anaerobicCoverage: data.anaerobicCoverage || 'None',
      commonIndications: Array.isArray(data.commonIndications) ? data.commonIndications : [],
      stewardshipNote: data.stewardshipNote,
      retrievedAt: Date.now()
    };

    // Save to cache
    try {
      await storage.saveAntibiotic(info);
    } catch (e) {
      console.warn('Failed to save antibiotic to cache:', e);
    }

    return info;
  }

  async getPathogenInfo(name: string): Promise<PathogenInfo> {
    // 1. Check exact-match IndexedDB cache
    try {
      const cached = await storage.getPathogen(name);
      if (cached) return cached;
    } catch (e) {
      console.warn('Pathogen cache check failed:', e);
    }

    // 2. BM25 offline search
    try {
      const localHit = await searchPathogen(name);
      if (localHit) {
        console.log(`[offline-first] BM25 pathogen hit for: ${name}`);
        return localHit;
      }
    } catch (e) {
      console.warn('BM25 pathogen search failed:', e);
    }

    const prompt = `Provide educational information for the pathogen or pathogen group: '${name}'. 
      
      If '${name}' refers to a specific organism (e.g., S. aureus):
      1. Provide its classification (e.g., Gram Positive Cocci).
      2. Key characteristics (e.g., aerobic, clusters).
      3. Common infections.
      4. Typical antibiotics.
      
      If '${name}' refers to a morphology or group (e.g., Gram Positive Cocci, Gram Negative Bacilli, Spirochetes):
      1. Provide a general description of the group.
      2. List common species/organisms belonging to this group in the 'relatedOrganisms' field.
      3. Provide general characteristics of the group.
      4. Common infections associated with the group.
      5. Typical empiric antibiotics.
      
      Return as JSON with fields: 
      name: string,
      classification: string,
      characteristics: string,
      commonInfections: string[],
      typicalAntibiotics: string[],
      relatedOrganisms: string[] (empty if specific organism)`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            classification: { type: Type.STRING },
            characteristics: { type: Type.STRING },
            commonInfections: { type: Type.ARRAY, items: { type: Type.STRING } },
            typicalAntibiotics: { type: Type.ARRAY, items: { type: Type.STRING } },
            relatedOrganisms: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: [
            'name',
            'classification',
            'characteristics',
            'commonInfections',
            'typicalAntibiotics'
          ]
        }
      }
    });

    const data = JSON.parse(this.cleanJson(response.text || '{}'));
    const info: PathogenInfo = {
      name: data.name || name,
      classification: data.classification || 'Unknown',
      characteristics: data.characteristics || 'Unknown',
      commonInfections: Array.isArray(data.commonInfections) ? data.commonInfections : [],
      typicalAntibiotics: Array.isArray(data.typicalAntibiotics) ? data.typicalAntibiotics : [],
      relatedOrganisms: Array.isArray(data.relatedOrganisms) ? data.relatedOrganisms : [],
      retrievedAt: Date.now()
    };

    // Save to cache
    try {
      await storage.savePathogen(info);
    } catch (e) {
      console.warn('Failed to save pathogen to cache:', e);
    }

    return info;
  }

  async checkMedicationInteractions(medications: string[]): Promise<InteractionResult | null> {
    if (!medications || medications.length === 0) return null;

    const prompt = `Analyze the following list of medications for interactions, synergisms, and contraindications:
      [${medications.join(', ')}]
      
      Focus on clinical relevance for junior doctors. Pay special attention to well-known combinations (e.g., "Triple Whammy" of NSAID + ACEi + Diuretic, or hypokalemia risk with PPI + Diuretic).
      
      You MUST return ONLY a valid JSON object with the following exact structure. Do not include any markdown formatting, code blocks, or explanations outside the JSON object.
      {
        "medications": ["med1", "med2", "med3"],
        "summary": "A brief clinical summary of the combination.",
        "interactions": [
          {
            "severity": "high",
            "drugs": ["med1", "med2"],
            "description": "What happens",
            "mechanism": "Why it happens",
            "management": "How to manage it"
          }
        ],
        "synergisms": [
          {
            "drugs": ["med1", "med2"],
            "description": "Beneficial or additive effects"
          }
        ],
        "contraindications": [
          {
            "drugs": ["med1", "med2"],
            "reason": "Why they should absolutely not be used together"
          }
        ]
      }
      
      Note: severity must be one of "high", "moderate", or "low".`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const data = JSON.parse(this.cleanJson(response.text || '{}'));
    return {
      medications: Array.isArray(data.medications) ? data.medications : medications,
      summary: data.summary || 'No summary provided.',
      interactions: Array.isArray(data.interactions) ? data.interactions : [],
      synergisms: Array.isArray(data.synergisms) ? data.synergisms : [],
      contraindications: Array.isArray(data.contraindications) ? data.contraindications : []
    };
  }

  async generateMCQs(
    topic: string,
    count: number = 5,
    difficulty: string = 'Medium'
  ): Promise<MCQQuestion[]> {
    const prompt = `Generate ${count} high-quality multiple-choice questions (MCQs) for a senior medical trainee (Anaesthesia/Rural Generalist) on the topic: "${topic}". 
      Difficulty level: ${difficulty}.
      
      Focus on:
      - Applied physiology and pharmacology relevant to anaesthesia.
      - Clinical decision making in acute/critical care.
      - Equipment and monitoring.
      - Regional anaesthesia and pain management.
      
      Return as a JSON array of objects with fields: id, question, options[], correctOptionIndex, explanation, category, difficulty, tags[].
      Ensure the explanations are detailed and evidence-based.`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction:
          'You are an expert medical examiner for the RGA and ANZCA anaesthesia examinations.'
      }
    });

    const data = JSON.parse(this.cleanJson(response.text || '[]'));
    return Array.isArray(data) ? data : [];
  }

  async generateAnaesthesiaDrug(drugName: string): Promise<AnaesthesiaDrug> {
    const prompt = `Generate a detailed clinical profile for the anaesthetic drug: '${drugName}'.
      Include precise pharmacology, dosing, and clinical pearls relevant to senior anaesthesia trainees.
      
      Return as JSON with fields:
      {
        "name": "...",
        "class": "...",
        "indications": ["..."],
        "dose": "...",
        "mechanism": "...",
        "sideEffects": ["..."],
        "contraindications": ["..."],
        "pearls": ["..."],
        "category": "induction | relaxants | emergency | analgesics | local_anaesthetics | antiemetics | reversal | other"
      }`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are an expert clinical pharmacologist and senior anaesthetist.'
      }
    });

    return JSON.parse(this.cleanJson(response.text || '{}'));
  }

  async getDrugInfo(drugName: string, forceRefresh: boolean = false): Promise<DrugInfo> {
    // Fetch from Gemini
    const prompt = `Provide 100% accurate clinical pharmacology information for: '${drugName}'. 
      
      CRITICAL REGIONAL CONTEXT: You are operating in Tropical North Queensland (TNQ). You MUST prioritize and integrate:
      - Queensland Health (CHRISP) guidelines.
      - local hospital protocols (Cairns Hospital, Townsville University Hospital).
      - Australian Medicines Handbook (AMH) as the overarching clinical standard.

      Include Pharmacokinetics, Pharmacodynamics, Mechanism of Action, Indications, Contraindications, Adverse Effects, and detailed Dosages (Adult and Paediatric).
      For dosages, provide a list of specific indications and their corresponding doses (Adult/Paediatric), explicitly categorizing by use-case.
      Return details for different uses. Example: Heparin (Prophylaxis vs Therapeutic vs Intra-op).
      
      Return as JSON:
      {
        "id": "slug-of-drug-name",
        "name": "Generic Name",
        "tradeNames": ["Trade1", "Trade2"],
        "therapeuticClass": "Class Name",
        "pharmacokinetics": "Detailed summary",
        "pharmacodynamics": "Detailed summary",
        "mechanismOfAction": "Detailed summary",
        "indications": ["Indication1", "Indication2"],
        "contraindications": ["CI1", "CI2"],
        "adverseEffects": ["AE1", "AE2"],
        "dosages": [
          {
            "indication": "Specific condition",
            "adultDose": "Exact dose",
            "paediatricDose": "Exact dose or mg/kg",
            "route": "IV/PO/SC",
            "frequency": "BD/TDS/Stat",
            "notes": "Optional notes from QLD Health/AMH"
          }
        ],
        "paediatricDosages": "Summary of mg/kg dosing and special paediatric considerations"
      }`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: this.MEDICAL_SYSTEM_INSTRUCTION
      }
    });

    const rawData = JSON.parse(this.cleanJson(response.text || '{}'));
    const drugInfo: DrugInfo = {
      id: rawData.id || drugName.toLowerCase().replace(/\s+/g, '-'),
      name: rawData.name || drugName,
      tradeNames: Array.isArray(rawData.tradeNames) ? rawData.tradeNames : [],
      therapeuticClass: rawData.therapeuticClass || 'Unknown',
      pharmacokinetics: rawData.pharmacokinetics || '',
      pharmacodynamics: rawData.pharmacodynamics || '',
      mechanismOfAction: rawData.mechanismOfAction || '',
      indications: Array.isArray(rawData.indications) ? rawData.indications : [],
      contraindications: Array.isArray(rawData.contraindications) ? rawData.contraindications : [],
      adverseEffects: Array.isArray(rawData.adverseEffects) ? rawData.adverseEffects : [],
      dosages: Array.isArray(rawData.dosages) ? rawData.dosages : [],
      paediatricDosages: rawData.paediatricDosages || '',
      retrievedAt: Date.now()
    };

    return drugInfo;
  }

  async getDrugsForCondition(conditionName: string): Promise<DrugMapping[]> {
    const prompt = `Identify first-line, second-line, and alternative medications for: '${conditionName}'. 
      
      CRITICAL REGIONAL CONTEXT: You are operating in Tropical North Queensland (TNQ). You MUST prioritize and integrate:
      - Queensland Health (CHRISP) guidelines.
      - local hospital protocols (Cairns Hospital, Townsville University Hospital).
      
      Return as JSON array of objects:
      [
        {
          "drug_name": "Generic Name",
          "line_of_treatment": "1st line" | "2nd line" | "Alternative",
          "note": "Brief clinical reasoning (citing QLD Health protocols where applicable)"
        }
      ]`;

    const response = await this.generateContentWithRetry({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: this.MEDICAL_SYSTEM_INSTRUCTION
      }
    });

    const rawMappings = JSON.parse(this.cleanJson(response.text || '[]'));
    const drugMappings: DrugMapping[] = [];

    if (!Array.isArray(rawMappings)) return [];

    const conditionId = conditionName.toLowerCase().replace(/\s+/g, '-');

    for (const raw of rawMappings) {
      // Get basic drug info to ensure we have a record
      try {
        const drugInfo = await this.getDrugInfo(raw.drug_name);
        const mapping: DrugMapping = {
          condition_id: conditionId,
          drug_id: drugInfo.id,
          drug_name: drugInfo.name,
          therapeutic_class: drugInfo.therapeuticClass,
          line_of_treatment: raw.line_of_treatment,
          note: raw.note
        };
        drugMappings.push(mapping);
      } catch (e) {
        console.warn(`Failed to process drug mapping for ${raw.drug_name}:`, e);
      }
    }

    return drugMappings;
  }
}

export const geminiService = new GeminiService();
