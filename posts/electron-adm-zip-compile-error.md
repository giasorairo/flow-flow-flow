---
title: '[electron] electron のプロジェクトで adm-zip を インスタンス化したら、ビルドしたアプリでエラー吐いた'
date: '2022/4/21'
excerpt: ''
cover_image: ''
category: 'プログラミング'
tags: 'electron'
keywords: 'electron,amd-zip'
---

electron のプロジェクトで、ファイル操作系のクラスを ts で書いていたら amd-zip のインスタンス化で詰まった。

今回ちゃんと main.js と preload.js を typescript 化してプロジェクトをはじめたので、自分えらいと思っていた矢先のトラブル。こんなことなら js で書いておけばよかったと思わずにはいられない。しかしいまさら js 化させるのも面倒なので、解決することにする。

amd-zip を使いたくてこんな感じでインスタンスかする処理を書いた。

```tsx
import AdmZip from 'adm-zip';
const zpi = new AmdZip();
```

ビルドするためにコンパイルしたらこうなった。

default() ッテナンデスカ。ドコカラキンタンデスカ。

```jsx
const adm_zip_1 = require("adm-zip");
const zip = new adm_zip_1.default();
```

これでエラーが起きる。

力技で、コンパイル後のファイルの `amd_zip_1.default()` の default を消したらうまくいったので、どうやら default という謎のメソッドが生えてしまっているのが原因らしい。

tsconfig.json の設定で消せるだろうなと思っていろいろ調べてみたけど、どれもだめだった。

いいかげん CJM と ESM 関連で振り回されるのしんどいなと思い始めている。

面倒なのでゴリ押しすることにした。

この記述でコンパイルしてやればうまくいく。

```tsx
import * as AdmZip from 'adm-zip';
const zip: AdmZip = new (AdmZip as any)();
```

コンパイル結果。

```jsx
const AdmZip = require("adm-zip");
const zip = new AdmZip();
```

たぶん、いや確実にこれはよくない解決法であることはわかる。ごり押しだもんな。

たぶん tsconfig.json の設定でどうにかできるんだと思うけど、4h 調べてわからなかったからもう諦める。スケジュールやばいんだ。tsconfig.json での解決方法しってる人いたらおしえてください🌟