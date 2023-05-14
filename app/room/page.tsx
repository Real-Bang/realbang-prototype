import {
  ArrowsPointingOutIcon,
  BuildingOfficeIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import ImageDisplay from "./components/ImageDisplay";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between">
      <ImageDisplay />
      <div className="flex flex-col mx-4 py-4">
        <div className="flex flex-col gap-4 pr-4">
          <div className="flex flex-row justify-between">
            <span className="badge">등록번호 12345678</span>
            <span className="text-sm font-light">1일 전</span>
          </div>
          <div>
            <p className="text-sm font-light text-neutral-500">
              경기도 수원시 장안구 천천동
            </p>
            <p className="text-2xl font-bold">월세 1,000/45</p>
            <p className="text-sm text-neutral-500">관리비 6만원</p>
          </div>
          <div className="flex flex-row gap-2">
            <span className="badge badge-outline badge-lg border-gray-300">
              역세권
            </span>
            <span className="badge badge-outline badge-lg border-gray-300">
              편리한 상권
            </span>
            <span className="badge badge-outline badge-lg border-gray-300">
              공원
            </span>
          </div>
        </div>
        <div className="divider divider-vertical" />
        <div className="flex flex-col gap-6 pr-4">
          <p>올 리모델링, 정남향 채광 좋아요</p>
          <div className="flex flex-row gap-3">
            <ArrowsPointingOutIcon className="w-6" />
            <p className="text-lg font-bold">
              전용 26.45m<sup>2</sup>
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <RectangleGroupIcon className="w-6" />
            <p className="text-lg font-bold">분리형 원룸</p>
          </div>
          <div className="flex flex-row gap-3">
            <BuildingOfficeIcon className="w-6" />
            <p className="text-lg">4층/5층</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
