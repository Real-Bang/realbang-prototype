import Image from "next/image";
import Link from "next/link";

export default function MainPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Image src="/icon.png" width={500} height={500} alt="Logo" />
      <div className="fixed bottom-24 flex flex-col gap-4 w-2/3">
        <button
          className="btn btn-primary btn-disabled btn-xl text-xl"
          disabled
        >
          방 등록하기
          {/* {<Link href="/new"></Link>} */}
        </button>
        <button className="btn btn-primary btn-xl text-xl">
          <Link href="/room">방 살펴보기</Link>
        </button>
      </div>
    </main>
  );
}
