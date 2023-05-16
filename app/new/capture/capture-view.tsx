"use client";

import { StopIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useCapture } from "./capture-video";

interface CaptureViewProps {
  onClose: () => void;
}

export default function CaptureView({ onClose }: CaptureViewProps) {
  const {
    setup,
    captureVideoStart,
    captureStream,
    isCapturing,
    captureVideoEnd,
  } = useCapture();
  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();
  useEffect(() => {
    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoRef.current && captureStream) {
      videoRef.current.srcObject = captureStream;
      videoRef.current.play();
    }
  }, [videoRef, captureStream]);

  const onRecordStart = async () => {
    await captureVideoStart();
  };

  const onRecordEnd = async () => {
    await captureVideoEnd();
    onClose();
  };

  return createPortal(
    <div className="z-50 fixed top-0 left-0 w-screen h-screen flex flex-col bg-black">
      <video ref={videoRef} />
      {isCapturing ? (
        <button
          className="fixed bottom-8 left-1/2 -translate-x-1/2 btn btn-lg btn-circle bg-white"
          onClick={onRecordEnd}
        >
          <StopIcon className="w-6" />
        </button>
      ) : (
        <button
          className="fixed bottom-8 left-1/2 -translate-x-1/2 btn btn-lg btn-circle bg-white"
          onClick={onRecordStart}
        >
          <div className="rounded-full w-6 h-6 bg-red-600"></div>
        </button>
      )}
    </div>,
    document.body
  );
}
