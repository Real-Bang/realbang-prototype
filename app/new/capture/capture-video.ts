function isCameraAvailable() {
  return (
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
  );
}

export async function getCameraList(): Promise<
  [MediaStream, MediaStreamTrack[]]
> {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  return [stream, stream.getVideoTracks()];
}
