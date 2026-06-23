import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

import MedImage from '../common/MedImage';
import ImageModal from '../ImageModal';

interface DetailSection {
  label: string;
  content: string;
  icon?: LucideIcon;
  colorClass?: string;
  labelColorClass?: string;
}

interface ClinicalCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  headerIcon?: React.ReactNode;
  headerColorClass?: string;
  details: DetailSection[];
  gridCols?: number;
  imageUrl?: string;
  localImageUrl?: string;
}

export const ClinicalCard: React.FC<ClinicalCardProps> = ({
  title,
  subtitle,
  icon: Icon,
  headerIcon,
  headerColorClass = 'bg-slate-950/20',
  details,
  gridCols = 3,
  imageUrl,
  localImageUrl
}) => {
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  const gridClass =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }[gridCols] || 'grid-cols-1 md:grid-cols-3';

  return (
    <>
      <div className="bg-slate-900 rounded-[40px] border border-white/5 shadow-sm overflow-hidden h-full flex flex-col">
        <div
          className={`p-8 border-b border-white/5 ${headerColorClass === 'bg-slate-950/20' ? 'bg-slate-900/40' : headerColorClass} flex items-center justify-between`}
        >
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h3>
            {subtitle && (
              <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <div className="w-12 h-12 bg-slate-950 border border-white/5 rounded-2xl flex items-center justify-center shadow-sm">
            {headerIcon ? headerIcon : Icon && <Icon className="w-6 h-6 text-indigo-400" />}
          </div>
        </div>
        <div className={`p-8 grid ${gridClass} gap-8 flex-1 bg-slate-900/20`}>
          {imageUrl || localImageUrl ? (
            <div className="md:col-span-full mb-4">
              <MedImage
                src={imageUrl}
                localId={localImageUrl}
                alt={title}
                label="Clinical Reference"
                config={{ size: 'full', position: 'top' }}
                onEnlarge={(src, alt) => setEnlargedImage({ src, alt })}
              />
            </div>
          ) : null}
          {details.map((detail, idx) => (
            <div key={idx} className="space-y-4">
              <h4
                className={`text-[10px] font-black uppercase ${detail.labelColorClass || 'text-slate-400'} tracking-[0.2em] flex items-center gap-2`}
              >
                {detail.icon && <detail.icon className="w-3 h-3 text-indigo-400" />}
                {detail.label}
              </h4>
              <p
                className={`text-slate-300 font-medium leading-relaxed ${detail.colorClass || ''}`}
              >
                {detail.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {enlargedImage && (
        <ImageModal
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </>
  );
};
