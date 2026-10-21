import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { formatUserInitialName } from "@/features/user/utils/user.formatter";

export function ProfileHeader({ username }: { username: string }) {
  return (
    <header className="bg-white dark:bg-black border-b border-slate-100 dark:border-slate-800 sticky top-0 z-30">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" alt="profile-pic" />
            <AvatarFallback>{formatUserInitialName(username)}</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500">Welcome back 👋</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{username}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-violet-50 hover:text-violet-600 dark:hover:bg-violet-900/30 dark:hover:text-violet-400 transition-colors">
            <BellIcon size={18} />
          </Button>
          <AnimatedThemeToggler />
        </div>
      </div>
    </header>
  );
}
