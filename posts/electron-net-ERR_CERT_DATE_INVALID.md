---
title: '[electron] electron アプリで net::ERR_CERT_DATE_INVALID を無視したいときの対応方法'
date: '2022/7/22'
excerpt: ''
cover_image: ''
category: 'プログラミング'
tags: 'electron'
keywords: 'electron,net::ERR_CERT_DATE_INVALID'
---

## 経緯

いままで普通に動いていた electron アプリが急にエラーを吐くようになった。

コンソールを確認すると、`net::ERR_CERT_DATE_INVALID` とあって証明書関連のエラーらしい。API サーバは先方が管理しているので、「証明書更新してください」とも言いづらい。

chrome (chromium) が吐いているエラーらしいので、electron 側の対応のみで済むのならそれがいちばんいい。

念の為 curl でもエラーが返ってきている API を叩いてみるとエラーが返ってきた。

```css
$ curl 'https://example.com'

curl: (60) SSL certificate problem: certificate has expired
More details here: https://curl.se/docs/sslcerts.html

curl failed to verify the legitimacy of the server and therefore could not
establish a secure connection to it. To learn more about this

# - deepL 訳 -
# curl: (60) SSL 証明書の問題: 証明書は期限切れです。
# 詳細はこちら: https://curl.se/docs/sslcerts.html

# curl はサーバーの正当性の検証に失敗し、そのため安全な接続を確立できませんでした。
# 安全な接続を確立できません。このことについて詳しく知るには
```

でも以前これ系のエラー対応した気がするんだよなと思ってソースコード見てたら、ちゃんと webSecurity: false にしていた。

```tsx
mainWindow = new BrowserWindow({
  width: 500,
  height: 350,
  resizable: true,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
		// ココ！！
    webSecurity: false,
  },
});
```

## 調査

とはいえこの対応だけでは足りないみたいなので、公式ドキュメントを漁ることにする。`ssl` とか `certificate` とか `security` とかで検索をかければいい感じの API にたどり着いてほしい。

公式ドキュメントで `certificate` で検索を書けると何通りかのやりかたが出てくる。

## 1. --ignore-certificate-errors を設定する

1行で済むし、これがいちばん簡単そう。

```tsx
app.commandLine.appendSwitch('--ignore-certificate-errors');
```

- document: [https://www.electronjs.org/ja/docs/latest/api/command-line-switches#--ignore-certificate-errors](https://www.electronjs.org/ja/docs/latest/api/command-line-switches#--ignore-certificate-errors)

## 2. 'certificate-error'

ググって、出てくるのはこっちの記述で対応しているひとばかり。url を受け取って選択的に、挙動を変更できるからこっちの方がよく使われてるのかもしれない。

```tsx
app.on('certificate-error', function(event, webContents, url, error, certificate, callback) {
  event.preventDefault();
  callback(true);
});
```

- document: [https://www.electronjs.org/docs/latest/api/app#event-certificate-error](https://www.electronjs.org/docs/latest/api/app#event-certificate-error)

## 3. ‘**select-client-certificate’**

2 に似てる。

```tsx
app.on('select-client-certificate', (event, webContents, url, list, callback) => {
  event.preventDefault();
  callback(list[0]);
});
```

- document: [https://www.electronjs.org/docs/latest/api/app#event-select-client-certificate](https://www.electronjs.org/docs/latest/api/app#event-select-client-certificate)

## おわり

今回は 1 で対応しました。
