---
title: '[PlantUML] vscode で PlantUML 環境セットアップ'
date: '2022/5/3'
excerpt: ''
cover_image: ''
category: 'tool'
---

早速やっていく💪

## java をインストール

[java.com](https://java.com/ja/) からインストール

ダウンロードしたインストーラを実行

## graphviz をインストール

コマンドを実行してインストールする。5min くらい時間かかる

```bash
$ brew install graphviz
```

## vscode に拡張機能 PlantUML を追加

PlantUML で検索すれば出てくる

![スクリーンショット 2022-05-03 20.39.12.png](/images/collection/plantuml-setup-on-vscode/スクリーンショット_2022-05-03_20.39.12.png)

## プレビューテスト

test.puml というファイルを作成する

```text
@startuml
Bob -> Alice: hello
@enduml
```

mac だと vscode で test.puml を開いて alt + D でプレビューできる

![スクリーンショット 2022-05-03 20.42.54.png](/images/collection/plantuml-setup-on-vscode/スクリーンショット_2022-05-03_20.42.54.png)

## 書き出しテスト

shift + ⌘ + P で入力フォームを表示させて、PlantUML: Export Current File Diagram を選択する

![スクリーンショット 2022-05-03 20.45.33.png](/images/collection/plantuml-setup-on-vscode/スクリーンショット_2022-05-03_20.45.33.png)

書き出すファイルの拡張子を選択する

![スクリーンショット 2022-05-03 20.47.09.png](/images/collection/plantuml-setup-on-vscode/スクリーンショット_2022-05-03_20.47.09.png)

書き出した

png

![index-db.png](/images/collection/plantuml-setup-on-vscode/index-db.png)

svg

![index-db.svg](/images/collection/plantuml-setup-on-vscode/index-db.svg)

あとは書き方に慣れていけば大丈夫そう。

## まとめ

さいきん仕様書が存在しない保守案件に入ることがあって、かなり精神的に参っていた。コードから仕様を理解しないといけないという作業がかなりしんどかった。どうにかしてコードの見通しを良くしようと思って、図を作成しようと思って、できれば git で管理して今後もメンテしたいと思ったので、PlantUML を使用するに至った。

頑張っていきたい💪