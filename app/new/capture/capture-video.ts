"use client";
import { atom, useAtom } from "jotai";

export const captureStreamAtom = atom<MediaStream | null>(null);
export const capturedImagesAtom = atom<Blob[]>([]);
export const videoTracksAtom = atom((get) =>
  get(captureStreamAtom)?.getVideoTracks()
);

export function useCapture() {
  const [captureStream, setCaptureStream] = useAtom(captureStreamAtom);
  const [capturedImages, setCapturedImages] = useAtom(capturedImagesAtom);

  const setup = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true,
    });
    setCaptureStream(stream);
  };

  const capture = () => {
    setCapturedImages([...capturedImages]);
  };

  const images = () => {
    return capturedImages;
  };

  const initialize = () => {
    setCapturedImages([]);
  };

  return {
    setup,
    capture,
    images,
    initialize,
  };
}
