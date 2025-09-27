# Touto LP - Multiple Path Version

血糖値サプリメント「とうと」のアンケート型ランディングページ（複数パス対応版）

## 概要

- **商品**: 血糖値対策サプリメント「とうと」
- **形式**: 3段階のアンケート形式LP
- **特徴**: 複数パス（/1 ～ /7）から異なる販売リンクへ動的リダイレクト

## パス別リダイレクト設定

| パス | リダイレクト先 |
|------|----------------|
| `/1` | https://sf-system.jp/link.php?i=pi4ser44dpib&m=mi41ruivpeep |
| `/2` | https://sf-system.jp/link.php?i=pi4ser44dpib&m=mi44h49yhgux |
| `/3` | https://sf-system.jp/link.php?i=pi4ser44dpib&m=mi41q1o5alqr |
| `/4` | https://sf-system.jp/link.php?i=pi4ser44dpib&m=mi41q4mbpxi9 |
| `/5` | https://sf-system.jp/link.php?i=pi4ser44dpib&m=mi41q3pp22zj |
| `/6` | https://sf-system.jp/link.php?i=pi4ser44dpib&m=mi4e9lzv5vxl |
| `/7` | https://sf-system.jp/link.php?i=pi4ser44dpib&m=mi41q28cb1ef |

## ファイル構成

- `index.html` - メインHTML（アンケートLP）
- `script.js` - 動的リダイレクト機能とアニメーション
- `style.css` - スタイリング
- `vercel.json` - Vercelルーティング設定

## デプロイ方法

1. このプロジェクトをVercelにインポート
2. 自動デプロイが完了すると、すべてのパス（/1～/7）が利用可能

## 使用技術

- バニラJavaScript
- CSS3（アニメーション、グラデーション）
- Vercel（ホスティング・ルーティング）