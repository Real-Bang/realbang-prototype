import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NewPage() {
  return (
    <main>
      <div className="flex flex-col">
        <h2>집 정보</h2>
        <label>등록</label>
      </div>
      <button className="btn btn-primary w-64 text-xl">
        <Link href="/new/capture">
          스캔하러 가기 <ArrowRightIcon className="w-6 inline-block" />
        </Link>
      </button>
    </main>
  );
}
