import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ChevronRightIcon, EllipsisVertical } from "lucide-react";

const actions = [
  { label: "Set Stock", url: "#" },
  { label: "Edit", url: "#" },
];

export function ProductActionsDropdown() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline">
            <EllipsisVertical />
          </Button>
        }
      />
      <DropdownMenuContent>
        {actions.map((action) => (
          <DropdownMenuItem key={action.label} onClick={() => router.push(action.url)}>
            {action.label} <ChevronRightIcon className="ml-auto" />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
