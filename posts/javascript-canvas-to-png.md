---
title: 'base64 に変換したcanvas をサーバ側で受け取ってファイル保存したい'
date: '2022/3/7'
excerpt: ''
cover_image: ''
category: 'JavaScript'
---

ogp 画像を動的に生成したくてタイトルのような処理が必要になった。

より詳細にやりたいことを書くと、下記のような感じ。

- フロントで canvas を使っていい感じの ogp のレイアウトを生成する
- canvas を画像化してサーバ側で保存したいので、base64 にエンコードして、リクエストの body に持たせる
- サーバ側で受け取った base64 にエンコードされた png をデコードして、保存する。

ひとつずつやっていく。

**フロントで canvas を使っていい感じの ogp のレイアウトを生成する**

ここでは rect をひとつ描画する

```bash
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
if (!canvas) {
  return;
}
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'skyblue';
ctx.fillRect(0, 0, 100, 100);
```

こんな感じで表示される

![スクリーンショット 2022-03-08 1.07.05.png](/images/collection/スクリーンショット_2022-03-08_1.07.05.png)

**canvas を画像化してサーバ側で保存したいので、base64 にエンコードして、リクエストの body に持たせる**

```tsx
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
if (!canvas) {
  return;
}
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'skyblue';
ctx.fillRect(0, 0, 100, 100);

// base64 にエンコード
const canvasAsBase64 = canvas.toDataURL();
console.log('canvasAsBase64', canvasAsBase64);
```

このような base64 が出力される

ブラウザの url にこの base64 を入力すると、canvas で描画したのと同じ画像が表示される

