import useUser from "@/hooks/useUser";
import {
  DollarSign,
  LogOut,
  Mail,
  MessageCircle,
  Settings,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { AppDpx } from "@/context/AppContext";

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const isAdmin = user?.roles?.some((role) => role.toLowerCase() === "admin");
  const dispatch = React.useContext(AppDpx);
  const { removeUser } = useUser();
  const router = useRouter();

  const _logout = () => {
    dispatch({ type: "SET_USER", payload: null });
    removeUser();
    router.push("/authentication/logout/");
  };

  const firstNameInitial = user?.firstname?.[0]?.toUpperCase() || "H";
  const userName = user?.firstname
    ? `${user.firstname} ${user.lastname || ""}`
    : "Horace User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={user?.dp}
              alt={user?.first_name || "Horace User"}
            />
            <AvatarFallback>{firstNameInitial}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center space-x-2 p-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.dp} alt={userName} />
            <AvatarFallback>{firstNameInitial}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-xs font-medium text-blue-600">
              {user?.roles?.[0] || "Guest"}
            </p>
            <p className="text-sm font-medium">{userName}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href={isAdmin ? "/settings/account/" : "/profile/"}
            className="flex cursor-pointer items-center"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/email/inbox/"
            className="flex cursor-pointer items-center"
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>Inbox</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/apps/chat/" className="flex cursor-pointer items-center">
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>Chat</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/settings/account/"
            className="flex cursor-pointer items-center"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/pages/pricing/"
            className="flex cursor-pointer items-center"
          >
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Plan</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:text-red-600"
          onClick={_logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
