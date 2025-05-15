import React, { useMemo } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SubMenu, { TIcon, TNavBar } from "./SubMenu";
import { iconMapping } from "./SidebarData";
const navData: TNavBar<TIcon>[] = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: {
      type: "mui",
      name: "Dashboard",
      path: "string",
    },
    allowed_roles: ["Admin"],
    active: true,
    order: 0,
    sub_nav: [
      {
        title: "Analytics",
        path: "/analytics",
        allowed_roles: ["Admin"],
        active: true,
        order: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Courses",
    path: "#",
    icon: {
      type: "mui",
      name: "Book",
      path: "string",
    },
    allowed_roles: ["Admin", "Student"],
    active: true,
    order: 1,
    sub_nav: [
      {
        title: "My Courses",
        path: "/dashboard/courses/my-courses",
        allowed_roles: ["Admin", "Student"],
        active: true,
        order: 0,
      },
      {
        title: "All Courses",
        path: "/dashboard/courses/my-courses",
        allowed_roles: ["Admin", "Student"],
        active: true,
        order: 1,
      },
      {
        title: "Create Course",
        path: "/dashboard/courses/add",
        allowed_roles: ["Admin"],
        active: true,
        order: 2,
      },
      {
        title: "Upload Course",
        path: "/dashboard/courses/upload",
        allowed_roles: ["Admin"],
        active: true,
        order: 3,
      },
    ],
  },
];
interface SidebarProps {
  toogleActive: () => void;
}

const LeftSide: React.FC<SidebarProps> = ({ toogleActive }) => {
  const { data: session } = useSession();

  // const { navData }: { navData: TNavBar<TIcon>[] } = useGetSideBarData(
  //   session?.user?.roles[0] ?? "Guest"
  // );

  const menuData = useMemo(() => {
    if (navData.length > 0) {
      return navData?.map((item) => {
        const subNavs =
          item?.sub_nav?.filter((nav) =>
            nav?.allowed_roles.includes(session?.user?.roles[0] ?? "Guest")
          ) || [];

        if (subNavs.length > 0) {
          const IconComponent = item?.icon?.name
            ? iconMapping[item.icon.name]
            : null;
          return {
            ...item,
            sub_nav: subNavs,
            iconClosed: <ChevronRight className="h-4 w-4" />,
            iconOpened: <ChevronDown className="h-4 w-4" />,
            icon: IconComponent ? <IconComponent className="h-5 w-5" /> : null,
          };
        } else {
          const IconComponent = item.icon ? iconMapping[item.icon.name] : null;
          return {
            ...item,
            icon: IconComponent ? <IconComponent className="h-5 w-5" /> : null,
          };
        }
      });
    } else return [];
  }, [session?.user?.roles]);

  return (
    <>
      <div className="flex h-24 items-center justify-between px-6 border-b">
        <Link href="/">
          <Image
            src="/images/logo.webp"
            alt="Horace"
            className="h-12 w-auto"
            width={150}
            height={50}
          />
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={toogleActive}
          className="lg:hidden"
          data-cy="toggle-off"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-3 px-3">
          {menuData.map((item, index: number) => {
            return <SubMenu item={item} key={index} />;
          })}
        </nav>
      </ScrollArea>
    </>
  );
};

export default LeftSide;
