import React from 'react';
import { AbsoluteFill, Sequence, Video, useVideoConfig, staticFile } from 'remotion';
import { Audio } from '@remotion/media';
import { Character } from './Character';
import { Telop } from './Telop';
import { TitleSequence } from './TitleSequence';
import { lpCheckTelopData } from './data/lp-check-telop';

const VIDEO_SRC = staticFile('lp-monitor/LPチェック.mov');

export const LpCheck: React.FC = () => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            {/* 1. タイトルシーケンス (0〜2秒) */}
            <Sequence from={0} durationInFrames={2 * fps}>
                <TitleSequence titleImageSrc="lp-monitor/title_image.png" stepText="STEP3：LPチェック" />
            </Sequence>

            {/* 2. メイン動画 (2秒〜最後まで) */}
            <Sequence from={2 * fps}>
                <Video src={VIDEO_SRC} startFrom={0} />

                {/* 各テロップの開始時間に合わせてカスタムボイス音声を配置 */}
                {lpCheckTelopData.map((item, index) => {
                    const durationFrames = ((item.endMs - item.startMs) / 1000) * fps;
                    const voiceoverSrc = staticFile(`voiceover/lp-check/${index}.mp3`);
                    return (
                        <Sequence
                            key={index}
                            from={(item.startMs / 1000) * fps}
                            durationInFrames={durationFrames}
                        >
                            <Audio src={voiceoverSrc} />
                            <Character
                                audioSrc={voiceoverSrc}
                                startFromFrame={0}
                            />
                        </Sequence>
                    );
                })}

                {/* テロップの配置 */}
                <Sequence from={0} durationInFrames={231 * fps}>
                    <Telop items={lpCheckTelopData} />
                </Sequence>
            </Sequence>
        </AbsoluteFill>
    );
};
