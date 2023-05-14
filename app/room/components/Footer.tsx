export default function Footer() {
  return (
    <div className="sticky bottom-0 w-full py-4 bg-base-100 border-t-gray-300 border-t-[1px] border-solid">
      <div className="flex flex-row mx-4 justify-between">
        <div>
          <p className="text-lg font-bold">월세 1,000/45</p>
          <p className="text-sm text-neutral-500">관리비 6만원</p>
        </div>
        <button className="btn btn-primary">
          <span className="font-bold text-lg w-36">문의하기</span>
        </button>
      </div>
    </div>
  );
}
