import React from 'react';
import { AbsoluteFill, Sequence, Video, useVideoConfig, staticFile } from 'remotion';
import { Audio } from '@remotion/media';
import { Telop, TelopItem } from './Telop';
import { TitleSequence } from './TitleSequence';

const VIDEO_SRC = staticFile('lp-monitor/LPチェック.mov');
const VOICEOVER_SRC = staticFile('lp-monitor/ずんだもん.mp3');

// ミリ秒単位で設定
const telopData: TelopItem[] = [
    { startMs: 0, endMs: 5000, text: "LP表示チェックの手順を解説します" },
    { startMs: 5000, endMs: 12000, text: "上部の**「LPチェック」**を選択します" },
    { startMs: 12000, endMs: 22000, text: "チェックしたいLPの行を展開します" },
    { startMs: 22000, endMs: 195000, text: "**「LPチェック実行」**ボタンをクリック！" },
    { startMs: 195000, endMs: 218000, text: "チェック完了！**「詳細を確認」**をクリック" },
    { startMs: 218000, endMs: 225000, text: "リンク先や画像が正しいか確認しましょう" },
    { startMs: 225000, endMs: 231000, text: "確認できたら**「閉じる」**ボタンをクリック" },
];

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
                {/* テロップ用ナレーション音声（ずんだもん） */}
                <Audio src={VOICEOVER_SRC} />

                {/* テロップの配置を一括で行う */}
                {/* 動画尺 231秒 = 231000ms */}
                <Sequence from={0} durationInFrames={231 * fps}>
                    <Telop items={telopData} />
                </Sequence>
            </Sequence>
        </AbsoluteFill>
    );
};
