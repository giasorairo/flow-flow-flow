---
title: '[Express] Reactで作成したSPAをExpressで建てたサーバにホスティングして、静的ファイルとしてレスポンスするようにすると、URL直打ちで404が返ってくる'
date: '2021/11/5'
excerpt: 'Express で建てたサーバに React プロジェクトをホスティングして、静的ファイルでレスポンスさせると、ルート以外のURL直打ちで404が返ってくるので、ちゃんとページが返ってくるようにしたい'
# cover_image: '/images/collection/css.png'
category: 'React,Node.js,Express'
---

## 目次

- [やりたいこと](#やりたいこと)
- [エラー内容](#エラー内容)
- [調査](#調査)
- [解決](#解決)

## やりたいこと

Express で建てたサーバに React プロジェクトをホスティングして、静的ファイルでレスポンスさせると、ルート以外のURL直打ちで404が返ってくるので、ちゃんとページが返ってくるようにしたい。

## エラー内容

```bash
Failed to load resource: the server responded with a status of 404 (Not Found)
```

## 調査

- 参考記事
    - **[react-routerを使ったアプリケーションでURL直叩き(or F5)すると404になる](https://dev-daikichi.hatenablog.com/entry/2019/04/17/144159)**
    - **[Reactをexpressにホストする](https://qiita.com/zaburo/items/27a985a99cdb02412420)**

どうやらすべてのリクエストに対してpublic/index.html を返すようにしないといけないらしい。で、これをrewrite設定というらしい。

```tsx
app.use('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '/public', 'index.html'));
});
```

はい。

つまり、SPAはクライアントでルーティングしているだけで、SPAにログイン画面があってそのpathが /login だったとしても、サーバはそのリクエストのURLに対してルーティングを準備していないから404が返っていたというわけか。だから/login でリクエストが飛んできても、 index.html を返すようにしておかないといけない。

create-react-app の公式に記述があるとのことなので、一応読んでおく。

- [Serving Apps with Client-Side Routing](https://create-react-app.dev/docs/deployment/#serving-apps-with-client-side-routing)

## 解決

今回の自分の場合は /admin でのリクエストで管理アプリの index.html を静的ファイルとして返していたので、下記のように /admin/* でリクエストが来たときも index.html をレスポンスするようにすればいい。

```tsx
// 静的ファイルとしてレスポンス
app.use('/admin', express.static(`${__dirname}/public/admin`));

//　admin/*　でリクエストが来たときは　public/admin/index.html を返す
app.use('/admin/*', (req, res) => {
  res.sendFile(`${__dirname}/public/admin/index.html`);
});
```

でもこれだけではだめだった。

React のSPAをビルドするときの設定を変更しないといけないらしい。

- 参考記事
    - [create-react-appのアプリをExpress内で配置、配信する](https://ichi-bit.hateblo.jp/entry/2017/11/23/create-react-app%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92Express%E5%86%85%E3%81%A7%E9%85%8D%E7%BD%AE%E3%80%81%E9%85%8D%E4%BF%A1%E3%81%99%E3%82%8B)

package.json で homepageプロパティを設定する必要がある。今回は /admin が管理アプリのルートになるので下記のように記述を追加する。

```json
{
	"homepage": "/admin",
}
```

これで再ビルドして、ビルドしたファイルをExpressにホスティングするとちゃんとURL直打ちでも、再読み込みでも正常にページが表示されうようになった！

おしまい。