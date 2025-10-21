# clip-buttons 🎵

clips.json を使用して、音声再生ボタンを配置するReactサイトです。タグフィルタリング、レスポンシブデザイン、情報モーダル、ソート機能を備えています。

## 主な機能

- 📁 **clips.json データ読み込み**: JSON形式の音声クリップデータを自動解析
- 🎵 **音声再生**: Web Audio APIを使用した軽量な再生機能
- 🏷️ **タグフィルタリング**: マルチセレクト対応のタグベースフィルタリング
- 📱 **レスポンシブデザイン**: PC/スマホ両対応（3段階ブレークポイント）
- ℹ️ **情報モーダル**: クリップ詳細、タグ、ダウンロードリンク表示
- 🔤 **ソート機能**: テキスト順/読み方順での並べ替え

## 技術スタック

- **React** - UIフレームワーク
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
- **CSS Grid** - レスポンシブレイアウト
- **Web Audio API** - ネイティブオーディオ再生

## インストール

```bash
npm install
```

## 開発

```bash
npm run dev
```

Vite開発サーバーが起動し、HMR（Hot Module Replacement）が有効になります。

## ビルド

```bash
npm run build
```

本番用にアプリケーションをビルドします。

## コード品質チェック

```bash
npm run lint
```

ESLintで静的解析を実施します。

## プロジェクト構成

```
src/
├── App.tsx                 # ルートコンポーネント
├── App.css                 # グローバルレイアウト
├── components/
│   ├── ClipButton.tsx      # 再生ボタン + 情報ボタン
│   ├── ClipsList.tsx       # グリッド、フィルター、ソート
│   ├── TagFilter.tsx       # タグ選択UI
│   └── InfoModal.tsx       # クリップ詳細モーダル
├── contexts/
│   ├── ClipsContext.tsx    # ContextProvider
│   └── clipsContextValue.ts # Context定義
├── hooks/
│   └── useClips.ts         # カスタムフック
├── types/
│   └── clip.ts             # 型定義
└── styles/
    ├── ClipButton.css
    ├── ClipsList.css
    ├── TagFilter.css
    └── InfoModal.css
```

## レスポンシブブレークポイント

| デバイス | 幅 | グリッド列幅 | レイアウト |
|---------|-----|----------|---------|
| PC | 1024px+ | 140px | 横並びヘッダー |
| タブレット | 601-1023px | 130px | 縦並びヘッダー |
| スマホ | 600px以下 | 100px | 縦並びヘッダー |

## データ形式

`clips.json` の形式:

```json
{
  "clips": [
    {
      "id": "1",
      "text": "クリップ名",
      "ruby": "よみかた",
      "tags": ["tag1", "tag2"],
      "soundPath": "sounds/clip.mp3"
    }
  ]
}
```

## ライセンス

MIT
