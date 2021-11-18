---
title: '[cookie] 開発中にlocalhostと別ドメインのAPIサーバ間のcookieの受け渡しがうまくできないときはReactのproxyを設定するといい'
date: '2021/11/18'
excerpt: 'やりたいこと: APIとクライアントアプリを別のプロジェクトとして開発しているとき、クライアントアプリをlocalhostで起動させて、APIのテストサーバと通信させる。'
# cover_image: '/images/collection/css.png'
category: 'バックエンド,フロントエンド,React'
---

## やりたいこと

APIとクライアントアプリを別のプロジェクトとして開発しているとき、クライアントアプリをlocalhostで起動させて、APIのテストサーバと通信させる。そのとき認証でcookieが必要になるけど、samesiteとかsecureの問題でcookieの受け渡しができないので、ちゃんとcookieの受け渡しを行えるようにしたい。

## 解決法

cookieとかsamesiteとかsecureとかについていろいろ調べたけど、まず解決方法を記述しておく。調査内容に関してはあとで書く。

- フロント(React)側の設定
    
    ```tsx
    (async () => {
      try {
        await fetch(
          '/api/hoge',
          {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
          },
        )
          .then((res) => res.json())
          .then((json) => console.log(json));
      } catch (e) {
        console.log(e);
      }
    })();
    ```
    
    ```json
    # package.json
    
    {
      "proxy": "https://hoge.com", // APIサーバのURL
    }
    ```
    
    >こうすると`http://localhost:3000`に対するリクエストのうち、`Accept`ヘッダが`text/html`以外のリクエストを全て`https://hoge.com`にproxyします。
    Reactアプリから`fetch("/api/auth")`を実行した場合、ブラウザは`http://localhost:3000/api/auth`にリクエストを投げ、開発サーバが`https://hoge/api/auth`にproxyします。
    ブラウザから見れば`http://localhost:3000/api`にアクセスしているように見えるのでSameOriginポリシーに引っかかりません。
    <br><br>
    引用元: [知っていると捗るcreate-react-appの設定](https://qiita.com/geekduck/items/6f99a3da15dd39658fff#%E9%96%8B%E7%99%BA%E4%B8%AD%E3%81%ABapi%E3%82%B5%E3%83%BC%E3%83%90%E3%81%AB%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%92%E6%8A%95%E3%81%92%E3%81%9F%E3%81%84)
    > 
    - 参考記事
        - [React開発時には、APIサーバーとReactアプリサーバーを別にして、プロキシを使うというベスト・プラクティス](https://applingo.tokyo/article/1568)
        - [知っていると捗るcreate-react-appの設定](https://qiita.com/geekduck/items/6f99a3da15dd39658fff#%E9%96%8B%E7%99%BA%E4%B8%AD%E3%81%ABapi%E3%82%B5%E3%83%BC%E3%83%90%E3%81%AB%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88%E3%82%92%E6%8A%95%E3%81%92%E3%81%9F%E3%81%84)
- サーバ側設定
    
    ```tsx
    import express from 'express';
    import index from './routes/index';
    import { config } from 'dotenv';
    import cors from 'cors';
    import session from 'express-session';
    import passport from './auth';
    
    const app = express();
    
    // ミドルウェア
    app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        maxAge: 2592000,
        httpOnly: false,
      }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    
    // cors
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    config();
    const port = process.env.PORT || 3000;
    
    // - ルーティング -
    app.use('/api', index);
    
    app.listen(
      port,
      () => {
        console.log(`Express start on port ${port} !!`);
      },
    );
    ```

## 調査内容

なぜクロスオリジン間(APIのテストーサーバとocalhost)でcookienの受け渡しができなかったのか。

- samesite
    - セキュリティ的な問題で、cookieは同origin間でしか受け渡しできないようになっている
    - これをクロスドメイン間で解決するにはsamesiteをnoneにする必要がある。
    - ただsamesiteをnonenにするとsecureをtrueにしなければいけなくなって、このsecureをtrueにするとhttps://間でしかcookieの受け渡しができなくなる。localhostはhttp://なので、cookieの受け渡しができない。詰み。
    - localのPCのdomaineをAPIサーバのドメインにしてみたりしたけどうまくいかなかった。

## 終わり

ずっとバックエンドの方でcookieの設定をいじっていたけれど、最終的にはReactの設定でなんとかなってよかった💪

バックエンドとフロントエンドを分断して開発するのは各々の責務に集中できていいと思うけど、そのせいでいろんな問題が起きるの面倒だなあとおもった。せせりさんがRailsで4日間くらいでアプリつくってて、自分もPHPだけでアプリケーションつくってるときのほうが考えること少なかった気がするなあと思ったり思わなかったり。

アプリ開発、もっとシンプルになってくれ🙏