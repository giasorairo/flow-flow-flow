---
title: '[node.js] ディレクトリが存在しているかどうか、ディレクトリにアクセス権があるかどうかを調べたい'
date: '2022/5/8'
excerpt: ''
cover_image: ''
category: 'プログラミング'
tags: 'node.js'
keywords: 'node.js'
---

## 要件

electron アプリで、ダウンロードしたファイルをユーザが指定したディレクトリに保存したい。そのとき、ユーザが指定したディレクトリが存在するのか、そのディレクトリに対するアクセス権限があるのかを確認したい。

## やること

1. ユーザが指定したディレクトリが存在しているかどうか確認する
2. ユーザが指定したディレクトリへのアクセス権限があるかどうかを調べる

## fs.exists でディレクトリが存在しているかどうかを確認する

fs.existsSync を使用して下記のように書いていたけれど、exists は非推奨らしい。

```tsx
if (fs.existsSync(path)) {
	// ok
}
```

## fs.access でディレクトリが存在しているかどうか、アクセス権限があるかどうかを同時に調べる

fs.accessSync というメソッドを使用する

なんかディレクトリが存在しない場合と、アクセス権限がない場合を `try {} catch() {}` で書かないといけないのがすごい違和感ある。
できれば boolean で返してほしい。


```tsx
try {
  fs.accessSync(path);
	// ok
  return true;
} catch (error) {
	// ng
  return false;
}
```

accessSync の第2引数で、アクセス権限を指定できる。

- fs.constants.F_OK - 読み取り、書き込み、実行権限がある
- fs.constants.R_OK - 読み取り権限がある
- fs.constants.W_OK - 書き込み権限がある
- fs.constants.X_OK - 実行権限がある
- 第２引数に何も指定されていない場合は fs.constants.F_OK (読み取り、書き込み、実行権限がある) と同値。

```tsx
try {
	// ディレクトリ/ファイルが存在しているかつ、書き込み権限があるかどうか
  fs.accessSync(path, s.constants.R_OK);
	// ok
  return true;
} catch (error) {
	// ng
  return false;
}
```

## まとめ

💪

## 参考

- **[Node.js => ファイルシステムI / O](https://learntutorials.net/ja/node-js/topic/489/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0i---o)**
- **[Node.js v18.1.0 documentation](https://nodejs.org/api/fs.html#fsaccesssyncpath-mode)**