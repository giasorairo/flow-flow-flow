---
title: '[electron] error TS2305: Module crypto has no exported member BinaryToTextEncoding を回避する'
date: '2022/5/16'
excerpt: ''
cover_image: ''
category: 'electron'
---

## electron の自動アップデート対応 をしようとして electron-updater を import すると `node_modules/electron-updater/node_modules/builder-util-runtime/out/httpExecutor.d.ts(2,10): error TS2305: Module '"crypto"' has no exported member 'BinaryToTextEncoding` というエラーが発生したので回避方法を調査する

## electron-builder にある issue

electron-builder のリポジトリにそれっぽい issue がある。どうやら compile 時に slipLibCheck というオプションを設定してやるのがいちばんお手軽っぽい。

[https://github.com/electron-userland/electron-builder/issues/5446](https://github.com/electron-userland/electron-builder/issues/5446)

## tsconfig.json の compilerOptions に skipLibCheck を追加する

slipLibCheck オプションを追加してビルド再ビルドすると、エラーは出なくなった🎉

```json
{
  "compilerOptions": {
		...
    "skipLibCheck": true,
  },
}
```

## skipLibCheck とはどんなオプションなのか

- [TypeScriptのskipLibCheckを理解する](https://t-yng.jp/post/skiplibcheck)

> このオプションのデフォルト値は false で true を設定することで `*.d.ts`
 ファイルに対する型チェックをスキップすることができます。
> 

型定義を無視するわけなので、割とリスキーな対応かもしれないなと思いましたが、この対応で行くことにしました。

## 参考文献

- [electron-builder includes @types/yargs dependency, TypeScript has type errors on it #5446](https://github.com/electron-userland/electron-builder/issues/5446)
    - いいかんじの issue
- [TypeScriptのskipLibCheckを理解する](https://t-yng.jp/post/skiplibcheck)