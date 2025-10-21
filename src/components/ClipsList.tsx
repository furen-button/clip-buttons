import { useEffect, useState } from 'react';
import type { Clip } from '../types/clip';
import { useClips } from '../contexts/ClipsContext';
import { ClipButton } from './ClipButton';
import { TagFilter } from './TagFilter';
import '../styles/ClipsList.css';

/**
 * ClipsList
 * クリップのリストとタグフィルタを表示するコンポーネント
 */
export function ClipsList() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
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

  /**
   * 利用可能なすべてのタグを抽出
   */
  const allTags = Array.from(
    new Set(clips.flatMap(clip => clip.tags))
  ).sort();

  /**
   * タグがクリックされた時の処理
   * トグル形式で選択/解除
   */
  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) {
        newSet.delete(tag);
      } else {
        newSet.add(tag);
      }
      return newSet;
    });
  };

  /**
   * タグフィルタをクリア
   */
  const handleClearTags = () => {
    setSelectedTags(new Set());
  };

  /**
   * 選択されたタグでクリップをフィルタリング
   * 選択タグが空の場合はすべてのクリップを表示
   * 選択タグがある場合は、そのいずれかを含むクリップを表示
   */
  const filteredClips = selectedTags.size === 0
    ? clips
    : clips.filter(clip =>
        clip.tags.some(tag => selectedTags.has(tag))
      );

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
    <div className="clips-container">
      <TagFilter
        tags={allTags}
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
        onClear={handleClearTags}
      />
      <div className="clips-list">
        {filteredClips.length === 0 ? (
          <div className="clips-list empty">
            選択したタグに該当するクリップがありません
          </div>
        ) : (
          <>
            <div className="clips-count">
              {filteredClips.length} / {clips.length} 件
            </div>
            {filteredClips.map((clip, index) => (
              <ClipButton key={index} clip={clip} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
