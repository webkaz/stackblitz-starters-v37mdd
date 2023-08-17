// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import * as fs from 'fs';
//import fsPromises from "fs/promises";
import path from "path";
import sharp from "sharp";
import texttosvg from "text-to-svg";

let fontSize = 30;
const svgOptions = {
  x: 0,
  y: 0,
  fontSize: fontSize,
  anchor: "left  top",
  attributes: { fill: "white", stroke: "black" },
};
const text2svg = texttosvg.loadSync();

/**
 * 文字列をSVGパスに変換
 * @param str
 * @returns svg
 */
async function genSvgStr(str: string) {
  const svgOptions = {
    x: 0,
    y: 0,
    fontSize: fontSize,
    anchor: "left  top",
    attributes: { fill: "white", stroke: "black" },
  };
  const svg = await text2svg.loadSync().getSVG(str, svgOptions);
  //console.log(svg);
  return svg;
}

export default async (req, res) => {
  const imageDir = path.join(process.cwd(), "images");
  const img_in_path: string = imageDir + "/pooh.avif";
  const img_out_path: string = imageDir + "/pooh_result.avif";
  const outputText = '© Disney. Based on the "Winnie the Poohdddd"';
  const outputText2 = "works by A.A. Milne and E.H. Shepard.";
  //元画像の読み込み
  const img = await sharp(img_in_path);
  const height = (await img.metadata()).height;
  const width = (await img.metadata()).width;

  await img
    .composite([
      {
        input: Buffer.from(await text2svg.getSVG(outputText, svgOptions)),
        top: height - fontSize * 2,
        left: width - (await text2svg.getMetrics(outputText, svgOptions).width),
      },
      {
        input: Buffer.from(await text2svg.getSVG(outputText2, svgOptions)),
        top: height - fontSize,
        left:
          width - (await text2svg.getMetrics(outputText2, svgOptions).width),
      },
    ])
    .toFile(img_out_path);

  //画像を反転させてコピー
  //const resultImg = await img.clone().flip().toFile(img_out_path);
  // await img.clone().flop().toFile(img_out_path);

  //生成したファイルのパスを返す
  res.status(200).json({ resultPath: "" });
};
