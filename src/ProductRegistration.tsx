import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import { staticFile } from "remotion";
import { TitleSequence } from "./TitleSequence";
import { Telop, TelopItem } from "./Telop";

// デモ用のテロップデータ（開始時間〜終了時間）
const telopData: TelopItem[] = [
  { startMs: 0, endMs: 5000, text: "ベルタエクリズム商品登録デモを開始します" },
  { startMs: 5000, endMs: 8000, text: "右上の**「商品を追加」**ボタンをクリックします" },
  { startMs: 8000, endMs: 12000, text: "**商品ID（商品名）**を入力します" },
  { startMs: 12000, endMs: 18000, text: "関連する**商材（ブランド）**をリストから選択します" },
  { startMs: 18000, endMs: 23000, text: "複数の商材を紐付けることも可能です" },
  { startMs: 23000, endMs: 30000, text: "対象となるECサイトのURLを入力します" },
  { startMs: 30000, endMs: 40000, text: "実際のサイトを確認し、URLに間違いがないかチェック" },
  { startMs: 40000, endMs: 44000, text: "内容を確認して**「登録」**をクリック！" },
  { startMs: 44000, endMs: 48000, text: "商品の登録が完了しました" },
  { startMs: 48000, endMs: 52000, text: "続いて、商品に紐付く**「オファー」**を設定します" },
  { startMs: 52000, endMs: 55000, text: "右側の**「オファーを追加」**をクリック" },
  { startMs: 55000, endMs: 70000, text: "オファーIDまたは名前で検索し、該当のプランを選択" },
  { startMs: 70000, endMs: 80000, text: "選択すると価格やサイクルが自動で反映されます" },
  { startMs: 80000, endMs: 85000, text: "内容に問題がなければ**「登録」**をクリック" },
  { startMs: 85000, endMs: 92000, text: "これで商品とオファーの紐付けが完了しました" },
  { startMs: 92000, endMs: 98000, text: "**「オファー情報」**タブでは、登録済みの全オファーを確認できます" },
  { startMs: 98000, endMs: 108000, text: "膨大なリストから検索機能で絞り込みも可能です" },
  { startMs: 108000, endMs: 113000, text: "「チェック設定」から、各商材の注釈ルールを確認します" },
  { startMs: 113000, endMs: 121000, text: "広告表現のチェックに必要な最新のルールが蓄積されています" },
  { startMs: 121000, endMs: 126000, text: "以上で商品登録の解説を終了します" }, // 最後は適当に+5秒に設定
];

export const ProductRegistration: React.FC = () => {
  const { width, height, fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      {/* 1. タイトルシーケンス (0〜2秒) */}
      <Sequence from={0} durationInFrames={2 * fps}>
        {/* TitleSequenceは現状固定のテキストになっているため、propsに合わせて調整 */}
        <TitleSequence titleImageSrc="lp-monitor/title_image.png" stepText="STEP1：商品登録" />
      </Sequence>

      {/* 3秒後(90フレーム)から元の画面録画を再生 */}
      {/* このSequenceの先頭が 0ミリ秒(telopDataの視点) となる */}
      <Sequence from={90}>
        <Video 
          src={staticFile("lp-monitor/商品登録.mp4")}
          style={{
            width: width,
            height: height,
            objectFit: "contain",
          }}
        />
        {/* 動画レイヤーの上にテロップを表示 */}
        <Telop items={telopData} />
      </Sequence>
    </AbsoluteFill>
  );
};
