"use client";

import {
  ArrowLeftIcon,
  PhotoIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { capturedImagesAtom } from "@/app/new/capture/capture-video";
import CaptureView from "@/app/new/capture/capture-view";

interface PictureSelectOption {
  text: string;
  value: string;
}
const pictureSelectOptions: PictureSelectOption[] = [
  {
    text: "사진",
    value: "picture",
  },
  {
    text: "평면도",
    value: "floor-plan",
  },
  {
    text: "파노라마",
    value: "panorama",
  },
  {
    text: "3D",
    value: "3d",
  },
];

const SELECT_VIEW_MAP: Record<string, ReactNode> = {
  picture: (
    <Image
      src="/room-example/picture.jpg"
      fill
      className="object-cover object-center"
      sizes="100%"
      alt="Picture of the room"
    />
  ),
  "floor-plan": (
    <Image
      src="/room-example/floor-plan.png"
      fill
      className="object-cover object-center"
      sizes="100%"
      alt="Floor Plan of the room"
    />
  ),
  panorama: (
    <video
      src="/room-example/panorama.webm"
      autoPlay
      loop
      muted
      className="object-cover object-center h-full"
    ></video>
  ),
  "3d": (
    <Image
      src="/room-example/3d.gif"
      fill
      className="object-cover object-center"
      sizes="100%"
      alt="Floor Plan of the room"
    />
  ),
};
const SELECT_ICON_MAP: Record<string, ReactNode> = {
  picture: (
    <PhotoIcon className="pl-2 w-6 h-full absolute place-content-center" />
  ),
  "floor-plan": (
    <RectangleGroupIcon className="pl-2 w-6 h-full absolute place-content-center" />
  ),
  panorama: (
    <PhotoIcon className="pl-2 w-6 h-full absolute place-content-center" />
  ),
};

export default function ImageDisplay() {
  const [imageKey, setImageKey] = useState("picture");
  const capturedImages = useAtomValue(capturedImagesAtom);

  const [isCaptureViewOpen, setIsCaptureViewOpen] = useState(false);

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setImageKey(e.target.value);
  };

  const isImageCaptured = () => {
    return capturedImages.length > 0;
  };

  return (
    <>
      <div className="fixed z-10 w-full px-4 top-0 h-16 flex flex-row items-center justify-between bg-slate-600/40">
        <div>
          <Link href="/">
            <ArrowLeftIcon className="w-6" />
          </Link>
        </div>
        <div className="relative text-md h-fit w-32">
          {isImageCaptured() && (
            <>
              {SELECT_ICON_MAP[imageKey]}
              <select
                className="select select-bordered select-ghost select-sm border-gray-300 bg-transparent pl-8 w-full"
                onChange={onChangeSelect}
                value={imageKey}
              >
                {pictureSelectOptions.map((op) => (
                  <option key={op.value} value={op.value}>
                    {op.text}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
      <div className="relative w-full aspect-square text-sm">
        {isImageCaptured() ? (
          <>{SELECT_VIEW_MAP[imageKey]}</>
        ) : (
          <div className="h-full flex flex-col gap-8 items-center justify-center">
            <span>등록된 사진이나 스캔이 없습니다</span>
            <button
              className="btn btn-secondary"
              onClick={() => setIsCaptureViewOpen(true)}
            >
              스캔하러 가기
            </button>
          </div>
        )}
      </div>
      {isCaptureViewOpen && (
        <CaptureView
          onClose={() => {
            setIsCaptureViewOpen(false);
          }}
        />
      )}
    </>
  );
}
