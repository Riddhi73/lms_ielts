"use client";

import { Suspense } from "react";
import { SearchInput } from "./search-input";

const Fallback = () => (
  <div className="relative">
    <div className="h-10 w-full md:w-75 rounded-full bg-slate-200 animate-pulse" />
  </div>
);

export const SearchInputSuspense = () => {
  return (
    <Suspense fallback={<Fallback />}>
      <SearchInput />
    </Suspense>
  );
};
