import { storage } from '../services/storageService';

const objectUrlCache: Map<string, string> = new Map();

export const getLocalAssetUrl = async (id: string): Promise<string | null> => {
  if (!id) return null;
  if (objectUrlCache.has(id)) return objectUrlCache.get(id)!;

  const url = await storage.getAssetUrl(id);
  if (url) {
    objectUrlCache.set(id, url);
  }
  return url;
};

export const clearAssetCache = () => {
  objectUrlCache.forEach((url) => URL.revokeObjectURL(url));
  objectUrlCache.clear();
};
