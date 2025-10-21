import { useEffect, useState } from 'react';
import type { Clip } from '../types/clip';
import { useClips } from '../contexts/ClipsContext';
import { ClipButton } from './ClipButton';
import '../styles/ClipsList.css';

/**
 * ClipsList
 * クリップのリストを表示するコンポーネント
 */
export function ClipsList() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { basePath } = useClips();

  useEffect(() => {
    /**
     * クリップデータを取得
     */
    const fetchClips = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${basePath}/data/clips.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch clips: ${response.statusText}`);
        }
        
        const data = await response.json();
        setClips(data);
        setError(null);
      } catch (err) {
        console.error('クリップ取得エラー:', err);
        setError(err instanceof Error ? err.message : 'クリップの読み込みに失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchClips();
  }, [basePath]);

  if (loading) {
    return <div className="clips-list loading">読み込み中...</div>;
  }

  if (error) {
    return <div className="clips-list error">エラー: {error}</div>;
  }

  if (clips.length === 0) {
    return <div className="clips-list empty">クリップがありません</div>;
  }

  return (
    <div className="clips-list">
      {clips.map((clip, index) => (
        <ClipButton key={index} clip={clip} />
      ))}
    </div>
  );
}
