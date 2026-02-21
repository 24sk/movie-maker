import React from "react";
import { Composition } from "remotion";
import { ProductRegistration } from "./ProductRegistration";
import { LpRegistration } from "./LpRegistration";
import { LpCheck } from "./LpCheck";

const helloWorldElement = (
  <div style={{ flex: 1, justifyContent: "center", alignItems: "center", display: "flex", backgroundColor: "white" }}>
    <h1 style={{ fontSize: 100, fontFamily: "sans-serif" }}>Hello Remotion!</h1>
  </div>
);

const HelloWorld: React.FC = () => {
  return helloWorldElement;
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="ProductRegistration"
        component={ProductRegistration}
        durationInFrames={3776}
        fps={30}
        width={1208}
        height={1268}
      />
      <Composition
        id="LpRegistration"
        component={LpRegistration}
        durationInFrames={Math.ceil(121.693333 * 30) + 60} // 121.69秒 * 30fps + タイトル2秒(60フレーム)
        fps={30}
        width={1256}
        height={1268}
      />
      <Composition
        id="LpCheck"
        component={LpCheck}
        durationInFrames={Math.ceil(230.686667 * 30) + 60} // 230.68秒 * 30fps + タイトル2秒(60フレーム)
        fps={30}
        width={1256}
        height={1268}
      />
    </>
  );
};
