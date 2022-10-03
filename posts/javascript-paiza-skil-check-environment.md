---
title: '[JS] VSCode x JavaScript(es6) 環境で paiza のスキルチェックのコーディングをしたいのでいろいろ設定した'
date: '2022/3/19'
excerpt: ''
cover_image: ''
category: 'プログラミング'
tags: 'javascript'
keywords: 'javascript'
---

## やりたいこと

アルゴリズム系の実装力をつけるために paiza のスキルチェックをやっているけれど、スキルチェックのエディタでは流石にコーディングしづらいので、VSCode で書いて、そのコードをコピペするようにしたいなと思った。

求める環境としては以下ふたつ

- `$ node paiza.js` を実行すればスクリプトを実行できる
- `$ npm run test` で jest でテストできる

ただ、Node.js で実行するとなると Common.js で記述しないといけなくて、それは本当にいやなので、ES6 で記述できるようにして、Jest も ES6 で通るように設定する必要がある。

## ES6 で記述したコードを Node.js で実行する方法

関数のテストをするためにはコードを expoet しないといけないのでこんなコードを書いたとする。

```jsx
// paiza.js

export const sum = (a, b) => a + b;
console.log(sum(1, 1));
```

このコードを実行するために、下記のコマンドを実行する

```bash
$ node paiza.js
```

こんな感じのエラーが出る

```bash
$ node paiza.js
(node:50194) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/Users/username/dev/paiza/paiza.js:1
export const sum = (a, b) => a + b;
^^^^^^

SyntaxError: Unexpected token 'export'
```

これは export が ES6 の記法だからということらしい。

Common.js の記述を使用して書くなら下記のようになる

```jsx
// paiza.js

const sum = (a, b) => a + b;
console.log(sum(1, 1));

module.exports = sum;
```

これで実行するとうまくいく

```bash
$ node paiza.js
2
```

ただ、自分はフロントエンジニアで Common.js でコードを書くことなんてほとんどないので、ES6 で書いていきたい。どうすればいいのかは、さっきのエラーに書いてある通り。

いくつか方法が提示されているけど、ここでは package.json に `"type": "module"` を追加する方法をとる。

```bash
$ node paiza.js
(node:50194) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/Users/username/dev/paiza/paiza.js:1
export const sum = (a, b) => a + b;
^^^^^^

SyntaxError: Unexpected token 'export'
```

package.json を作成する (ない場合は)

`$ npm init` したら対話形式でいろいろ入力を迫られるけど、とりあえず Enter 連打🙃

```bash
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (paiza) 
version: (1.0.0) 
description: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/username/dev/paiza/package.json:

{
  "name": "paiza",
  "version": "1.0.0",
  "main": "paiza.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "type": "module",
  "description": ""
}

Is this OK? (yes)
```

生成された package.json に `"type": "module"` を追加する。

```json
// package.json
{
	...
	"type": "module"
}
```

これでもう一度 ES6 の記述に戻して実行すると、今度はちゃんと実行される

```jsx
// paiza.js

export const sum = (a, b) => a + b;
console.log(sum(1, 1));
```

```json
$ node paiza.js
2
```

無事、Node.js で ES6 で書いたコードが実行できるようになった💪

## テストも書きたいので、jest の環境も作っていく

なにはともあれまずは jest をインストール

```bash
$ npm install --save-dev jest
```

ES6 の記述でテストコードを書く

```jsx
// paiza.spec.js

import { sum } from './paiza';

describe('sum', () => {
  test('1 + 1 = 2', () => {
    expect(sum(1, 1)).toBe(2);
  });
});
```

package.json の scripts に追加

```json
// package.json
{
  "scripts": {
    "test": "jest"
  }
}
```

いざ、テスト！

```json
$ npm run test

> paiza@1.0.0 test
> jest

 FAIL  src/paiza.spec.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /Users/username/dev/paiza/src/paiza.spec.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import { sum } from './paiza';
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1728:14)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.379 s
Ran all test suites.

```

この世の終わりみたいな長文エラーがでます。

これは jest もまた Common.js しか理解してくれないためです。(imprt のところが ES6 の記述。Common.js なら require)

なので、jest にも ES6 で書いたコードを理解してもらうための設定をスクリプト実行時のオプションで追加します。

ここに詳しく書いてあります

- [https://jestjs.io/ja/docs/ecmascript-modules](https://jestjs.io/ja/docs/ecmascript-modules)

```json
// package.json
{
	"scripts": {
    "test": "NODE_OPTIONS=\"--experimental-vm-modules --no-warnings\" jest",
  },
}
```

これでもう一度テストを実行します

```bash
$ npm run test

> paiza@1.0.0 test
> NODE_OPTIONS="--experimental-vm-modules --no-warnings" jest

 PASS  src/paiza.spec.js
  sum
    ✓ 1 + 1 = 2 (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.365 s, estimated 1 s
Ran all test suites.
```

わーい。ちゃんとテストが実行されて、パスしました🎉

これで ES6 で記述できて、テストまで書ける環境が構築できました🎉

### おまけ

テストを常駐させたい時のスクリプトも置いておきます✌️

```json
// package.json

{
	"scripts": {
    "test": "NODE_OPTIONS=\"--experimental-vm-modules --no-warnings\" jest",
    "test:watch": "NODE_OPTIONS=\"--experimental-vm-modules --no-warnings\" jest --watchAll"
  },
}
```

## おまけ2

リポジトリ作ったので、自分と同じような環境でスキルチェックのコーディングされたい方は clone して使ってください⚡️

[https://github.com/giasorairo/paiza-skill-check-with-es6](https://github.com/giasorairo/paiza-skill-check-with-es6)

## 感想

これで開発体験がよくなったので、paiza のスキルチェックのモチベーションがちょっとあがった。かもしれない。

## 参考

- [[Node.js] Express のプログラムを ES6 の構文で記述する方法](https://mseeeen.msen.jp/express-for-es6/)
- [https://jestjs.io/ja/](https://jestjs.io/ja/)
- [JestをES6化してimport/exportを使う方法](https://zenn.dev/dozo/articles/0091f1a3e790d6)

おしまい。