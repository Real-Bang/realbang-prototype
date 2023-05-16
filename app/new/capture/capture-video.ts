"use client";
import { atom, useAtom, useAtomValue } from "jotai";
import { useMemo, useState } from "react";

export const capturedImagesAtom = atom<Blob[]>([]);

export function useCapture() {
  const [captureStream, setCaptureStream] = useState<MediaStream | null>(null);
  const videoTracks = captureStream ? captureStream.getVideoTracks() : [];

  const [capturedImages, setCapturedImages] = useAtom(capturedImagesAtom);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const isCapturing =
    mediaRecorder !== null ? mediaRecorder.state === "recording" : false;

  const initialize = () => {
    setCapturedImages([]);
  };

  const setup = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: { ideal: "environment" },
        },
      });
      setCaptureStream(stream);
    } catch (e) {
      if (e instanceof OverconstrainedError) {
        console.error("There's no camera facing environment.");
      }
    }
  };

  const capturePhoto = async () => {
    if (videoTracks) {
      const imageCapturer = new ImageCapture(videoTracks[0]);
      const photo = await imageCapturer.takePhoto();
      setCapturedImages([...capturedImages, photo]);
    }
  };

  const captureVideoStart = async () => {
    debugger;
    if (captureStream && videoTracks.length > 0) {
      const outputStream = new MediaStream();
      outputStream.addTrack(videoTracks[0]);

      const recorder = new MediaRecorder(outputStream, {
        mimeType: "video/webm",
      });
      setMediaRecorder(recorder);
      let recordedChunks: Blob[] = [];
      if (recorder) {
        recorder.addEventListener("start", () => {
          console.log("Recording start!");
          recordedChunks = [];
        });
        recorder.addEventListener("dataavailable", (e) => {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        });
        recorder.addEventListener("stop", () => {
          if (recordedChunks.length > 0) {
            setCapturedImages([...capturedImages, new Blob(recordedChunks)]);
          }
        });
        recorder.addEventListener("error", (e) => {
          console.error(e);
        });

        recorder.start();
      }
    }
  };

  const captureVideoEnd = async () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  const images = () => {
    return capturedImages;
  };

  return {
    initialize,
    setup,
    capturePhoto,
    captureVideoStart,
    captureVideoEnd,
    captureStream,
    isCapturing,
    images,
  };
}
