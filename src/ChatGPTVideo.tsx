import { AbsoluteFill, Sequence, Video, useVideoConfig, staticFile } from 'remotion';
import { Audio } from '@remotion/media';
import { Character } from './Character';
import { Telop } from './Telop';
import { TitleSequence } from './TitleSequence';
import { chatgptTelopData } from './data/chatgpt-telop';

const VIDEO_SRC = staticFile('lp-monitor/chatgpt.mp4');

export const ChatGPTVideo: React.FC = () => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            {/* 1. タイトルシーケンス (0〜2秒) */}
            <Sequence from={0} durationInFrames={2 * fps}>
                <TitleSequence titleImageSrc="lp-monitor/title_image.png" stepText="番外編 MCP連携(ChatGPT)" />
            </Sequence>

            {/* 2. メイン動画 (2秒〜最後まで) */}
            <Sequence from={2 * fps}>
                <Video src={VIDEO_SRC} startFrom={0} />

                {/* 各テロップの開始時間に合わせてカスタムボイス音声とキャラクターを配置 */}
                {chatgptTelopData.map((item, index) => {
                    const durationFrames = ((item.endMs - item.startMs) / 1000) * fps;
                    const voiceoverSrc = staticFile(`voiceover/chatgpt/${index}.mp3`);
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

                {/* テロップ表示レイヤー */}
                <Sequence from={0}>
                    <Telop items={chatgptTelopData} />
                </Sequence>
            </Sequence>
        </AbsoluteFill>
    );
};
