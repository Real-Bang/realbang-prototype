"use client";

import { useEffect, useRef, useState } from "react";
import { getCameraList } from "./capture-video";

export default function CapturePage() {
  const [stream, setStream] = useState<MediaStream>();
  const [cameraList, setCameraList] = useState<MediaStreamTrack[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onClickButton = async () => {
    const [videoStream, videoCameraList] = await getCameraList();
    setStream(videoStream);
    setCameraList(videoCameraList);
    console.log(videoRef.current);
    if (videoRef.current) {
      videoRef.current.srcObject = videoStream;
      videoRef.current.play();
    }
  };

  useEffect(() => {
    console.log(videoRef.current);
    if (videoRef.current) {
      videoRef.current.srcObject = stream!;
    }
  }, [videoRef, stream]);

  return (
    <div>
      <button className="btn btn-lg" onClick={onClickButton}>
        카메라
      </button>
      <div>
        {cameraList.map((camera) => (
          <p key={camera.label}>{camera.label}</p>
        ))}
      </div>
      <video ref={videoRef} />
      <input
        accept="image/*"
        id="icon-button-file"
        type="file"
        capture="environment"
        multiple
      />
    </div>
  );
}
