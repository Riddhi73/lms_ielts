// app/(dashboard)/(routes)/search/page.tsx
import { Suspense } from "react";
import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "../../_components/search-input";
import { getCourse } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface SearchPageProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>;
}

const SearchInputFallback = () => (
  <div className="h-10 w-full md:w-75 rounded-full bg-slate-200 animate-pulse" />
);

const CategoriesFallback = () => (
  <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="h-8 w-24 rounded-full bg-slate-200 animate-pulse"
      />
    ))}
  </div>
);

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const { title, categoryId } = await searchParams;

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
  });

  const courses = await getCourse({ userId, title, categoryId });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <Suspense fallback={<SearchInputFallback />}>
          <SearchInput />
        </Suspense>
      </div>
      <div className="p-6 space-y-4">
        <Suspense fallback={<CategoriesFallback />}>
          <Categories items={categories} />
        </Suspense>
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
