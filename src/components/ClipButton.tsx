import { useState } from 'react';
import type { Clip } from '../types/clip';
import { useClips } from '../contexts/ClipsContext';
import '../styles/ClipButton.css';

interface ClipButtonProps {
  clip: Clip;
}

/**
 * ClipButton
 * クリップを再生するボタンコンポーネント
 */
export function ClipButton({ clip }: ClipButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const { basePath } = useClips();

  // 音声ファイルのパスを構築
  const soundPath = `${basePath}/sounds/${clip.sound}`;

  /**
   * 再生ボタンをクリックした時の処理
   */
  const handlePlay = () => {
    const audio = new Audio(soundPath);
    
    setIsPlaying(true);
    audio.play().catch(error => {
      console.error('再生エラー:', error);
    });

    // 再生終了時に状態を更新
    audio.onended = () => {
      setIsPlaying(false);
    };

    // エラー時も状態をリセット
    audio.onerror = () => {
      setIsPlaying(false);
    };
  };

  return (
    <div className="clip-button-container">
      <button
        className={`clip-button ${isPlaying ? 'playing' : ''}`}
        onClick={handlePlay}
        disabled={isPlaying}
        title={clip.ruby}
      >
        <span className="play-icon">▶</span>
        <span className="clip-text">{clip.text}</span>
      </button>
      <div className="clip-tags">
        {clip.tags.map(tag => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
