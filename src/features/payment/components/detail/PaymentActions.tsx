import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DownloadIcon, MailIcon, PrinterIcon } from "lucide-react";

export function PaymentActions() {
  return (
    <div className="hidden sm:flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon" onClick={() => window.print()}>
                <PrinterIcon className="h-4 w-4" />
              </Button>
            }
          ></TooltipTrigger>
          <TooltipContent>Print</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon" onClick={() => window.location.reload()}>
                <DownloadIcon className="h-4 w-4" />
              </Button>
            }
          ></TooltipTrigger>
          <TooltipContent>Download</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button variant="outline" size="icon" onClick={() => window.location.reload()}>
                <MailIcon className="h-4 w-4" />
              </Button>
            }
          ></TooltipTrigger>
          <TooltipContent>Email</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
