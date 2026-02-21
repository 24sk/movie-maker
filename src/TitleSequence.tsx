import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const TitleSequence: React.FC<{ titleImageSrc: string, stepText: string }> = ({ titleImageSrc, stepText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // フェードイン (0〜15フレーム)
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 少しズームインするアニメーション (0〜90フレーム)
  const scale = interpolate(frame, [0, 90], [1, 1.05], {
    extrapolateRight: "clamp",
  });

  // テキストを下からスライドイン
  const translateY = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });
  
  const textTranslateY = interpolate(translateY, [0, 1], [50, 0]);
  const textOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#f6e4eb", opacity }}>
      {/* 添付画像（ロゴ等） */}
      <AbsoluteFill style={{ 
        justifyContent: "flex-start", 
        alignItems: "center", 
        paddingTop: 200,
        transform: `scale(${scale})`
      }}>
        <Img 
          src={staticFile(titleImageSrc)} 
          style={{ width: 400, height: "auto", objectFit: "contain", borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }} 
        />
      </AbsoluteFill>

      {/* テキスト領域 */}
      <AbsoluteFill style={{ 
        justifyContent: "flex-end", 
        alignItems: "center", 
        paddingBottom: 350,
        opacity: textOpacity,
        transform: `translateY(${textTranslateY}px)`
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "40px 60px",
          borderRadius: 24,
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20
        }}>
          <h1 style={{ 
            fontSize: 48, 
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: "#d76492",
            margin: 0,
            borderBottom: "4px solid #d97da2",
            paddingBottom: 10
          }}>
            LP-CHECKER操作マニュアル
          </h1>
          <h2 style={{ 
            fontSize: 64, 
            fontFamily: "sans-serif",
            fontWeight: "900",
            color: "#d76492",
            margin: 0
          }}>
            {stepText}
          </h2>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
