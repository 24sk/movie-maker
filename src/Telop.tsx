import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export type TelopItem = {
  startMs: number; // ミリ秒単位での開始時間（本編開始からの時間）
  endMs: number; // ミリ秒単位での終了時間
  text: string; // 表示するテキスト（**強調**対応）
};

// **太字**をReactノードに変換する関数
const parseBoldText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const innerText = part.slice(2, -2);
      return (
        <span key={index} style={{ color: "#ffeb3b", fontWeight: "bold" }}>
          {innerText}
        </span>
      );
    }
    return part;
  });
};

export const Telop: React.FC<{
  items: TelopItem[];
}> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 現在のフレームからミリ秒を計算
  const currentTimeMs = (frame / fps) * 1000;

  // 現在表示すべきテロップを検索（複数ある場合は最初に見つかったもの）
  const currentItem = items.find(
    (item) => currentTimeMs >= item.startMs && currentTimeMs < item.endMs,
  );

  if (!currentItem) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "80px", // 画面下部からのマージン
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "20px 40px",
          borderRadius: "20px",
          fontSize: "48px",
          fontFamily: "sans-serif",
          textAlign: "center",
          maxWidth: "80%",
          lineHeight: 1.4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          border: "4px solid rgba(255,255,255,0.2)",
        }}
      >
        {parseBoldText(currentItem.text)}
      </div>
    </AbsoluteFill>
  );
};
