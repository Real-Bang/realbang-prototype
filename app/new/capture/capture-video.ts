"use client";
import { atom, useAtom, useAtomValue } from "jotai";

export const captureStreamAtom = atom<MediaStream | null>(null);
export const capturedImagesAtom = atom<Blob[]>([]);
export const videoTracksAtom = atom((get) =>
  get(captureStreamAtom)?.getVideoTracks()
);

export function useCapture() {
  const [captureStream, setCaptureStream] = useAtom(captureStreamAtom);
  const [capturedImages, setCapturedImages] = useAtom(capturedImagesAtom);
  const videoTracks = useAtomValue(videoTracksAtom);

  const setup = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { exact: "environment" },
        },
      });
      setCaptureStream(stream);
    } catch (e) {
      if (e instanceof OverconstrainedError) {
        console.error("There's no camera facing environment.");
      }
    }
  };

  const capture = async () => {
    if (videoTracks) {
      const imageCapturer = new ImageCapture(videoTracks[0]);
      const photo = await imageCapturer.takePhoto();
      setCapturedImages([...capturedImages, photo]);
    }
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
