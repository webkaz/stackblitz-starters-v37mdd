# 起動コマンド

npm install && npx next dev

# Sharpの使い方
https://note.affi-sapo-sv.com/nodejs-sharp.php
https://blog.kozakana.net/2019/04/sharp-image-processing/

# まだ、StackBlitzでSharpのSVG処理は実行できない
https://blog.stackblitz.com/posts/bringing-sharp-to-wasm-and-webcontainers


# 合成部分の詳細仕様の整理

1. コピーライトの文字列から文字の画像を生成し、商品画像に合成する
1. 合成位置は、右下
1. フォントの大きさは、画像の高さの1/10で、最小20px
1. 文字全体の幅が、画像の幅の1/2を超える場合は、コピーライト文字列のスペース位置で改行する
1. スペース分割しても収まらない場合は、最大で画像幅まで許容する
1. それでも収まらない場合は、エラーログを出力して次の画像の処理


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
