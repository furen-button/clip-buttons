import { useContext } from 'react';
import { ClipsContext } from '../contexts/clipsContextValue';

/**
 * useClips
 * ClipsContext を使用するカスタムHook
 */
export function useClips() {
  const context = useContext(ClipsContext);
  if (context === undefined) {
    throw new Error('useClips must be used within a ClipsProvider');
  }
  return context;
}
