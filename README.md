
texファイルを監視し、MathJaxを用いて数式に直して表示するソフト

TeX専用のエディタを使いたくないが、
ファイルをコンパイルすることなくプレビューがみたい
という場合を想定した。

現在xypicも利用可


使い方
texファイルの入ったtexディレクトリを選択
後は、頑張ってTeX打ち

build方法
node.jsをいれ、
`npm install`
`npm install -g bower`
`npm install -g gulp`
`npm install -g electron-prebuilt`
`bower install`
`gulp make`

でreleaseにいろいろできます。
src/app/ で`electron .`でデバッグも可
