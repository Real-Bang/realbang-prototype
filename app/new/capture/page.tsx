"use client";

import { useEffect, useRef, useState } from "react";
import {
  captureStreamAtom,
  useCapture,
  videoTracksAtom,
} from "./capture-video";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

export default function CapturePage() {
  const { setup, capture } = useCapture();
  const [stream] = useAtom(captureStreamAtom);
  const videoTracks = useAtomValue(videoTracksAtom);
  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  useEffect(() => {
    setup();
  }, [setup]);

  const onClickScan = async () => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
  };

  const onClickTakePhoto = async () => {
    await capture();
    router.push("/room");
  };

  return (
    <main className="flex flex-col">
      <button className="btn btn-lg" onClick={onClickScan}>
        스캔 시작
      </button>
      <video ref={videoRef} />
      <button className="btn btn-lg" onClick={onClickTakePhoto}>
        촬영
      </button>
      {videoTracks && <div>{videoTracks.map((track) => track.label)}</div>}
    </main>
  );
}
