import type { ReactNode } from 'react';
import { ClipsContext } from './clipsContextValue';

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
