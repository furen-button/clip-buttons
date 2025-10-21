import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

/**
 * ClipsContext
 * sampleAssets のベースパスを管理するContext
 */
interface ClipsContextType {
  basePath: string;
}

const ClipsContext = createContext<ClipsContextType | undefined>(undefined);

interface ClipsProviderProps {
  children: ReactNode;
  basePath?: string;
}

/**
 * ClipsProvider
 * sampleAssets のベースパスを提供するProvider
 * @param basePath - sampleAssets のベースパス (デフォルト: '/sampleAssets')
 */
export function ClipsProvider({ children, basePath = '/sampleAssets' }: ClipsProviderProps) {
  return (
    <ClipsContext.Provider value={{ basePath }}>
      {children}
    </ClipsContext.Provider>
  );
}

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
