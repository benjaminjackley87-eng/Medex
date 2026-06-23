import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLocalAssetUrl, clearAssetCache } from './assetHelper';
import { storage } from '../services/storageService';

// Mock the storage service
vi.mock('../services/storageService', () => ({
  storage: {
    getAssetUrl: vi.fn()
  }
}));

describe('assetHelper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    clearAssetCache(); // ensure cache is empty
    
    // Mock URL.revokeObjectURL which is not available in node/jsdom environments by default sometimes
    if (typeof URL.revokeObjectURL === 'undefined') {
      URL.revokeObjectURL = vi.fn();
    } else {
      vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    }
  });

  describe('getLocalAssetUrl', () => {
    it('returns null if no id is provided', async () => {
      const result = await getLocalAssetUrl('');
      expect(result).toBeNull();
    });

    it('fetches URL from storage and caches it', async () => {
      const mockUrl = 'blob:http://localhost/1234';
      vi.mocked(storage.getAssetUrl).mockResolvedValueOnce(mockUrl);

      const result1 = await getLocalAssetUrl('asset-1');
      expect(result1).toBe(mockUrl);
      expect(storage.getAssetUrl).toHaveBeenCalledTimes(1);
      expect(storage.getAssetUrl).toHaveBeenCalledWith('asset-1');

      // Second call should hit the cache
      const result2 = await getLocalAssetUrl('asset-1');
      expect(result2).toBe(mockUrl);
      expect(storage.getAssetUrl).toHaveBeenCalledTimes(1); // Still 1
    });
  });

  describe('clearAssetCache', () => {
    it('clears the cache and revokes object URLs', async () => {
      const mockUrl = 'blob:http://localhost/5678';
      vi.mocked(storage.getAssetUrl).mockResolvedValueOnce(mockUrl);

      await getLocalAssetUrl('asset-2');
      
      clearAssetCache();
      
      expect(URL.revokeObjectURL).toHaveBeenCalledWith(mockUrl);

      // Next call should fetch again
      vi.mocked(storage.getAssetUrl).mockResolvedValueOnce('blob:http://localhost/9999');
      await getLocalAssetUrl('asset-2');
      expect(storage.getAssetUrl).toHaveBeenCalledTimes(2);
    });
  });
});
