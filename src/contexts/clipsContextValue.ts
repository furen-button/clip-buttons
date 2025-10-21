import { createContext } from 'react';

/**
 * ClipsContextType
 * sampleAssets のベースパスを管理するContext の型定義
 */
export interface ClipsContextType {
  basePath: string;
}

/**
 * ClipsContext
 * sampleAssets のベースパスを管理するContext
 */
export const ClipsContext = createContext<ClipsContextType | undefined>(undefined);
