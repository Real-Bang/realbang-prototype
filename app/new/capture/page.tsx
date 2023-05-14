"use client";

import { useEffect, useRef, useState } from "react";
import { captureStreamAtom, useCapture } from "./capture-video";
import { useAtom } from "jotai";

export default function CapturePage() {
  const { setup } = useCapture();
  const [stream] = useAtom(captureStreamAtom);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    setup();
  }, [setup]);

  const onClickButton = async () => {
    if (videoRef.current) {
      console.log("ready", videoRef.current);
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
  };

  return (
    <main className="flex flex-col">
      <button className="btn btn-lg" onClick={onClickButton}>
        스캔 시작
      </button>
      <video ref={videoRef} />
    </main>
  );
}
