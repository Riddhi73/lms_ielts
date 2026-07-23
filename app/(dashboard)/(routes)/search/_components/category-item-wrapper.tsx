"use client";

import { Suspense } from "react";
import { CategoryItem } from "./category-item";
import { IconType } from "react-icons";

interface CategoryItemSuspenseProps {
  label: string;
  value?: string;
  icon?: IconType;
}

const Fallback = ({ label }: { label: string }) => (
  <button className="py-2 px-3 text-sm border bg-slate-300 rounded-full opacity-50">
    {label}
  </button>
);

export const CategoryItemSuspense = ({
  label,
  value,
  icon,
}: CategoryItemSuspenseProps) => {
  return (
    <Suspense fallback={<Fallback label={label} />}>
      <CategoryItem label={label} value={value} icon={icon} />
    </Suspense>
  );
};
