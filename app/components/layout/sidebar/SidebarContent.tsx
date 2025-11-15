import { ArrowLeft } from 'lucide-react';
import { DropDownMenu } from './DropDownMenu';
import SearchBar from './SearchBar';
import { useSidebarStore } from '~/stores/SideBarStore';
import { motion, AnimatePresence } from 'motion/react';
import ChatList, { chatListAnimation } from './ChatList';
import SearchList, { searchListAnimation } from './SearchList';
import Profile, { profileAnimation } from './Profile';
import Settings, { settingsAnimation } from './Settings';

const SidebarContent = () => {
  const { mode, setMode } = useSidebarStore();

  const componentMap = {
    chats: {
      component: <ChatList />,
      animation: chatListAnimation,
    },
    search: {
      component: <SearchList />,
      animation: searchListAnimation,
    },
    profile: {
      component: <Profile />,
      animation: profileAnimation,
    },
    settings: {
      component: <Settings />,
      animation: settingsAnimation,
    },
  } as const;

  return (
    <div className="h-full flex flex-col gap-2 bg-background">
      {/* Top bar with dropdown menu and search bar */}
      <div className="sticky top-0 z-10 bg-background p-4 font-semibold text-lg transition-all duration-300">
        <div className="flex items-center gap-2">
          <div className="w-[40px] flex justify-center transition-all duration-300">
            {mode === 'chats' ? (
              <DropDownMenu />
            ) : (
              <ArrowLeft
                className="cursor-pointer rounded-3xl hover:bg-muted dark:hover:bg-muted/40"
                size={30}
                onClick={() => setMode('chats')}
              />
            )}
          </div>

          <div className="flex-1 transition-all duration-300">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Components page where diff pages render on sidebar */}
      <div className="flex-1 overflow-y-auto overscroll-none h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={mode} {...componentMap[mode].animation}>
            {componentMap[mode].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SidebarContent;
