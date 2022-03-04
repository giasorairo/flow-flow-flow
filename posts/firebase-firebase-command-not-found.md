---
title: '[firebase] PC環境移行して firebase にデプロイしようとしたら firebase: command not found で怒られた'
date: '2022/3/4'
excerpt: ''
cover_image: ''
category: 'firebase'
---

先日 M1 mac に環境を移行しました🎉

そこで firebase に置いている個人ブログ(このブログ)のデプロイでいっしゅんつまずいたので、今後また PC の環境移行するであろう自分のためにメモをのこしておきます。

github から clone してきたブログのプロジェクトで記事を更新してビルド。

いざ firebase にデプロイ！

```bash
$ firebase deploy --only hosting
```

デプロイできませんでした。

コンソールにタイトルにもある下記のエラーを確認。

```tsx
sh: firebase: command not found
```

firebase なんてコマンドはありませんよ。

はい。

いれます。

```bash
$ npm install -g firebase-tools
```

再度、いざ firebase にデプロイ！

```bash
$ firebase deploy --only hosting
```

今度こそいける気しかしない！

```bash
Error: Failed to authenticate, have you run firebase login?
```

ログインしてないけど正気か？

すみませんでした

ログインします

```bash
firebase login
```

ブラウザが開かれるので、ログイン。

これで大丈夫 (3回目)

```bash
$ firebase deploy --only hosting
```

で、無事 firebase にデプロイできました🎉

おわり。