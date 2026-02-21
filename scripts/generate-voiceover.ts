import "dotenv/config";
import { FishAudioClient } from "fish-audio";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import { lpRegistrationTelopData } from "../src/data/lp-registration-telop";

// テロップデータのテキストから **強調** を除去する関数
const cleanText = (text: string) => text.replace(/\*\*/g, "");

const generate = async () => {
  const apiKey = process.env.FISH_API_KEY;
  if (!apiKey) {
    throw new Error("FISH_API_KEY が環境変数に設定されていません。.env ファイルを確認してください。");
  }

  const client = new FishAudioClient({ apiKey });
  const outputDir = path.join(process.cwd(), "public/voiceover/lp-registration");

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log("Generating audio files...");

  for (let i = 0; i < lpRegistrationTelopData.length; i++) {
    const item = lpRegistrationTelopData[i];
    const text = cleanText(item.text);

    // Fish Audio APIで音声を生成
    const audioStream = await client.textToSpeech.convert({
      text,
      format: "mp3",
      // カスタムボイスを使用する場合は reference_id を指定
      reference_id: "063a9b872ba2468b86ff9b041880e13a"
    });

    // ReadableStream を Buffer に変換
    const reader = audioStream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const buffer = Buffer.concat(chunks);

    writeFileSync(path.join(outputDir, `${i}.mp3`), buffer);
    console.log(`✓ Generated: ${i}.mp3 (${text})`);
  }

  console.log(`\n完了: ${lpRegistrationTelopData.length} ファイルを ${outputDir} に保存しました。`);
};

generate().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
