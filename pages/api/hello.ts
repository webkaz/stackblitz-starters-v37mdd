// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import * as fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import text2svg from 'text-to-svg';

async function genSvgStr(str: string) {
  const svgOptions = {
    x: 0,
    y: 0,
    fontSize: 40,
    anchor: 'left  top',
    attributes: { fill: 'white', stroke: 'black' },
  };
  const svgBuffer = await text2svg.loadSync().getSVG(str, svgOptions);
  console.log(svgBuffer);
  return svgBuffer;
}

export default async (req, res) => {
  const imageDir = path.join(process.cwd(), 'images');
  const img_in_path: string = imageDir + '/pooh.avif';
  const img_out_path: string = imageDir + '/conv1.png';
  const outputText = 'Kazuya YAMAWAKI';

  //元画像の読み込み
  const img = await sharp(img_in_path);

  //コメント追加

  const overlay = `<svg width="200" height="200">
    <text x="50%" y="50%" font-family="sans-serif" dominant-baseline="middle" font-size="30" text-anchor="middle">Lorem ipsum</text>
    </svg>`;

  await img
    .composite([
      {
        input: Buffer.from(overlay),
        gravity: 'center',
      },
    ])
    .png()
    .toFile(img_out_path);

  //画像を反転させてコピー
  const resultImg = await img.clone().flip().toFile(img_out_path);
  // await img.clone().flop().toFile(img_out_path);

  //生成したファイルのパスを返す
  res.status(200).json({ resultPath: resultImg.path });
};
