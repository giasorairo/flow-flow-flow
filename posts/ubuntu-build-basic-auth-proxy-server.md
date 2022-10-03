---
title: '[ubuntu] conoha vpn に basic 認証つきのプロキシサーバを立てる'
date: '2022/4/20'
excerpt: ''
# cover_image: '/images/collection/css.png'
category: 'プログラミング'
tags: 'linux'
keywords: 'linux,ubuntu,proxyサーバ,basic認証'
---

仕事で toB 向けの electron アプリをリリースしたのですが、とある企業が認証プロキシを使用しているらしく、アプリがネットワークエラーになるという報告があがってきました。electron のドキュメントを読むと、プロキシサーバに認証情報を送るのは、app.on(’login’) というのを使えば実装できそうであるということはすぐにわかりました。

ただ弊社環境には認証プロキシサーバがありません。

バックエンドの方に依頼するにもとても忙しそうです。

自分でやるしかなさそうなので自分で認証つきのプロキシサーバを立てることにしました👼

conoha vps にプライベートのサーバが 1 個あったのでそれを使うことにしました。こういう時のためにラズパイとか持ってたら便利なんだろうなとおもいました。そのうち買います。

## サーバに ssh 接続

```bash
$ ssh username@xxx.xxx.xxx.xxx
```

## squid install

```bash
# squid インストール
$ sudo apt install squid

# バージョン確認
$ squid -v
```

## squid で使用する 3128 port を解放

squid を利用するためには 3128 port を解放する必要があるらしいので、解放

```bash
# 3128 port 解放
$ sudo ufw allow 3128

# 確認
$ sudo ufw status
Status: inactive

# 非アクティブなので、アクティブにする
$ sudo ufw enable

Command may disrupt existing ssh connections. Proceed with operation (y|n)? y

# もういちど確認
$ sudo ufw status

Status: active

To                         Action      From
--                         ------      ----
3128                       ALLOW       Anywhere                  
3128 (v6)                  ALLOW       Anywhere (v6)

# ok
```

## 特定の pc からのアクセスを許可する

- 自分の pc の ip アドレスを調べられるサイト
    - [https://www.cman.jp/network/support/go_access.cgi](https://www.cman.jp/network/support/go_access.cgi)

```bash
# squid の設定ファイルを編集
$ vi /etc/squid/squid.conf

# Example rule allowing access from your local networks.
# Adapt localnet in the ACL section to list your (internal) IP networks
# from where browsing should be allowed
#http_access allow localnet
http_access allow localhost
acl testacl src xxx.xxx.xxx.xxx/32 // 追記 (xxx は自分の pc の ip アドレス)
http_access allow testacl          // 追記
# And finally deny all other access to this proxy
http_access deny all

#  TAG: adapted_http_access
#       Allowing or Denying access based on defined access lists
#

# これ何のためのコマンドかわからんので後でしらべる
$ squid -z

# 設定ファイルを反映させるため、squid を再起動させる
$ service squid start

```

windows proxy を設定したあと [https://www.cman.jp/network/support/go_access.cgi](https://www.cman.jp/network/support/go_access.cgi) にアクセスすると、ip アドレスが、ちゃんとプロキシサーバの ip になっていれば成功🎉

## basic 認証をつける

```bash
# apache2-utils を install
$ sudo apt-get install apache2-utils

# htpasswd コマンドで任意のディレクトリにパスワードファイルを作成 (user のところは任意の username)
$ sudo htpasswd -c /etc/squid/.htpasswd user
New password: 
Re-type new password: 
Adding password for user user

# 設定ファイルを作成
$ sudo touch /etc/squid/conf.d/basic_auth.conf

# 設定を記述
$ sudo vi /etc/squid/conf.d/basic_auth.conf

# パスワードファイルのパス
auth_param basic program /usr/lib/squid/basic_ncsa_auth /etc/squid/.htpasswd
auth_param basic children 5
auth_param basic realm Squid Basic Authentication
# 1h の間だけ認証が有効
# auth_param basic credentialsttl 1 hours
# 今回はテストで使いたいので 1 min で認証が切れるように設定
# auth_param basic credentialsttl 1 minute
acl password proxy_auth REQUIRED
http_access allow password
```

## おまけ

## 3128 port だけ解放するようにしてたら、サーバに ssh できなくなったのでちゃんと 22 port を開けておく

```bash
# 22 port を開ける
$ sodu ufw allow 22

# 確認
$ sudo ufw status

To                         Action      From
--                         ------      ----
3128                       ALLOW       Anywhere                  
22                         ALLOW       Anywhere                  
3128 (v6)                  ALLOW       Anywhere (v6)             
22 (v6)                    ALLOW       Anywhere (v6)
```

## 参考

- [Squidによるプロキシサーバー構築手順【Ubuntu】](https://self-development.info/squid%E3%81%AB%E3%82%88%E3%82%8B%E3%83%97%E3%83%AD%E3%82%AD%E3%82%B7%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E6%A7%8B%E7%AF%89%E6%89%8B%E9%A0%86%E3%80%90ubuntu%E3%80%91/)
    - この記事を参考に進めた
- ****[iptablesが難しいためufwでWEBサーバーのファイアウォール設定](https://qiita.com/shimakaze_soft/items/c3cce2bfb7d584e1fbce)****
    - ufw status が非アクティブになったのでそれを回避する方法を調べた
- [[Ubuntu][20.04] Squidでラボ用HTTP/HTTPS proxyを作る](https://eng-investor.com/ubuntu-http-proxy-by-squid/)
    - pc からプロキシ設定してもうまく proxy サーバに繋がらないなと思って調べたら、squid の初期設定では [localhost](http://localhost) 意外は拒否する設定になっているらしい。
- [ConoHaはじめてのProxyサーバー構築](https://qiita.com/tRrLM/items/5e41805a067772deb337)
- ****[proxyサーバ squidでアクセス時に認証を要求する設定](https://pcvogel.sarakura.net/2013/06/25/31156)****
    - proxy の認証には basic 認証と digest 認証というのがあるらしい
- [Raspberry Pi 4にSquidでbasic認証付きプロキシサーバを立てる](https://zenn.dev/trpla226/articles/fca7c18f807f25aad47d)
    - proxy サーバでの basic 認証の入れ方がわかりやすい
    - `sudo htpasswd -c /etc/squid/htpasswd user` -> `sudo htpasswd -c /etc/squid/.htpasswd user`