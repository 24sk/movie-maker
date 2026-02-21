import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Video, Audio } from "@remotion/media";
import { staticFile } from "remotion";
import { Character } from "./Character";
import { TitleSequence } from "./TitleSequence";
import { Telop } from "./Telop";
import { productRegistrationTelopData } from "./data/product-registration-telop";

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
        {/* 各テロップの開始時間に合わせてカスタムボイス音声とキャラクターを配置 */}
        {productRegistrationTelopData.map((item, index) => {
          const durationFrames = ((item.endMs - item.startMs) / 1000) * fps;
          const voiceoverSrc = staticFile(`voiceover/product-registration/${index}.mp3`);
          return (
            <Sequence
              key={index}
              from={(item.startMs / 1000) * fps}
              durationInFrames={durationFrames}
            >
              <Audio src={voiceoverSrc} />
              <Character audioSrc={voiceoverSrc} startFromFrame={0} />
            </Sequence>
          );
        })}
        {/* 動画レイヤーの上にテロップを表示 */}
        <Telop items={productRegistrationTelopData} />
      </Sequence>
    </AbsoluteFill>
  );
};
