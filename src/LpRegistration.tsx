import { AbsoluteFill, Sequence, Video, useVideoConfig, staticFile } from 'remotion';
import { Telop, TelopItem } from './Telop';
import { TitleSequence } from './TitleSequence';

const VIDEO_SRC = staticFile('lp-monitor/LP登録.mp4');

// ミリ秒単位で設定
const telopData: TelopItem[] = [
    { startMs: 0, endMs: 3000, text: "LP管理の操作手順を解説します" },
    { startMs: 3000, endMs: 6000, text: "上部の**「LP管理」**タブを選択します" },
    { startMs: 6000, endMs: 9000, text: "**「+ LP追加」**ボタンをクリック" },
    { startMs: 9000, endMs: 23000, text: "LP識別子と表示名を入力します" },
    { startMs: 23000, endMs: 41000, text: "登録するLPのURLを入力してください" },
    { startMs: 41000, endMs: 44000, text: "管理画面から紐付ける商品を選択" },
    { startMs: 44000, endMs: 52000, text: "内容を確認して**「登録」**をクリック！" },
    { startMs: 52000, endMs: 56000, text: "登録されたLPの行を展開します" },
    { startMs: 56000, endMs: 58000, text: "**「期待リンク」**のアイコンをクリック" },
    { startMs: 58000, endMs: 61000, text: "**「+ 追加」**から正しい遷移先を設定します" },
    { startMs: 61000, endMs: 68000, text: "リンク種別（CTA、フローティング等）を選択" },
    { startMs: 68000, endMs: 76000, text: "本来遷移すべき**「正しいURL」**を入力" },
    { startMs: 76000, endMs: 83000, text: "識別しやすいよう説明テキストを入力します" },
    { startMs: 83000, endMs: 88000, text: "**「追加」**をクリックして保存します" },
    { startMs: 88000, endMs: 106000, text: "同様の手順で複数の期待リンクを登録可能" },
    { startMs: 106000, endMs: 113000, text: "全てのリンク設定が完了しました" },
    { startMs: 113000, endMs: 122000, text: "期待リンク一覧で設定内容を確認できます" },
];

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

                {/* テロップの配置を一括で行う */}
                <Sequence from={0} durationInFrames={122 * fps}>
                    <Telop items={telopData} />
                </Sequence>
            </Sequence>
        </AbsoluteFill>
    );
};
