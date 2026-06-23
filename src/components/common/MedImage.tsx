import React, { useState, useEffect } from 'react';
import {
  HardDrive,
  Sparkles,
  ImageOff,
  Maximize2,
  Move,
  Trash2,
  Layout,
  LayoutPanelLeft,
  LayoutPanelTop,
  Plus,
  Wand2,
  Upload,
  RefreshCw
} from 'lucide-react';
import { getLocalAssetUrl } from '../../utils/assetHelper';
import { ImageSize, ImagePosition, ImageConfig } from '../../types';

interface MedImageProps {
  src?: string;
  localId?: string;
  alt: string;
  fallbackIcon?: React.ReactNode;
  label: string;
  onEnlarge?: (src: string, alt: string) => void;
  className?: string;
  isEditMode?: boolean;
  config?: ImageConfig;
  onUpdateConfig?: (config: ImageConfig) => void;
  onDelete?: () => void;
  onUpload?: () => void;
  onGenerate?: () => void;
  onReacquire?: () => void;
}

const MedImage: React.FC<MedImageProps> = ({
  src,
  localId,
  alt,
  fallbackIcon,
  label,
  onEnlarge,
  className = '',
  isEditMode,
  config = { size: 'md', position: 'right' },
  onUpdateConfig,
  onDelete,
  onUpload,
  onGenerate,
  onReacquire
}) => {
  const [error, setError] = useState(false);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    if (localId) {
      getLocalAssetUrl(localId).then((url) => {
        if (mounted) setResolvedUrl(url);
      });
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResolvedUrl(null);
    }
    return () => {
      mounted = false;
    };
  }, [localId]);

  const activeSrc = resolvedUrl || src;

  const sizeClasses = {
    sm: 'max-w-[150px]',
    md: 'max-w-[300px]',
    lg: 'max-w-[500px]',
    full: 'w-full'
  };

  if (!activeSrc || error) {
    return (
      <div
        className={`w-full aspect-video bg-slate-950/20 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-8 text-slate-300 relative group/noimg ${className}`}
      >
        <div className="mb-3 opacity-30 scale-150">{fallbackIcon || <ImageOff />}</div>
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
          {label} Empty
        </p>

        {isEditMode && (
          <div className="absolute inset-0 bg-slate-950/40/60 backdrop-blur-sm opacity-0 group-hover/noimg:opacity-100 transition-opacity flex items-center justify-center gap-4 rounded-3xl">
            <button
              onClick={onGenerate}
              className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-xl transition-all"
              title="AI Generate"
            >
              <Wand2 className="w-5 h-5" />
            </button>
            <button
              onClick={onUpload}
              className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-black shadow-xl transition-all"
              title="Upload Local"
            >
              <Upload className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative group/viz rounded-3xl overflow-hidden border border-white/5 shadow-inner bg-slate-950/20 transition-all duration-500 ${sizeClasses[config.size]} ${className}`}
    >
      <img
        src={activeSrc}
        alt={alt}
        className="w-full h-auto object-cover transition-transform duration-1000 group-hover/viz:scale-[1.05] cursor-zoom-in"
        onClick={() => onEnlarge?.(activeSrc, alt)}
        onError={() => setError(true)}
      />

      {/* Default Label Overlay */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-xl opacity-100 group-hover/viz:bg-black/60 transition-all pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="text-[8px] font-black text-white uppercase tracking-widest">
            {label}
          </span>
          {resolvedUrl && <HardDrive className="w-2.5 h-2.5 text-emerald-400" />}
        </div>
        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
      </div>

      {/* Edit Controls Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover/viz:opacity-100 transition-all flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2 p-2 bg-slate-950/40/90 rounded-2xl shadow-2xl backdrop-blur-xl">
            {(['sm', 'md', 'lg', 'full'] as ImageSize[]).map((s) => (
              <button
                key={s}
                onClick={() => onUpdateConfig?.({ ...config, size: s })}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${config.size === s ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-900 text-slate-400'}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 p-2 bg-slate-950/40/90 rounded-2xl shadow-2xl backdrop-blur-xl">
            <button
              onClick={() => onUpdateConfig?.({ ...config, position: 'left' })}
              className={`p-2 rounded-lg transition-all ${config.position === 'left' ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-900 text-slate-400'}`}
              title="Align Left"
            >
              <LayoutPanelLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onUpdateConfig?.({ ...config, position: 'right' })}
              className={`p-2 rounded-lg transition-all ${config.position === 'right' ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-900 text-slate-400'}`}
              title="Align Right"
            >
              <LayoutPanelLeft className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={() => onUpdateConfig?.({ ...config, position: 'top' })}
              className={`p-2 rounded-lg transition-all ${config.position === 'top' ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-900 text-slate-400'}`}
              title="Align Top (Hero)"
            >
              <LayoutPanelTop className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onUpload}
              className="p-3 bg-slate-950/40 text-white rounded-2xl hover:bg-slate-900 shadow-xl transition-all"
              title="Replace Image"
            >
              <Upload className="w-5 h-5" />
            </button>
            {onReacquire && (
              <button
                onClick={onReacquire}
                className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 shadow-xl transition-all"
                title="Re-acquire Image"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onDelete}
              className="p-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 shadow-xl transition-all"
              title="Delete Image"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedImage;
