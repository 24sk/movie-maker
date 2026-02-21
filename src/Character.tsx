import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { useAudioData, visualizeAudioWaveform } from "@remotion/media-utils";

const DEFAULT_VOLUME_THRESHOLD = 0.01;

export const Character: React.FC<{
  /** 読み上げ音声のパス（BGMなしのボイスオーバーのみ） */
  audioSrc: string;
  /** この音声が再生開始されるコンポジションのフレーム番号 */
  startFromFrame: number;
  /** 口を開ける判定のしきい値（微調整用） */
  volumeThreshold?: number;
}> = ({ audioSrc, startFromFrame, volumeThreshold = DEFAULT_VOLUME_THRESHOLD }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const audioData = useAudioData(audioSrc);

  if (!audioData) return null;

  const audioFrame = Math.max(0, frame - startFromFrame);
  const waveform = visualizeAudioWaveform({
    audioData,
    fps,
    frame: audioFrame,
    numberOfSamples: 1,
    windowInSeconds: 1 / fps,
  });

  const isSpeaking = Math.abs(waveform[0]) > volumeThreshold;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: "40px",
      }}
    >
      <div style={{ width: 300, height: 300, position: "relative" }}>
        <img
          src={staticFile("character/body.png")}
          alt=""
          style={{ position: "absolute", width: "100%" }}
        />
        <img
          src={
            isSpeaking
              ? staticFile("character/mouth_open.png")
              : staticFile("character/mouth_closed.png")
          }
          alt=""
          style={{ position: "absolute", width: "100%" }}
        />
      </div>
    </AbsoluteFill>
  );
};
