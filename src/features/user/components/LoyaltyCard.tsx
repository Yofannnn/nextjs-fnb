import { cn } from "@/lib/class-name.util";
import { motion } from "framer-motion";

interface MemberLoyaltyCardProps {
  points: number;
  tier: string;
  reward: {
    target: number;
    label?: string;
    description?: string;
  };
}

const tierColors = {
  gold: "bg-amber-400/50",
  silver: "bg-gray-500/50",
  bronze: "bg-yellow-950/50",
} as { [key: string]: string };

export function LoyaltyCard({ points, tier, reward }: MemberLoyaltyCardProps) {
  const progress = Math.min(Math.round((points / reward.target) * 100), 100);
  const remaining = reward.target - points;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="rounded-2xl p-5 relative overflow-hidden bg-linear-to-br from-white via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 text-black dark:text-white"
    >
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-foreground/10" />
      <div className="absolute top-4 -right-2 w-16 h-16 rounded-full bg-foreground/5" />

      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-muted-foreground text-xs tracking-widest mb-1 font-medium">LOYALTY POINTS</p>
          <p className="text-4xl font-bold tracking-tight">{points}</p>
          <p className="text-muted-foreground text-xs mt-0.5">points earned</p>
        </div>
        <span className={cn("backdrop-blur-sm text-card-foreground text-xs font-semibold px-3 py-1.5 rounded-full border border-border", tierColors[tier])}>{tier} Member</span>
      </div>

      <div className="mt-5 relative z-10">
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Next reward at {reward.target} pts</span>
          <span className="font-semibold text-card-foreground">{progress}%</span>
        </div>

        <div className="bg-muted rounded-full h-2">
          <motion.div
            className="bg-primary rounded-full h-2"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              delay: 0.5,
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        </div>

        <p className="text-muted-foreground text-xs mt-2">You have {remaining} pts to your next free reward 🎁</p>
      </div>
    </motion.div>
  );
}
