---
title: '[CSS] Sass入門して、Next.jsで作ったブログ(このブログ)のCSSをSassに置き換えたい'
date: '2021/9/25'
excerpt: 'このブログのCSSをSassに置き換えたい。自分はフロントエンジニアなのに、業務ではCSSを書かないので、ほとんどCSSが書けない。このブログのcssも'
cover_image: '/images/collection/css.png'
category: 'CSS'
---

## 目次
- <a href="#1">やりたいこと</a>
- <a href="#2">下調べ</a>
- <a href="#3">dart-sassをinstallする</a>
- <a href="#4">ファイルの拡張子を.cssから.scssに更新して、Sass記法で書いてみる</a>
- <a href="#5">.scssファイルはコンポネントでは読み込めない？</a>
- <a href="#6">まとめ</a>
- <a href="#7">追記</a>
  - <a href="#8">メディアクエリもネストで書けるのめちゃめちゃいいなと思った</a>

<a id="1"></a>

## やりたいこと
このブログのCSSをSassに置き換えたい。

自分はフロントエンジニアなのに、業務ではCSSを書かないので、ほとんどCSSが書けない。このブログのcssも.cssファイルにベタ書きしている。でも転職などを考えた際に、フロントエンドなのにCSS書けないのはたぶん転職の幅を狭めてしまうとおもっていたので、いつかCSSは勉強しないといけないなと思っていた。それに個人開発するにあたってはCSSも必須になってくるし。

で、ちょうどこのブログがあるので、このブログの.cssを.sassに置き換えることを目標に頑張ろうと決めた。

<a id="2"></a>
## 下調べ
node-sassというSASSコンパイラを入れればいいと思っていたけれど、どうやらいまは非推奨になっているらしい。dart-sassというのをいれるべきらしい。

- [[LibSass非推奨化]node-sassとのお別れ ~ Dart Sassへ移行する](https://deep.tacoskingdom.com/blog/48)
- [create-react-appでSassを使う手順](https://penpen-dev.com/blog/create-react-app-sass/)

<a id="3"></a>

## dart-sassをinstallする

```sh
$ npm i -D sass
```

<a id="4"></a>

## ファイルの拡張子を.cssから.scssに更新して、Sass記法で書いてみる

- 1.ネスト

ブロック単位で書けて、とても見やすい。

```sass
.nav {
  padding: 10px;

  ul {
    list-style: none;
  }
}
```

- 2.変数

CSSよりもシンプルに変数定義ができてよい。
```sass
$primary-color: rgb(79, 126, 255);

a {
  color: $primary-color;
}
```

- 3.パーシャル

ファイルを分割できていい。
```sass
@use './variables';

h1 {
  color: variables.$primary-font-color;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0.5rem 0;
}
```

- 4.mixin
mixinに関してはReactでコンポネントを分けてるので、このブログでは特に使わなくても大丈夫そう

スタイルを関数化できるみたいなので、必要なときがきたら使ってみよう。

<a id="5"></a>

## .scssファイルはコンポネントでは読み込めない？
.scssファイルを個別に作ったコンポネントで読み込もうとしたら `Global CSS cannot be imported from files other than your Custom <App>. ...` というエラーがでた。_app.tsxで読み込んでねみたいなことらしい。_app.tsxで.scssファイルを読み込むようにしたらエラーは消えた。

じゃあ個別のコンポネントのファイルに.scssを読み込むときはどうすれば良いのかと思って調べたら、CSS Modulesと同じようにして読み込めるらしい。ファイル名を `hogehoge.module.scss` とすればコンポネントのファイルから読み込んでもエラーが出ない。

```typescript
import styles from './hoge.module.scss'
```

それと、CSS Modules としてCSSを書くと `className={styles.card}` みたいにしないといけないので、ケバブケースでスタイルのクラス宣言できないの不便だなあってずっと思ってたけど、ブラケット記法で記述すればいいだけの話だった。`className={styles['card-title']}`みたいなかんじ。

<a id="6"></a>

## まとめ
ネストと変数定義とファイル分割のおかげで、かなり見た目がスッキリした気がする。Sass記法もかなり読めるようになったし、これで仕事でちょっとしたCSSの修正をしたいときも自分でできるようになったはず。とはいえCSSは命名規則とか気にするの面倒だなあというのがつきまとうので、次は Tailwind CSS に置き換えてみようかな。

おしまい！

<a id="7"></a>

## 追記

<a id="8"></a>

## メディアクエリもネストで書けるのめちゃめちゃいいなと思った

これは最高。
```sass
.thumbnail-wrapper {
  background: linear-gradient(
    to right bottom,
    variables.$thumbnail-background-gradation-color-start,
    variables.$thumbnail-background-gradation-color-end,
  );
  margin: 2rem 0 1rem 0;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    height: 300px;
    max-height: 300px;
    object-fit: cover;
  }
  // これ！最高！
  @media screen and (max-width: 600px) {
    img {
      height: 200px;
    } 
  }
}
```
