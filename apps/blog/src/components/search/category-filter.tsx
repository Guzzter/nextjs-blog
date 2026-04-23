interface CategoryFilterProps {
  categories: string[];
  defaultValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CategoryFilter({ categories, defaultValue, onChange }: CategoryFilterProps) {
  return (
    <>
      <span className="sr-only">Filter by category</span>
      <select
        className="bg-white border border-[var(--color-rule)] duration-200 focus:border-[var(--color-ink)] focus:outline-none px-3 py-2 rounded-sm sm:w-48 text-[var(--color-ink)] text-sm transition-all"
        defaultValue={defaultValue}
        id="category-filter"
        name="category"
        onChange={onChange}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </>
  );
}
