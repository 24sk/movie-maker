import { AbsoluteFill, Sequence, Video, useVideoConfig, staticFile } from 'remotion';
import { Audio } from '@remotion/media';
import { Character } from './Character';
import { Telop } from './Telop';
import { TitleSequence } from './TitleSequence';
import { lpRegistrationTelopData } from './data/lp-registration-telop';

const VIDEO_SRC = staticFile('lp-monitor/LP登録.mp4');

export const LpRegistration: React.FC = () => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            {/* 1. タイトルシーケンス (0〜2秒) */}
            <Sequence from={0} durationInFrames={2 * fps}>
                {/* TitleSequenceは現状固定のテキストになっているため、propsに合わせて調整 */}
                <TitleSequence titleImageSrc="lp-monitor/title_image.png" stepText="STEP2：LP登録" />
            </Sequence>

            {/* 2. メイン動画 (2秒〜最後まで) */}
            <Sequence from={2 * fps}>
                <Video src={VIDEO_SRC} startFrom={0} />

                {/* 各テロップの開始時間に合わせてカスタムボイス音声とキャラクターを配置 */}
                {lpRegistrationTelopData.map((item, index) => {
                    const durationFrames = ((item.endMs - item.startMs) / 1000) * fps;
                    const voiceoverSrc = staticFile(`voiceover/lp-registration/${index}.mp3`);
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
                <Sequence from={0} durationInFrames={122 * fps}>
                    <Telop items={lpRegistrationTelopData} />
                </Sequence>
            </Sequence>
        </AbsoluteFill>
    );
};
