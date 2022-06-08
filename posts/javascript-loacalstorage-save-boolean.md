---
title: 'localstorage に boolean 型の true を保存したら string 型で保存されてしまう'
date: '2022/6/8'
excerpt: ''
cover_image: ''
category: 'javascript'
---

## ## 文字列の boolean だけは許さない

localstorage に boolean 型値を保存したいのにできなかった。

true を保存しようすると ‘true’ に変換されてしまう。

```tsx
localstorage.setItem('isInitialize', true);
localstorage.getItem('isInitialize'); // 'true' 😥
```

調べてたら 0/1 で保存すればいいじゃんという記事があった。

こんなかんじで書くらしい。これでもぜんぜん良いと思いますが、個人的には parseInt を使うのがなんか直感的ではないような気がしました。

```tsx
localstorage.setItem('isInitialize',1);
Boolean(parseInt(localstorage.getItem('isInitialize'),10))
```

けっきょく自分で class つくるのが良いような気がするので作った

```tsx
class LocalStorageControllerClass {

  constructor() {}

  isInitialize() {
    const key = 'isInitialize';
    return {
      set: (value: boolean) => {
        localStorage.setItem(key, String(value));
      },
      get: (): boolean => {
        const value = localStorage.getItem(key);
        return Boolean(value === 'true');
      }
    }
  }

};

export const LocalStorageController = new LocalStorageControllerClass();
```

こんなかんじで使います。

set するときは boolean で使えるし、get するときは boolean で返ってくる。

```tsx
LocalStorageController.isInitialize().set(true);
const isInitialize = LocalStorageController.isInitialize().get();
```

汎用性があるのかはよくわからないけど、自分は直感的に使えているのでいい感じのような気がします。ロジックをクラスに隠しただけじゃないかと言われれば、そのとおりですとしかいえません。

## ## まとめ

indexDB を使いなさいという説もあります。