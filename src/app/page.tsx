"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./components/Loader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
            <div className="relative flex flex-col gap-4 items-center justify-center min-h-screen px-4">
            <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Saylani Microfinance App
            </div>
            <div className="font-extralight text-base md:text-2xl dark:text-neutral-200 py-4 text-center">
            Simplify your loan application process with ease
            </div>
            <Link href={"/main"}>
              <button className="btn btn-neutral" onClick={() => setLoading(!loading)}>GET STARTED</button>
            </Link>
            </div>
      )}
    </div>
  );
}