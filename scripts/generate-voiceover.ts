import "dotenv/config";
import { FishAudioClient } from "fish-audio";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import path from "path";
import type { TelopItem } from "../src/Telop";
import { lpRegistrationTelopData } from "../src/data/lp-registration-telop";
import { productRegistrationTelopData } from "../src/data/product-registration-telop";
import { lpCheckTelopData } from "../src/data/lp-check-telop";

const REFERENCE_ID = "063a9b872ba2468b86ff9b041880e13a";

// テロップデータのテキストから **強調** を除去する関数
const cleanText = (text: string) => text.replace(/\*\*/g, "");

const generateForTarget = async (
  client: FishAudioClient,
  telopData: TelopItem[],
  outputDir: string,
  label: string
) => {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log(`\n[${label}] Generating ${telopData.length} audio files...`);

  for (let i = 0; i < telopData.length; i++) {
    const item = telopData[i];
    const text = cleanText(item.text);

    const audioStream = await client.textToSpeech.convert({
      text,
      format: "mp3",
      reference_id: REFERENCE_ID,
    });

    const reader = audioStream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const buffer = Buffer.concat(chunks);

    writeFileSync(path.join(outputDir, `${i}.mp3`), buffer);
    console.log(`  ✓ ${i}.mp3 (${text})`);
  }
};

const generate = async () => {
  const apiKey = process.env.FISH_API_KEY;
  if (!apiKey) {
    throw new Error("FISH_API_KEY が環境変数に設定されていません。.env ファイルを確認してください。");
  }

  const client = new FishAudioClient({ apiKey });
  const publicDir = path.join(process.cwd(), "public/voiceover");

  await generateForTarget(
    client,
    productRegistrationTelopData,
    path.join(publicDir, "product-registration"),
    "ProductRegistration"
  );

  await generateForTarget(
    client,
    lpRegistrationTelopData,
    path.join(publicDir, "lp-registration"),
    "LpRegistration"
  );

  await generateForTarget(
    client,
    lpCheckTelopData,
    path.join(publicDir, "lp-check"),
    "LpCheck"
  );

  console.log("\n✅ 全ての音声生成が完了しました。");
};

generate().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
