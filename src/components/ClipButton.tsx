import { useState } from 'react';
import type { Clip } from '../types/clip';
import { useClips } from '../hooks/useClips';
import { InfoModal } from './InfoModal';
import '../styles/ClipButton.css';

interface ClipButtonProps {
  clip: Clip;
}

/**
 * ClipButton
 * クリップを再生するボタンコンポーネント
 * 再生ボタンと情報表示ボタンを備えています
 */
export function ClipButton({ clip }: ClipButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { basePath } = useClips();

  // 音声ファイルのパスを構築
  const soundPath = `${basePath}/sounds/${clip.sound}`;

  /**
   * 再生ボタンをクリックした時の処理
   */
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  /**
   * 情報ボタンをクリックした時の処理
   */
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsInfoOpen(true);
  };

  return (
    <>
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
        <button
          className="clip-info-btn"
          onClick={handleInfoClick}
          title="詳細情報を表示"
        >
          ℹ
        </button>
      </div>
      <InfoModal
        clip={clip}
        basePath={basePath}
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </>
  );
}
