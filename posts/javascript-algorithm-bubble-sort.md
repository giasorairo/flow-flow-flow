---
title: '[JS] JavaScript でアルゴリズム入門したので成長記録をつけていく(Lv.1) - バブルソート編'
date: '2022/3/18'
excerpt: ''
cover_image: ''
category: 'JavaScript'
---
## 前書き

プログラマになって2年半がたって、いつも再起関数とか書くときしんどい思いをするなと思っていたら、自分はアルゴリズムというものを全く理解していないのだと気づいた。

試しに paiza のスキルチェックをしてみたら B ランクまでしかいけなかった。パスできない課題もたくさんあったし、パスできた課題に関してもきったねえコードを提出してしまっている。

これはやばいと思ったので、アルゴリズムについて勉強していくことにした。

アルゴリズムについて調べるにあたって、さすがに2年半もプログラマやってれば知っている知識も多少はあるだろうと思っていたけど、一発目のバブルソートから名前だけしか知らなった。

Array.sort((a, b) ⇒ a - b); みたいな記述はいつも使ってるけれど、じゃあその中身ではどういった処理が行われているのかまでは知らない。

ならば知っていこう💪

アルゴリズムを学習するにあたって、目標は paiza のスキルチェックの A ランクをとること。(転職に役立つかもしれないと言う希望が 5% くらいあるので)

卒業した高校の偏差値が 47 なので間違っているところなどありましたら、ご指摘ください🙃

## 調べた

バブルソートについていろいろな記事や動画をみたけど、この動画がいちばんわかりやすかった気がする。並び替えのところで分割代入使ってるのも好き。他の記事では大体 tmp みたいな変数に一時保存して、3行くらいかけてやってる処理が分割代入つかったら1行だもんな。正直、頭悪いから初めは何やってるのか意味わからなかったけど⚡️　tmp という変数を使って3行かけて入れ替え処理を書いた方が自分は理解しやすいと思う。けど、分割代入カッコいいからな。カッコつけていかないとな🕶

<iframe width="100%" height="315" src="https://www.youtube.com/embed/5hApch5oV3E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## いろんな記事を摂取した私のバブルソートへの理解度

とりあえず端っこからバチギメしていくソートなんだね。

## バブルソート書いていく

昇順にソートするパターンのバブルソート。

```jsx
export const bubbleSort  = (array) => { 
  const length = array.length;
  for (let i = 0; i < length; i++) {
    for (let r = 0; r < (length - i); r++) {
      if (array[r] > array[r + 1]) {
        [array[r], array[r + 1]] = [array[r + 1], array[r]];
      }
    }
  }
  return array;
};
```

## テストも書いていく (というかテストから先に書く)

テスト駆動開発に憧れているので、とりあえずテストは書くようにしている。書かないと jest に慣れれないし。

```jsx
import { bubbleSort } from './bubble-sort';

describe('bubbleSort', () => {
  test('昇順でソートできているか', () => {
    const result = [10, 20, 30];
    bubbleSort([30, 20, 10]).forEach((v, i) => {
      expect(v).toBe(result[i]);
    });
  });

  test('マイナスの値があっても昇順でソートできているか', () => {
    const input = [0, -20, 999, -10, -100, 20];
    const result = [-100, -20, -10, 0, 20, 999];
    bubbleSort(input).forEach((v, i) => {
      expect(v).toBe(result[i]);
    });
  });

  test('同じ値があっても昇順でソートできているか', () => {
    const input = [0, 13, 2, 99, 302, 0];
    const result = [0, 0, 2, 13, 99, 302];
    bubbleSort(input).forEach((v, i) => {
      expect(v).toBe(result[i]);
    });
  });
});
```

## 感想

バブルソートってこういう仕組みなんだということが理解できてよかった。JavaScript には sort関数あるし、車輪の開発といわれればそれまでなんだろうけれど、バブルソートという言葉の意味をちゃんと理解できたのでよかった。これからはバブルソートという言葉が出てきても怖がらないで済む💪

## 追記

降順のバブルソートのコードも書いた。

降順の場合は 0 番目の要素から揃えていく。

```jsx
export const bubbleSortDesc = (array) => {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    for (let r = length; r > length - i; r--) {
      if (array[r - 1] < array[r]) {
        [array[r - 1], array[r]] = [array[r], array[r - 1]];
      }
    }
  }
  return array;
};
```

テストも書いた。

```jsx
import { bubbleSortDesc } from './bubble-sort-desc';

describe('bubbleSortDesc', () => {
  test('降順でソートできているか', () => {
    const result = [30, 20, 10];
    bubbleSortDesc([30, 20, 10]).forEach((v, i) => {
      expect(v).toBe(result[i]);
    });
  });

  test('マイナスの値があっても降順でソートできているか', () => {
    const input = [0, -20, 999, -10, -100, 20];
    const result = [999, 20, 0, -10, -20, -100];
    bubbleSortDesc(input).forEach((v, i) => {
      expect(v).toBe(result[i]);
    });
  });

  test('同じ値があっても降順でソートできているか', () => {
    const input = [0, 13, 2, 99, 302, 0];
    const result = [302, 99, 13, 2, 0, 0];
    bubbleSortDesc(input).forEach((v, i) => {
      expect(v).toBe(result[i]);
    });
  });
});
```

## 参考

- [「めちゃ解る！アルゴリズム授業①」作って楽しく学ぶ（※サンプルコードあり）【JavaScript】プログラミング入門](https://www.youtube.com/watch?v=5hApch5oV3E)
- [[初心者向け] プログラムの計算量を求める方法](https://qiita.com/cotrpepe/items/1f4c38cc9d3e3a5f5e9c)