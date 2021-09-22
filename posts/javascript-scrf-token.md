---
title: '[JavaScript] CSRF対策でレスポンスヘッダからtokenを取得して、fetchでのリクエストのヘッダに持たせたい'
date: '2021/9/22'
excerpt: '今回やりたいのは、CSRF対策でレスポンスヘッダからtokenを取得して、fetchでのリクエストのヘッダに持たせるという処理。これは、'
cover_image: '/images/collection/javascript3.png'
category: 'JavaScript,セキュリティ'
---

## もくじ
- <a href="#1">やりたいこと</a>
  - <a href="#1">CSRF対策でレスポンスヘッダからtokenを取得して、fetchでのリクエストのヘッダに持たせたい</a>
- <a href="#2">エラー内容</a>
  - <a href="#2">レスポンスヘッダで受け取っているtokenを取得できなきない</a>
- <a href="#3">調査</a>
  - <a href="#3">ググった</a>
- <a href="#4">原因</a>
  - <a href="#4">corsのせいだった</a>
- <a href="#5">解決策</a>
  - <a href="#5">サーバサイドにお願いした</a>
- <a href="#6">参考</a>

<a id="1"></a>

## やりたいこと
今回やりたいのは、CSRF対策でレスポンスヘッダからtokenを取得して、fetchでのリクエストのヘッダに持たせるという処理。これは、

- 1.CSRF対策でレスポンスヘッダからtokenを取得する処理
- 2.fetchでのリクエストのヘッダに持たせるという処理

というふたつに分解することができる。
で、自分が今回詰まったのが、`1.CSRF対策でレスポンスヘッダからtokenを取得する処理` こっちの処理。今回のケースではレスポンスのヘッダの`X-CSRF-TOKEN`というキーの値でtokenが渡されていたけど、`response.headers.get('X-CSRF-TOKEN')`で取得することができなかった。

<a id="2"></a>

## エラー内容
別にエラーが出たわけではない。ただ`response.headers.get('X-CSRF-TOKEN')`の返り値が`null`だった。

でもレスポンスヘッダの他の`Content-Language`とか`Content-Type`は`response.headers.get('Content-Language')`, `response.headers.get('Content-Type')`で取得できる。なぜ`X-CSRF-TOKEN`は取得できないのか。

<a id="3"></a>

## 調査
デベロッパーツールのNetworkでレスポンスヘッダを確認すると、`X-CSRF-TOKEN`が token を保持している。ちゃんとレスポンスヘッダは`X-CSRF-TOKEN`を持っているのに、`response.headers.get('X-CSRF-TOKEN')`で取得できない。困った。

ググった。出てきた。

[Introduction to fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch#response_types)

記事によると、fetch の mode が cors の場合は、レスポンスヘッダの`Cache-Control`, `Content-Language`, `Content-Type`, `Expires`, `Last-Modified`の情報しか取得できないよということらしい。これでなぜ レスポンスのヘッダからtokenを取得できなかったのかはわかった。

じゃあ cors を利用してかつレスポンスヘッダの持っているtokenを参照する方法を調べればいい。ググった。出てきた。

[なんとなく CORS がわかる...はもう終わりにする。](https://qiita.com/att55/items/2154a8aad8bf1409db2b)

記事によればサーバ側で、`Access-Control-Allow-Headers(フレームワークによって違う)`を設定すればいいらしい。なるほど。

<a id="4"></a>

## 原因
cors のせいで`response.headers.get()` でデフォルトで許可されているヘッダの値以外を取得できないように鳴っていたので、サーバサイドで`Access-Control-Allow-Headers(フレームワークによって違う)`を宣言して貰う必要がある。

<a id="5"></a>

## 解決策
自分はフロントエンドエンジニアなので、サーバサイドの担当者に上記の調査内容を報告して、「レスポンスヘッダの参照を許可するようにしてください」と依頼を投げた。バックエンドは Laravel を使っているらしく、サーバサイドの人から「`Access-Control-Expose-Headers: X-CSRF-TOKEN`っていう記述追加したからためしてみて」と返ってきて、試したらちゃんと取得できた。

token を取得するときのコードはこんなかんじ。このtokenをとこかに保持しておいて、リクエストのときに使用する。

```typescript
// token取得
await fetch('api/login')
  .then((response) => {
    // トークン取得 (どっかに保持しておく)
    const token = response.headers.get('X-CSRF-TOKEN');
  });

// tokenを持たせてリクエスト
const myHeaders = new Headers();
// このtokenはどっかに保持しておいたtoken
headers.set('X-CSRF-TOKEN', token);
await fetch('api/hoge', { method: 'POST', headers: myHeaders });

```

こんなかんじ。あんまりセキュリティ周りとか気にしたことなかったので(大問題)今回はcsrfの勉強もできてよかった。

<a id="6"></a>

## 参考
- [Introduction to fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch#response_types)
- [なんとなく CORS がわかる...はもう終わりにする。](https://qiita.com/att55/items/2154a8aad8bf1409db2b)