import { ArrowLeft } from 'lucide-react';

const SidebarContent = () => {
  const mode = 'chats';

  return (
    <div className="h-full flex flex-col gap-2 bg-background">
      <div className="sticky top-0 z-10 bg-background p-4 font-semibold text-lg transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-[40px] flex justify-center transition-all duration-300">
            {mode === 'chats' ? (
              //   <DropDownMenu setMode={setMode} />
              <>DROPDOWN MENU</>
            ) : (
              <ArrowLeft
                className="cursor-pointer rounded-3xl hover:bg-muted dark:hover:bg-muted/40"
                size={30}
                // onClick={() => setMode('chats')}
              />
            )}
          </div>

          <div className="flex-1 transition-all duration-300">
            {/* <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setMode={setMode}
            /> */}
            <>SEARCH BAR</>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarContent;
