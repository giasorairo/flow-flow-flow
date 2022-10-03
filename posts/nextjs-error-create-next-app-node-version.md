---
title: '[next.js] error eslint-scope@7.1.1: The engine "node" is incompatible with this module. Expected version... の対応'
date: '2022/6/4'
excerpt: ''
cover_image: ''
category: 'プログラミング'
tags: 'next.js'
keywords: 'next.js'
---

## `npx create-next-app --typescript` を実行したら error eslint-scope@7.1.1: The engine "node" is incompatible with this module. Expected version "^12.22.0 || ^14.17.0 || >=16.0.0". Got "14.4.0" というエラーがでた

node_modules, package.json, yarn.lock しか作成されてなくて、ログを見たらこんなかんじでエラーを吐いていた。

```tsx
...
yarn add v1.22.18
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
error eslint-scope@7.1.1: The engine "node" is incompatible with this module. Expected version "^12.22.0 || ^14.17.0 || >=16.0.0". Got "14.4.0"
error Found incompatible module.
info Visit https://yarnpkg.com/en/docs/cli/add for documentation about this command.
```

エラー内容を読むと、node.js のバージョンが、12.22.0 or 14.17.0 or 16.0.0 以上である必要があるらしい。で、今の node.js は 14.4.0 だよーということらしい。

## node.js のバージョンを 16.0.0 以上に変更する

どうやら node.js のバージョンが良くないらしいので、node.js のバージョンを変更する。

自分は node.js のバージョン管理に volta を使用しているので、volta でのバージョン変更のやり方を書くけど、ここは nodebrew とか nodist とか別のバージョン管理ツールを使っているなら、そのツールにあった方法に読み替えていただければ良い。

```tsx
# node.js のバージョン確認
node -v
v14.4.0

# node.js のバージョン変更
volta install node@v16.13.2

# node.js のバージョン確認
node -v
v16.13.2
```

node.js のバージョンを変更したので、再度 `npx create-next-app --typescript` を実行

なにもかもがうまくいく🎉🎉🎉