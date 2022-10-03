---
title: '[electron] showMessageBox でダイアログの close ボタンを押下された場合の処理を制御したい'
date: '2022/5/27'
excerpt: ''
cover_image: ''
category: 'プログラミング'
tags: 'electron'
keywords: 'electron,net::ERR_CERT_DATE_INVALID'
---

## はじめに

showMessageBox で表示したダイアログの選択肢とは別に、ダイアログの x ボタンを押下した場合の処理が必要になって調べたのでメモ。

## 問題

たとえば「アプリの自動アップデート時に、確認ダイアログを出してほしい」という要件があったとして、こんなかんじのダイアログを実装したとします。

実装はこんなかんじ。

```tsx

// アプリ終了確認ダイアログのprops設定
const option: Electron.MessageBoxSyncOptions = {
  type: 'info',
  title: 'アップデート',
  message: '新しいバージョンをダウンロードしました。\n再起動して更新を適用しますか？',
  buttons: [
    '更新して再起動', // 0
    '次回起動時に自動更新', // 1
  ],
};
const returnNumber = dialog.showMessageBoxSync(option);
// 更新して再起動が押下された場合
if (returnNumber === 0) {
  // ...
}
// 次回起動時に自動更新が押下された場合の処理
if (returnNumber === 1) {
	// ...
}
```

表示されるダイアログはこんな感じ。(windows)

![electron-message-dialog.png](/images/collection/electron-message-dialog.png)

この場合ぱっと見の処理は、「更新して再起動」と「次回起動時に自動更新」のふたつのように思えますが、実際は x ボタン押下時の処理も対応しないといけません。ちなみに mac だと x ボタンは表示されません。

showMessageBoxSync の返り値は、buttons プロパティの index に依存するので、今の実装の場合返り値は下記のとおりです。

- 更新して再起動押下 - 返り値 0
- 次回起動時に自動更新押下 - 返り値 1

ふたつのボタンのどちらが押下されたのかはこの返り値で判断が可能です。

では x ボタンを押下した場合の返り値は何でしょうか。現状だと 0 が返ってきます。これは「更新して再起動」と同じ返り値なので、どちらが押下されたのかは判断できません。

## 解決: cancelId を指定すればいい

x ボタン押下時の処理が、「更新して再起動」と同じ処理で良いという仕様ならば別に困りませんが、もし異なる処理を実装しなければいけない場合は困ります。x ボタンが押下された場合は、別の値を返してほしいです。そのためにに cancelId というオプションがあります。

```tsx
// アプリ終了確認ダイアログのprops設定
const option: Electron.MessageBoxSyncOptions = {
  type: 'info',
  title: 'アップデート',
  message: '新しいバージョンをダウンロードしました。\n再起動して更新を適用しますか？',
  buttons: [
    '更新して再起動', // 0
    '次回起動時に自動更新', // 1
  ],
	cancelId: 100, // windows で ダイアログの x ボタンを押下されたときの返り値
};
const returnNumber = dialog.showMessageBoxSync(option);
// 更新して再起動が押下された場合
if (returnNumber === 0) {
  // ...
}
// 次回起動時に自動更新が押下された場合の処理
if (returnNumber === 1) {
	// ...
}
// ダイアログの x ボタンを押下された場合の処理
if (returnNumber === 100) {
	// ...
}
```

これでダイアログの x ボタン押下時は 100 が返ってくるので、条件分岐が可能になりました🎉

そもそも x ボタン非表示のオプション持っててくれよと思わなくもないです。

## 参考

[https://www.electronjs.org/ja/docs/latest/api/dialog](https://www.electronjs.org/ja/docs/latest/api/dialog)