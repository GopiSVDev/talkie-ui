import {
  AlignJustify,
  LogOut,
  MoonStar,
  Settings,
  UserRound,
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Switch } from '~/components/ui/switch';
import { useSidebarStore } from '~/stores/SideBarStore';
import { THEMES, useThemeStore } from '~/stores/ThemeStore';

export function DropDownMenu() {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();
  const { setMode } = useSidebarStore();
  const items = [
    {
      name: 'Profile',
      Icon: <UserRound />,
      onClick: () => setMode('profile'),
    },
    {
      name: 'Settings',
      Icon: <Settings />,
      onClick: () => setMode('settings'),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="p-0 shadow-none">
        <Button
          variant="secondary"
          className="cursor-pointer bg-card hover:bg-muted text-foreground rounded-4xl p-0"
        >
          <AlignJustify className="!h-6 !w-6" size={30} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-popover text-popover-foreground backdrop-blur-sm border-none shadow-md space-y-1.5"
        align="start"
      >
        <DropdownMenuGroup className="font-medium">
          {items.map(({ Icon, name, onClick }) => (
            <DropdownMenuItem
              key={name}
              onClick={onClick}
              className="cursor-pointer gap-2 flex justify-start items-center data-[highlighted]:bg-accent 
              data-[highlighted]:text-accent-foreground"
            >
              <span>{Icon}</span>
              <span>{name}</span>
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="data-[highlighted]:bg-accent 
            data-[highlighted]:text-accent-foreground"
          >
            <div
              className="flex items-center justify-between gap-2 w-full cursor-pointer "
              onClick={() =>
                setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK)
              }
            >
              <span className="flex gap-2 items-center">
                <MoonStar />
                Night Mode
              </span>
              <Switch
                id="dark-mode"
                checked={theme === 'dark'}
                onCheckedChange={(value) => setTheme(value ? 'dark' : 'light')}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="font-medium cursor-pointer data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
          onClick={() => navigate('/auth/logout')}
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
