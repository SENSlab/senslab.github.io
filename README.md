# senslab.github.io

某研究室HPのソースコード。

## Information for maintainers

### 記事の更新

※ Publicationの情報はGoogleスプレッドシートから動的に取得しているので、そちらを編集してください。

#### 初回のみ

1. Node.jsをインストールする
2. Gitをインストールする
3. GitHubのアカウント登録とSSH Keyの登録をする
4. Git Bashを開き、このリポジトリをCloneする<br>`git clone git@github.com:SENSlab/senslab.github.io.git`

#### ルーティン

1. リモートリポジトリ(GitHub)と同期させて最新の状態にする<br>`git pull`
2. Nodeパッケージに変更があればインストール<br>`npm install`
3. 編集
   * 各ページのHtmlは`src/app/xxxxx/xxxx.component.html`
   * News, History, Researches, Membersの情報を格納しているJSONとリーフレットのPDFは`src/data`の中
   * 各種写真は`src/images`の中
3. 仮のサーバーを立ち上げて変更内容を確認<br>`npm start -- -o`(勝手にブラウザが開きます。確認後は`<Ctrl> + c`で終了)
4. 変更をステージ<br>`git add -A`
5. コミット<br>`git commit -m "適当なコミットメッセージ"`
6. 本番サーバーに変更を反映<br>`npm run deploy`
7. 変更後のソースコードをリモートリポジトリ(GitHub)にアップロード<br>`git push origin develop`

### メンバー写真

メンバー写真は350*350pxのjpg形式です。


## Information for developpers

### Angular

開発には`Angular`（オープンソースのフロントエンドWebフレームワーク）を利用しています。
Angularは`TypeScript`をデフォルトのプログラム言語とし、`Node.js`を実行環境とするフレームワークです。
大幅な改修をする際は、最初にNode.jsの基本的な使い方の勉強と、Angularのチュートリアルを試すことをおすすめします。

* [Angular公式チュートリアル(Tour of Heroes)](https://angular.io/tutorial)
* [coursetroのAngularチュートリアル](https://coursetro.com/posts/code/154/Angular-6-Tutorial---Learn-Angular-6-in-this-Crash-Course)
  * こちらの方が簡潔にまとまっている気がする

AngularはGoogleを中心とする開発コミュニティが開発を進めているフレームワークで、2018年現在6ヶ月ごとのmajor releaseが企画されています。
このリポジトリではAngularの非常に基本的な機能しか使っていないため、神経質にAngularのバージョンを更新する必要はありません。
ただ、Angularには簡単にバージョン移行をするためのツールが用意されていますので、できるだけ最新の状態に保つようにご協力ください。

>**Tips**
>
>Angularは以前、AngularJSという名前でJavaScriptをデフォルトの言語として開発が行われていました。
>その後version 2をリリースするタイミングでAngularという名前に変わり、言語をTypeScriptに切り替えるなど大幅な変更が加わりました。
>ネットで記事を検索する際、AngularJSと題された記事は古いものであることに留意してください。

### Bootstrap + Material Design

デザインは主に`Bootstrap`を利用して作成しています。
また一部で`Material Design for Bootstrap`のUIコンポーネントを使用しています。
これらはNode.jsのパッケージ管理システム`npm`を通してインストールしています。

jQueryはファイル容量とレンダリング速度を重くする上、多用するとバグを埋め込みやすくなるため利用していません。
ボタンを押したときに処理などは大抵Angularの機能で実装できるので、できるだけそちらの方法を検討してください。
