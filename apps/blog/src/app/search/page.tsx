import { SearchForm } from '@/components/search/form';
import { SearchResults } from '@/components/search/search-results';
import { EmptyState } from '@/components/search/empty-state';
import { LoadingState } from '@/components/search/loading-state';

export default function SearchPage({ searchParams }: any) {
  return (
    <div>
      {/* todo: implement search page logic */}
      <SearchForm categories={[]} />
      <SearchResults posts={[]} />
      <EmptyState />
      <LoadingState />
    </div>
  );
}
