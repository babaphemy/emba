import {
  BarChart3,
  Calendar,
  Book,
  MessageCircle,
  Check,
  CreditCard,
  LayoutDashboard,
  Mail,
  CalendarCheck,
  Users,
  Lock,
  DollarSign,
  Banknote,
  User,
  GraduationCap,
  FileText,
  Grid3x3,
  BookCheck,
  ChevronDown,
  ChevronRight,
  Bell,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface IconMapping {
  [key: string]: LucideIcon;
}

export const iconMapping: IconMapping = {
  // Direct mappings
  Assessment: BarChart3,
  AssessmentIcon: BarChart3,
  Book: Book,
  BookmarkAddedIcon: BookCheck,
  CalendarMonth: Calendar,
  Chat: MessageCircle,
  Check: Check,
  CreditCard: CreditCard,
  Dashboard: LayoutDashboard,
  Email: Mail,
  Event: CalendarCheck,
  GridViewIcon: Grid3x3,
  Group: Users,
  KeyboardArrowDownIcon: ChevronDown,
  KeyboardArrowRightIcon: ChevronRight,
  Lock: Lock,
  MailOutlineIcon: Mail,
  Money: DollarSign,
  MoneySharp: Banknote,
  NotificationsNoneIcon: Bell,
  Person: User,
  School: GraduationCap,
  SettingsIcon: Settings,
  Subject: FileText,
};
