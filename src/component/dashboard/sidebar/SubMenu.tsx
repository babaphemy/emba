import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { JSX, memo, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TIcon {
  type: string;
  name: string;
  path: string;
}

export interface TSubNav {
  active: boolean;
  allowed_roles: string[];
  order: number;
  path: string;
  title: string;
}

export interface TNavBar<T> {
  active: boolean;
  allowed_roles: string[];
  created_at?: string;
  updated_at?: string;
  icon: T | null;
  id: number;
  iconClosed?: JSX.Element;
  iconOpened?: JSX.Element;
  order: number;
  path: string;
  title: string;
  sub_nav?: TSubNav[];
}

const SubMenuComponent = ({ item }: { item: TNavBar<React.JSX.Element> }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const pathname = usePathname();

  const isActive = pathname === item.path;
  const hasSubNav = Boolean(item.sub_nav);

  return (
    <>
      <Link
        href={item.path}
        onClick={hasSubNav ? showSubnav : undefined}
        className={cn(
          "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-accent text-accent-foreground"
        )}
      >
        <div className="flex items-center space-x-3">
          {item.icon}
          <span>{item.title}</span>
        </div>
        <div>
          {hasSubNav &&
            (subnav
              ? item.iconOpened || <ChevronDown className="h-4 w-4" />
              : item.iconClosed || <ChevronRight className="h-4 w-4" />)}
        </div>
      </Link>

      {subnav && item.sub_nav && (
        <div className="ml-9 mt-2 space-y-3">
          {item.sub_nav.map((subItem, index) => {
            const isSubActive = pathname === subItem.path;
            return (
              <Link
                href={subItem.path}
                key={index}
                className={cn(
                  "block rounded-md px-3 py-4 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isSubActive && "bg-accent text-accent-foreground"
                )}
              >
                {subItem.title}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

SubMenuComponent.displayName = "SubMenu";

const SubMenu = memo(SubMenuComponent);

export default SubMenu;
