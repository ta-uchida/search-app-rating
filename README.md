# Search App Rating

## Description

- `urls`ファイルに記載したURLへアクセスし、アプリのRatingを取得してコンソールに表示する
- `Google Play`, `App Store`に対応している
  - それ以外のURLを指定されると落ちる

## Precondition
- Node.js >= v10.14.2
- npm >= 6.4.1
これより下位バージョンでも動くとは思う。
単にローカル環境のバージョンを記載した。

## Prepare
```
git clone [this repository url]
cd search-app-rating
npm i --no-edit

# optional
# urlsファイルに必要なURLを記載する
```

## Run
```
npm start
```