```tsx
data:image/png;base64,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l0cE1ktdswkQIECAwI2AwLpxHn9FYI2p/JEAAQIECNQKCKyypxFYZQ/iOgQIECBAYCEgsBZoL48IrJe6ZhMgQIAAgRsBgXXjPP6KwBpT+SMBAgQIEKgVEFhlTyOwyh7EdQgQIECAwELgszjjCAECBAgQIECAwDcCAst6ECBAgAABAgTCAgIrDGocAQIECBAgQEBg2QECBAgQIECAQFhAYIVBjSNAgAABAgQICCw7QIAAAQIECBAICwisMKhxBAgQIECAAAGBZQcIECBAgAABAmEBgRUGNY4AAQIECBAgILDsAAECBAgQIEAgLCCwwqDGESBAgAABAgQElh0gQIAAAQIECIQFBFYY1DgCBAgQIECAgMCyAwQIECBAgACBsIDACoMaR4AAAQIECBAQWHaAAAECBAgQIBAWEFhhUOMIECBAgAABAgLLDhAgQIAAAQIEwgICKwxqHAECBAgQIEBAYNkBAgQIECBAgEBYQGCFQY0jQIAAAQIECAgsO0CAAAECBAgQCAsIrDCocQQIECBAgAABgWUHCBAgQIAAAQJhAYEVBjWOAAECBAgQICCw7AABAgQIECBAICwgsMKgxhEgQIAAAQIEBJYdIECAAAECBAiEBQRWGNQ4AgQIECBAgIDAsgMECBAgQIAAgbCAwAqDGkeAAAECBAgQEFh2gAABAgQIECAQFhBYYVDjCBAgQIAAAQICyw4QIECAAAECBMICAisMahwBAgQIECBAQGDZAQIECBAgQIBAWEBghUGNI0CAAAECBAgILDtAgAABAgQIEAgLCKwwqHEECBAgQIAAAYFlBwgQIECAAAECYQGBFQY1jgABAgQIECAgsOwAAQIECBAgQCAsILDCoMYRIECAAAECBASWHSBAgAABAgQIhAUEVhjUOAIECBAgQICAwLIDBAgQIECAAIGwgMAKgxpHgAABAgQIEBBYdoAAAQIECBAgEBYQWGFQ4wgQIECAAAECAssOECBAgAABAgTCAgIrDGocAQIECBAgQEBg2QECBAgQIECAQFhAYIVBjSNAgAABAgQICCw7QIAAAQIECBAICwisMKhxBAgQIECAAAGBZQcIECBAgAABAmEBgRUGNY4AAQIECBAgILDsAAECBAgQIEAgLCCwwqDGESBAgAABAgQElh0gQIAAAQIECIQFBFYY1DgCBAgQIECAgMCyAwQIECBAgACBsIDACoMaR4AAAQIECBAQWHaAAAECBAgQIBAWEFhhUOMIECBAgAABAgLLDhAgQIAAAQIEwgICKwxqHAECBAgQIEBAYNkBAgQIECBAgEBYQGCFQY0jQIAAAQIECAgsO0CAAAECBAgQCAsIrDCocQQIECBAgAABgWUHCBAgQIAAAQJhAYEVBjWOAAECBAgQICCw7AABAgQIECBAICwgsMKgxhEgQIAAAQIEBJYdIECAAAECBAiEBQRWGNQ4AgQIECBAgIDAsgMECBAgQIAAgbCAwAqDGkeAAAECBAgQEFh2gAABAgQIECAQFhBYYVDjCBAgQIAAAQICyw4QIECAAAECBMICAisMahwBAgQIECBAQGDZAQIECBAgQIBAWEBghUGNI0CAAAECBAgILDtAgAABAgQIEAgLCKwwqHEECBAgQIAAAYFlBwgQIECAAAECYQGBFQY1jgABAgQIECAgsOwAAQIECBAgQCAsILDCoMYRIECAAAECBASWHSBAgAABAgQIhAUEVhjUOAIECBAgQICAwLIDBAgQIECAAIGwgMAKgxpHgAABAgQIEBBYdoAAAQIECBAgEBYQWGFQ4wgQIECAAAECAssOECBAgAABAgTCAgIrDGocAQIECBAgQEBg2QECBAgQIECAQFhAYIVBjSNAgAABAgQICCw7QIAAAQIECBAICwisMKhxBAgQIECAAAGBZQcIECBAgAABAmEBgRUGNY4AAQIECBAgILDsAAECBAgQIEAgLCCwwqDGESBAgAABAgQElh0gQIAAAQIECIQFBFYY1DgCBAgQIECAgMCyAwQIECBAgACBsIDACoMaR4AAAQIECBAQWHaAAAECBAgQIBAWEFhhUOMIECBAgAABAgLLDhAgQIAAAQIEwgICKwxqHAECBAgQIEBAYNkBAgQIECBAgEBYQGCFQY0jQIAAAQIECAgsO0CAAAECBAgQCAsIrDCocQQIECBAgAABgWUHCBAgQIAAAQJhAYEVBjWOAAECBAgQICCw7AABAgQIECBAICwgsMKgxhEgQIAAAQIEBJYdIECAAAECBAiEBQRWGNQ4AgQIECBAgIDAsgMECBAgQIAAgbCAwAqDGkeAAAECBAgQEFh2gAABAgQIECAQFhBYYVDjCBAgQIAAAQICyw4QIECAAAECBMICAisMahwBAgQIECBAQGDZAQIECBAgQIBAWEBghUGNI0CAAAECBAgILDtAgAABAgQIEAgLCKwwqHEECBAgQIAAAYFlBwgQIECAAAECYQGBFQY1jgABAgQIECAgsOwAAQIECBAgQCAsILDCoMYRIECAAAECBASWHSBAgAABAgQIhAUEVhjUOAIECBAgQICAwLIDBAgQIECAAIGwgMAKgxpHgAABAgQIEBBYdoAAAQIECBAgEBYQWGFQ4wgQIECAAAECAssOECBAgAABAgTCAgIrDGocAQIECBAgQEBg2QECBAgQIECAQFhAYIVBjSNAgAABAgQICCw7QIAAAQIECBAICwisMKhxBAgQIECAAAGBZQcIECBAgAABAmEBgRUGNY4AAQIECBAgILDsAAECBAgQIEAgLCCwwqDGESBAgAABAgQElh0gQIAAAQIECIQFBFYY1DgCBAgQIECAgMCyAwQIECBAgACBsIDACoMaR4AAAQIECBAQWHaAAAECBAgQIBAWEFhhUOMIECBAgAABAgLLDhAgQIAAAQIEwgICKwxqHAECBAgQIEBAYNkBAgQIECBAgEBYQGCFQY0jQIAAAQIECAgsO0CAAAECBAgQCAsIrDCocQQIECBAgAABgWUHCBAgQIAAAQJhAYEVBjWOAAECBAgQICCw7AABAgQIECBAICwgsMKgxhEgQIAAAQIEBJYdIECAAAECBAiEBQRWGNQ4AgQIECBAgIDAsgMECBAgQIAAgbCAwAqDGkeAAAECBAgQEFh2gAABAgQIECAQFhBYYVDjCBAgQIAAAQICyw4QIECAAAECBMICAisMahwBAgQIECBAQGDZAQIECBAgQIBAWEBghUGNI0CAAAECBAgILDtAgAABAgQIEAgLCKwwqHEECBAgQIAAAYFlBwgQIECAAAECYQGBFQY1jgABAgQIECAgsOwAAQIECBAgQCAsILDCoMYRIECAAAECBASWHSBAgAABAgQIhAUEVhjUOAIECBAgQICAwLIDBAgQIECAAIGwgMAKgxpHgAABAgQIEBBYdoAAAQIECBAgEBYQWGFQ4wgQIECAAAECAssOECBAgAABAgTCAgIrDGocAQIECBAgQEBg2QECBAgQIECAQFhAYIVBjSNAgAABAgQICCw7QIAAAQIECBAICwisMKhxBAgQIECAAAGBZQcIECBAgAABAmEBgRUGNY4AAQIECBAgILDsAAECBAgQIEAgLCCwwqDGESBAgAABAgQElh0gQIAAAQIECIQFBFYY1DgCBAgQIECAgMCyAwQIECBAgACBsIDACoMaR4AAAQIECBAQWHaAAAECBAgQIBAWEFhhUOMIECBAgAABAgLLDhAgQIAAAQIEwgICKwxqHAECBAgQIEBAYNkBAgQIECBAgEBYQGCFQY0jQIAAAQIECAgsO0CAAAECBAgQCAsIrDCocQQIECBAgACB/324kUuk7rmlAAAAAElFTkSuQmCC
```

リクエストする

```tsx
fetch('api/hoge', {
  method: 'POST',
  body: JSON.stringify({ pngData: canvasAsBase64 })
});
```

**サーバ側で受け取った base64 にエンコードされた png をデコードして、保存する。**

```tsx
// リクエストデータ取得
const requestData = await JSON.parse(req.body);
const { pngData: pngDataAsBase64 } = requestData;
// base64 の先頭部分の data:image/png;base64, は不要なので削除する
const fileData = pngDataAsBase64.replace(/^data:\w+\/\w+;base64,/, '');
// base64 でデコード (new Buffer() は非推奨らしいので Buffer.from を使用)
const buffer = Buffer.from(fileData, 'base64');
// ファイル保存
fs.writeFileSync('./hoge.png', buffer);
```

これでぶじ canvas を画像化してサーバに保存することができた🎉

おわり。

## 参考

- [[Node.js] Base64エンコードされたファイルデータをデコードして、S3にputObjectする](https://dev.classmethod.jp/articles/node-js-base64-encoded-image-to-s3/)