import { useEffect } from 'react';
import type { Clip } from '../types/clip';
import '../styles/InfoModal.css';

interface InfoModalProps {
  clip: Clip;
  basePath: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * InfoModal
 * クリップの詳細情報を表示するモーダルコンポーネント
 */
export function InfoModal({ clip, basePath, isOpen, onClose }: InfoModalProps) {
  // ESCキーで閉じる
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const soundPath = `${basePath}/sounds/${clip.sound}`;

  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <div className="info-modal" onClick={e => e.stopPropagation()}>
        <div className="info-modal-header">
          <h2>{clip.text}</h2>
          <button className="info-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="info-modal-body">
          <div className="info-section">
            <h3>読み方</h3>
            <p className="info-ruby">{clip.ruby}</p>
          </div>

          <div className="info-section">
            <h3>タグ</h3>
            <div className="info-tags">
              {clip.tags.length > 0 ? (
                clip.tags.map(tag => (
                  <span key={tag} className="info-tag">
                    {tag}
                  </span>
                ))
              ) : (
                <p className="info-empty">タグはありません</p>
              )}
            </div>
          </div>

          <div className="info-section">
            <h3>ファイル情報</h3>
            <div className="info-file">
              <p className="info-filename">
                <strong>ファイル名:</strong> {clip.sound}
              </p>
              <a href={soundPath} download className="info-download-btn">
                ダウンロード
              </a>
            </div>
          </div>
        </div>

        <div className="info-modal-footer">
          <button className="info-modal-close-btn" onClick={onClose}>
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
