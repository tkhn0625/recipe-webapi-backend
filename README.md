# recipe-webapi-backend

# Node.js, Express, TypeScript環境の設定
1. npm init コマンドでpackage.jsonを作成する。
2. tsc --init　コマンドでtsconfig.jsonを作成する。
3. npm install --save express body-parser コマンドで本番環境に必要なパッケージをダウンロードする。
4. npm install --save-dev nodemon コマンドで開発環境に必要なパッケージをダウンロードする。
5. npm install --save-dev @types/node コマンドで開発環境に必要なパッケージをダウンロードする。
6. npm install --save-dev @types/express コマンドで開発環境に必要なパッケージをダウンロードする。
7. nodemonを実行するために、package.jsonのscriptに "start": "nodemon dist/app.js"　を追加する。