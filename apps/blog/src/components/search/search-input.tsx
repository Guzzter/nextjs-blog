interface SearchInputProps {
  defaultValue: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pending: boolean;
}

export function SearchInput({ defaultValue, onChange, pending }: SearchInputProps) {
  return (
    <div className="flex-1 relative">
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder="Search..."
        className="bg-white border border-rule p-2 rounded text-sm w-full"
      />
      {pending && (
        <span className="absolute font-bold right-3 text-[10px] text-ink-muted top-2 uppercase">
          ...
        </span>
      )}
    </div>
  );
}
