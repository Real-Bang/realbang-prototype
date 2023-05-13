"use client";

import {
  ArrowLeftIcon,
  PhotoIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
      src="/picture.jpg"
      fill
      className="object-cover object-center"
      sizes="100%"
      alt="Picture of the room"
    />
  ),
  "floor-plan": (
    <Image
      src="/floor-plan.png"
      fill
      className="object-cover object-center"
      sizes="100%"
      alt="Floor Plan of the room"
    />
  ),
  panorama: (
    <video
      src="/panorama.webm"
      autoPlay
      loop
      muted
      className="object-cover object-center h-full"
    ></video>
  ),
  "3d": (
    <Image
      src="/3d.gif"
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
  const [image, setImage] = useState("picture");

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setImage(e.target.value);
  };

  return (
    <>
      <div className="fixed z-10 w-full px-4 top-0 h-16 flex flex-row items-center justify-between bg-slate-600/40">
        <div>
          <Link href="/">
            <ArrowLeftIcon className="w-6 " />
          </Link>
        </div>
        <div className="relative text-md h-fit w-32 ">
          {SELECT_ICON_MAP[image]}
          <select
            className="select select-bordered select-ghost select-sm border-gray-300 bg-transparent pl-8 w-full"
            onChange={onChangeSelect}
            value={image}
          >
            {pictureSelectOptions.map((op) => (
              <option key={op.value} value={op.value}>
                {op.text}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative w-full aspect-square items-center justify-between text-sm">
        {SELECT_VIEW_MAP[image]}
      </div>
    </>
  );
}
