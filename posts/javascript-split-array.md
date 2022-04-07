---
title: '[JS] 配列を指定した要素数で分割したい'
date: '2022/3/4'
excerpt: ''
cover_image: ''
category: 'javascript'
---

要素数が 10 の [0,1,2,3,4,5,6,7,8,9] という配列があったとして、それをこんなかんじで  [[0,1,2], [3,4,5], [6,7,8], [9]] 要素数 3 ずつに分解したいということがあった。

これまで何度かこの処理を書いてきてきているけれど、そろそろ関数化しておきたいなと思ったのでメモ。

- split-array.ts

```ts
export const splitArray = <T extends any> (array: T[], par: number): T[][] => {
  return array.reduce((a, c, i) => {
    i % par === 0 && a.push([]);
    a[Math.floor(i / par)].push(c);
    return a;
  }, [] as T[][]);
};
```

最近テストを書くようにしているので一応テストコードも。

- split-array.spec.ts

```ts
import { splitArray } from './split-array';

describe('splitArray 関数のテスト', () => {
  describe('入力される配列の要素数が、出色する配列の要素数(第2引数)より大きい場合', () => {
    test('要素数 10 の配列を、要数 3 の配列に分割', () => {
      const inputArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      expect([[0, 1, 2],[3, 4, 5],[6, 7, 8],[9]]).toEqual(splitArray(inputArray, 3));
    });
  });
  describe('入力される配列の要素数が、出力する配列の要素数(第2引数)より小さい場合', () => {
    test('要素数 5 の配列を、要素数 10 の配列に分割', () => {
      const inputArray = [0, 1, 2, 3, 4];
      expect([[0, 1, 2, 3, 4]]).toEqual(splitArray(inputArray, 10));
    });
  });
});
```

これでもうこの処理が出てきても大丈夫になった。

おしまい。