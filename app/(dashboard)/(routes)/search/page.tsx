// app/(dashboard)/(routes)/search/page.tsx
import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { getCourse } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { SearchInputSuspense } from "../../_components/search-input-wrapper";

interface SearchPageProps {
  searchParams: Promise<{
    title: string;
    categoryId: string;
  }>;
}

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
        <SearchInputSuspense />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
