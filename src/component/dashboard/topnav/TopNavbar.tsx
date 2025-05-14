import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import Notification from "./Notification";
import CurrentDate from "./CurrentDate";
import SearchForm from "./SearchForm";
import Profile from "@/component/user/Profile";

interface Props {
  toogleActive: () => void;
}

const TopNavbar: React.FC<Props> = ({ toogleActive }) => {
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={toogleActive}
                data-cy="toggle"
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle navigation</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <SearchForm />

        <div className="flex-1" />

        <div className="flex items-center space-x-4">
          <CurrentDate />
          <Notification />
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
