"use client"
import Image from 'next/image'
import { ArrowLeftIcon, ArrowsPointingOutIcon, BackwardIcon, PhotoIcon, RectangleGroupIcon } from "@heroicons/react/24/outline"
import { ChangeEvent, ReactNode, useState } from 'react'

interface PictureSelectOption {
  text: string,
  value: string,
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
]

const SELECT_VIEW_MAP: Record<string, ReactNode> = {
  picture:
    <Image src="/picture.jpg" fill className="object-cover object-center" sizes="100%" alt="Picture of the room" />,
  "floor-plan":
    <Image src="/floor-plan.png" fill className="object-cover object-center" sizes="100%" alt="Floor Plan of the room" />,
  "panorama":
    <video src="/panorama.webm" autoPlay loop muted className="object-cover object-center h-full" ></video>,
  "3d":
    <Image src="/3d.gif" fill className="object-cover object-center" sizes="100%" alt="Floor Plan of the room" />

}
const SELECT_ICON_MAP: Record<string, ReactNode> = {
  picture: <PhotoIcon className="pl-2 w-6 h-full absolute place-content-center" />,
  "floor-plan": <RectangleGroupIcon className="pl-2 w-6 h-full absolute place-content-center" />,
  panorama: <PhotoIcon className="pl-2 w-6 h-full absolute place-content-center" />,
}

export default function Home() {
  const [image, setImage] = useState("picture");

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setImage(e.target.value);
  }

  return (
    <main className="min-h-screen flex-col items-center justify-between">
      <div className="relative z-10 w-full max-w-5xl aspect-square items-center justify-between text-sm">
        {SELECT_VIEW_MAP[image]}
        <div className="absolute w-full px-4 top-0 h-16 flex flex-row items-center justify-between">
          <div><ArrowLeftIcon className="w-6" /></div>
          <div className="relative text-md h-fit w-32">
            {SELECT_ICON_MAP[image]}
            <select className='select select-bordered select-ghost select-sm bg-transparent pl-8 w-full'
              onChange={onChangeSelect} value={image}>
              {
                pictureSelectOptions.map(op => (<option key={op.value} value={op.value}>{op.text}</option>))
              }
            </select>
          </div>
        </div>
      </div >
      <div className="flex flex-col mx-4 py-4">
        <div className="flex flex-col gap-4 pr-4">
          <div className="flex flex-row justify-between">
            <span className='badge'>등록번호 12345678</span>
            <span className="text-sm font-light">1일 전</span>
          </div>
          <div>
            <p className="text-sm font-light text-neutral-500">경기도 수원시 장안구 천천동</p>
            <p className="text-2xl font-bold">월세 1,000/45</p>
            <p className="text-sm text-neutral-500">관리비 6만원</p>
          </div>
          <div className="flex flex-row gap-2">
            <span className='badge badge-outline badge-lg border-gray-300'>역세권</span>
            <span className='badge badge-outline badge-lg border-gray-300'>편리한 상권</span>
            <span className='badge badge-outline badge-lg border-gray-300'>공원</span>
          </div>
        </div>
        <div className="divider divider-vertical" />
        <div className="flex flex-col gap-6 pr-4">
          <p>올 리모델링, 정남향 채광 좋아요</p>
          <div className="flex flex-row gap-3">
            <ArrowsPointingOutIcon className='w-6' />
            <p className='text-lg font-bold'>전용 26.45m<sup>2</sup></p>
          </div>
          <div className="flex flex-row gap-3">
            <RectangleGroupIcon className='w-6' />
            <p className='text-lg font-bold'>분리형 원룸</p>
          </div>
          <div className="flex flex-row gap-3">
            <ArrowsPointingOutIcon className='w-6' />
            <p className='text-lg font-bold'>전용 26.45m<sup>2</sup></p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full pb-4">
        <div className="divider divider-vertical"></div>
        <div className='flex flex-row mx-4 justify-between'>
          <div>
            <p className="text-lg font-bold">월세 1,000/45</p>
            <p className="text-sm text-neutral-500">관리비 6만원</p>
          </div>
          <button className='btn btn-primary'><span className='font-bold text-lg w-36'>문의하기</span></button>
        </div>
      </div>
    </main >
  )
}
