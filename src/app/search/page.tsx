import Link from "next/link";
export default function Search({ searchParams }: { searchParams: { search: string } }) {
  return (
    <div>
      <main className="mb-24 sm:mt-24 p-6 lg:p-0 m-auto max-w-lg z-0">
        <form action="search">
          <label className="w-full border border-neutral-500 rounded-lg px-6 py-4 flex justify-center gap-4">
            <svg className="w-4 stroke-0" aria-label="Search" viewBox="0 0 26 26" role="img">
              <title>Search</title>
              <path className="fill-neutral-600" d="M3.5 11.5C3.5 7.08172 7.08172 3.5 11.5 3.5C15.9183 3.5 19.5 7.08172 19.5 11.5C19.5 15.9183 15.9183 19.5 11.5 19.5C7.08172 19.5 3.5 15.9183 3.5 11.5ZM11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22C13.949 22 16.2023 21.1615 17.9883 19.756L22.3661 24.1339C22.8543 24.622 23.6457 24.622 24.1339 24.1339C24.622 23.6457 24.622 22.8543 24.1339 22.3661L19.756 17.9883C21.1615 16.2023 22 13.949 22 11.5C22 5.70101 17.299 1 11.5 1Z"></path>
            </svg>
            <input className="bg-transparent flex-1 border-none outline-none" placeholder="Search" type="text" name="search" defaultValue={searchParams.search} />
            <Link className="flex" href="/search">
              <svg className="w-4 fill-neutral-600" aria-label="Clear" viewBox="0 0 24 24" role="img">
                <title>Clear</title>
                <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm5.139 16.056a.766.766 0 1 1-1.083 1.083L12 13.083 7.944 17.14a.766.766 0 0 1-1.083-1.083L10.917 12 6.86 7.944a.766.766 0 0 1 1.083-1.083L12 10.917l4.056-4.056a.766.766 0 0 1 1.083 1.083L13.083 12Z"></path>
              </svg>
            </Link>
          </label>
        </form>
        {/* 조건부 렌더링 검색어가 존재하면 랜더링 &&앞이 참이면 && 뒤 실행 */}
        {searchParams.search && <div className="mt-10">Search results for {searchParams.search}</div>}
      </main>
    </div>
  );
}
