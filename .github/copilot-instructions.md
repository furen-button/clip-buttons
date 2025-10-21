# GitHub Copilot への指示

## 全般
- 日本語で応答してください
- 適切に日本語でドキュメントやコメントを追加してください
- 単一責任の原則に従ってください
- Lint ツールを使用してコードをチェックしてください

## プロジェクト概要
clip-buttons は、clips.json を使用して音声再生ボタンを配置するサイトです。

### 主な機能
- 📁 clips.json から音声クリップデータを読み込み
- 🎵 再生ボタンでオーディオ再生
- 🏷️ タグフィルタリング（マルチセレクト対応）
- 📱 PC/スマホ対応レスポンシブデザイン（3段階ブレークポイント）
- ℹ️ 情報モーダル（クリップ詳細、タグ、ダウンロードリンク）
- 🔤 テキスト順/読み方順でのソート機能

### 技術スタック
- React + TypeScript
- Vite（ビルドツール）
- CSS Grid（レスポンシブレイアウト）
- Web Audio API（オーディオ再生）
- React Context API + カスタムフック（状態管理）

### ファイル構成
```
src/
├── App.tsx (ルートコンポーネント、ClipsProvider ラッパー)
├── App.css (グローバルレイアウト)
├── main.tsx (エントリーポイント)
├── components/
│   ├── ClipButton.tsx (再生ボタン + 情報ボタン)
│   ├── ClipsList.tsx (グリッドレイアウト、フィルター、ソート)
│   ├── TagFilter.tsx (タグ選択UI)
│   └── InfoModal.tsx (クリップ詳細モーダル)
├── contexts/
│   ├── ClipsContext.tsx (Provider コンポーネント)
│   └── clipsContextValue.ts (Context 定義)
├── hooks/
│   └── useClips.ts (カスタムフック)
├── types/
│   └── clip.ts (Clip インターフェース)
└── styles/
    ├── ClipButton.css (ボタンスタイル)
    ├── ClipsList.css (グリッド、ヘッダー、ソート)
    ├── TagFilter.css (フィルターUI)
    └── InfoModal.css (モーダルスタイル)
```

## アーキテクチャ
- **Context API**: clips.json データと basePath の管理
- **Provider パターン**: ClipsProvider でアプリを ラップ
- **カスタムフック**: useClips で Context を消費
- **コンポーネント分割**: 単一責任の原則に従い、機能ごとに分割

## レスポンシブデザイン
3つのブレークポイント:
- **1024px 以上**: グリッド 140px 幅、フレックスヘッダー（横並び）
- **601-1023px**: グリッド 130px 幅、ヘッダー（縦並び）
- **600px 以下**: グリッド 100px 幅、ヘッダー（縦並び）

## コード品質
- ESLint で静的解析を実施（`npm run lint`）
- TypeScript で型安全性を確保
- React Refresh 対応のファイル分割

