import { Bell } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface Notification {
  id: string;
  created_at: string;
  recipient_type: string;
  message: string;
  content?: {
    message: string;
  };
}

const Notification = () => {
  const [schoolNotifications] = React.useState<Notification[]>([]);
  const [classNotifications] = React.useState<Notification[]>([]);

  const totalNotifications =
    schoolNotifications.length + classNotifications.length;
  const hasNotifications = totalNotifications > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          {hasNotifications && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          )}
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-semibold">
            Notifications ({totalNotifications})
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-blue-600 hover:text-blue-700"
          >
            clear all
          </Button>
        </div>

        <Separator />

        <ScrollArea className="h-[400px]">
          <div className="p-4">
            {schoolNotifications?.length > 0 && (
              <div className="space-y-4">
                {schoolNotifications.map((notification) => (
                  <div key={notification.created_at} className="pb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      {notification?.recipient_type?.replace(/_/g, " ")}
                    </h4>
                    <p className="text-sm text-gray-600 ml-1">
                      {notification?.message || "No Message"}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification?.created_at || new Date().toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {classNotifications?.length > 0 && (
              <div className="space-y-4">
                {classNotifications.map((notification) => (
                  <div key={notification.created_at} className="pb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                      {notification?.recipient_type?.replace(/_/g, " ")}
                    </h4>
                    <p className="text-sm text-gray-600 ml-1">
                      {notification?.content?.message || "No Message"}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification?.created_at || new Date().toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {totalNotifications === 0 && (
              <p className="text-center text-sm text-gray-500 py-8">
                No notifications
              </p>
            )}
          </div>
        </ScrollArea>

        <Separator />

        <div className="p-4">
          <Link
            href="/notification/"
            className="flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
            <span className="ml-1">→</span>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
