import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '~/components/ui/input';
import { useSidebarStore } from '~/stores/SideBarStore';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const { searchQuery, setSearchQuery, setMode } = useSidebarStore();

  return (
    <div
      className={clsx(
        'w-full h-12 flex items-center gap-1 rounded-3xl px-4 transition-all',
        'bg-muted text-foreground',
        isFocused && 'ring-2 ring-ring shadow-md',
      )}
    >
      <Search
        className={clsx(
          'transition-colors',
          isFocused ? 'text-primary' : 'text-muted-foreground',
        )}
      />

      <Input
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSelect={() => setMode('search')}
        className={clsx(
          'flex-1 px-0',
          'border-none shadow-none',
          '!bg-muted',
          'focus-visible:ring-0 focus-visible:ring-offset-0',
          'outline-none',
          'placeholder:text-muted-foreground',
          'text-foreground',
        )}
      />

      {searchQuery && (
        <X
          className="text-muted-foreground cursor-pointer hover:text-foreground transition-opacity duration-150"
          onClick={() => setSearchQuery('')}
        />
      )}
    </div>
  );
};

export default SearchBar;
