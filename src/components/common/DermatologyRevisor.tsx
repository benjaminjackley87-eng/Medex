import React, { useState } from 'react';
import { Layers, ArrowLeft } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';
import { useClinicalSearch } from '../../hooks/useClinicalSearch';
import ImageModal from './ImageModal';
import { DermTerm } from './DermTerm';
import { DermatologySidebar } from './DermatologySidebar';
import { DermatologyDetails } from './DermatologyDetails';

const DERM_TERMS: DermTerm[] = [
  {
    term: 'Macule',
    definition:
      'A flat, circumscribed area of skin discoloration < 1cm in diameter, without any change in texture or thickness.'
  },
  {
    term: 'Patch',
    definition:
      'A flat, non-palpable area of skin discoloration > 1cm in diameter (essentially a large macule).'
  },
  { term: 'Papule', definition: 'A small, solid, elevated lesion < 1cm in diameter.' },
  {
    term: 'Plaque',
    definition:
      'A broad, flat-topped, elevated lesion > 1cm in diameter, often formed by the confluence of papules.'
  },
  {
    term: 'Nodule',
    definition:
      'A solid, elevated lesion > 1cm in diameter, often deeper in the dermis than a papule.'
  },
  { term: 'Vesicle', definition: 'A small, fluid-filled blister < 1cm in diameter.' },
  { term: 'Bulla', definition: 'A large, fluid-filled blister > 1cm in diameter.' },
  {
    term: 'Pustule',
    definition: 'A small, circumscribed elevation of the skin containing purulent material (pus).'
  },
  {
    term: 'Wheal',
    definition:
      'An evanescent, edematous, circumscribed elevation of the skin, often with a central pallor and erythematous rim (e.g., hives).'
  },
  {
    term: 'Scale',
    definition: 'Visible fragments of the stratum corneum as it is shed from the skin surface.'
  },
  {
    term: 'Crust',
    definition: 'Dried exudate (serum, blood, or pus) on the skin surface; "scab".'
  },
  { term: 'Erosion', definition: 'A partial loss of the epidermis that heals without scarring.' },
  {
    term: 'Ulcer',
    definition:
      'A full-thickness loss of the epidermis and at least part of the dermis; heals with scarring.'
  },
  {
    term: 'Lichenification',
    definition:
      'Thickening of the epidermis with accentuation of normal skin markings, usually due to chronic rubbing or scratching.'
  },
  { term: 'Excoriation', definition: 'A linear or punctate erosion caused by scratching.' },
  {
    term: 'Atrophy',
    definition:
      'Thinning of the epidermis, dermis, or subcutaneous fat, often resulting in a translucent or depressed appearance.'
  },
  {
    term: 'Telangiectasia',
    definition:
      'Permanent dilation of small blood vessels (capillaries, arterioles, or venules) near the skin surface.'
  },
  {
    term: 'Purpura',
    definition:
      'Discoloration of the skin or mucous membranes due to hemorrhage from small blood vessels; does not blanch on pressure.'
  }
];

const gemini = new GeminiService();

const DermatologyRevisor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<DermTerm | null>(null);
  const [illustration, setIllustration] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  const { results: filteredTerms, didYouMean } = useClinicalSearch(DERM_TERMS, searchQuery, [
    'term',
    'definition'
  ]);

  const handleSelectTerm = async (termObj: DermTerm) => {
    setSelectedTerm(termObj);
    setIllustration(null);
    setIsLoadingImage(true);

    try {
      const img = await gemini.generateIllustration(
        `Dermatological morphology: ${termObj.term}. ${termObj.definition}. Clear medical diagram style.`,
        false
      );
      setIllustration(img || null);
    } catch (error) {
      console.error('Failed to load illustration:', error);
    } finally {
      setIsLoadingImage(false);
    }
  };

  return (
    <div className="p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="p-3 rounded-2xl bg-slate-900 border border-white/5 text-slate-400 hover:bg-slate-800 hover:text-white transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-white uppercase">
                Derm Morphology Revisor
              </h1>
              <p className="text-slate-400 font-medium mt-1">
                Master the visual language of dermatology with DermNet-aligned terminology.
              </p>
            </div>
          </div>
          <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-900/40 border border-orange-400/20">
            <Layers className="w-6 h-6 text-white" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <DermatologySidebar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            didYouMean={didYouMean}
            filteredTerms={filteredTerms as DermTerm[]}
            selectedTerm={selectedTerm}
            handleSelectTerm={handleSelectTerm}
          />
          <DermatologyDetails
            selectedTerm={selectedTerm}
            isLoadingImage={isLoadingImage}
            illustration={illustration}
            setEnlargedImage={setEnlargedImage}
          />
        </div>
      </div>

      {enlargedImage && (
        <ImageModal
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </div>
  );
};

export default DermatologyRevisor;
