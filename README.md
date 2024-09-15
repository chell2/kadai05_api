<div align="center">
<samp>

# ADA2nd 課題

💜  No.05 お天気アプリ(WebAPI) & No.06 JS選手権  💜

</samp>
</div>



### 1.プロダクト名

「TABLE VIEW <small>for restaurant Note🍷</small>」

### 2.課題内容（どんな作品？）

- 某料理店の常連兼副業スタッフである友人より依頼を受けて作り始めたテーブル管理ボードの試作です。
- シェフが独立直後のため、満席時は近くの店舗にお手伝いをお願いしているとのこと。
- 来店状況を共有でき、困った時はヘルプボタン1クリックでLINEグループに通知がいく仕組みとなっています。

🍷06追加機能
- 店舗の雰囲気やテーブル配置にあわせたデザインに修正しました。
- LINE通知先を自分で登録できます。
- ログイン機能をつけました。UserRoleにより表示できるページが変わります（デフォルトはViewer）
| UserRole |  ユーザー権限<br>の管理 | テーブル状況<br>の操作 | テーブル状況<br>の閲覧 |
| :-: | :-: | :-: | :-: |
| Admin | ⚪︎ | ⚪︎ | ⚪︎ |
| Editor | ー | ⚪︎ | ⚪︎ |
| Viewer | ー | ー | ⚪︎ |

### 3.DEMO

- https://kadai05-api.vercel.app/

### 4.作ったアプリケーション用のIDまたはPasswordがある場合

- なし

### 5.工夫した点・こだわった点

- 通知に気づきやすいツールとしてLINEを選びました。APIは、LINE Notifyを使用。
- 席ごとに滞在時間が表示されます。
- スマホで使うことを想定し、シンプルな画面、簡単な操作となるよう進めているところです。

🍷06追加機能
- FirebaseAuthenticationとFirestoreを使用しアカウント管理を行なっています。
- テーブル状況についてもFirestoreを使用し、編集ページの情報を閲覧ページで呼び出しています。

### 6.難しかった点・次回トライしたいこと(又は機能)

- 格闘中：WebSocketサーバーの作成（Socket.io）←リアルタイムの反映は継続課題
- ~~修正予定：店舗の雰囲気やテーブル配置にあわせたデザインに！~~ [済]
- ~~追加予定：アカウント管理を加えて編集権限・閲覧権限を区分~~ [済]
- 実はURLを直接入力すると権限外のページが見えてしまうのでどうにかしたい。

### 7.次回ミニ講義で聞きたいこと

- APIに限らずですが、あまりAPIを使用するとその提供終了時に困ることになるかと思います。
  そういった面で気をつける点や工夫できることがあれば教えていただきたいです。

### 8.フリー項目（感想、シェアしたいこと等なんでも）

- 使用技術関連
  - [App Router](https://nextjs.org/docs/app)
  - [Vercel](https://vercel.com/)
  - [LINE Notify](https://notify-bot.line.me/ja/) 
  - [Firebase Authentication](https://firebase.google.com/docs/auth?hl=ja) 
  - [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore?hl=ja) 