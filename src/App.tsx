import { ClipsProvider } from './contexts/ClipsContext';
import { ClipsList } from './components/ClipsList';
import './App.css';

/**
 * App
 * メインアプリケーションコンポーネント
 * 
 * ClipsProvider でラップして、sampleAssets のパスをカスタマイズ可能にしています。
 * 将来的に、basePath をプロップやURLパラメータから取得することで、
 * 複数のアセットディレクトリに対応できます。
 */
function App() {
  // sampleAssets のベースパス（カスタマイズ可能）
  const CLIPS_BASE_PATH = '/sampleAssets';

  return (
    <ClipsProvider basePath={CLIPS_BASE_PATH}>
      <div className="app-container">
        <header className="app-header">
          <h1>🎵 クリップボタン</h1>
          <p>再生ボタンをクリックして、音声を再生してください</p>
        </header>
        <main className="app-main">
          <ClipsList />
        </main>
      </div>
    </ClipsProvider>
  );
}

export default App;
