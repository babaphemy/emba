import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const financialServicesSubItems = [
  {
    title: "Logistics & Transport",
    details: ["DEMO & SALES", "POST-SALES"],
    boxes: [
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
    ],
  },
  {
    title: "Supply Chain",
    details: ["Lorem ipsum", "Lorem ipsum"],
    boxes: [],
  },
  { title: "Procurement", details: ["Lorem ipsum"], boxes: [] },
  { title: "Shipping", details: [], boxes: [] },
  { title: "Dry Docking", details: [], boxes: [] },
  { title: "Consulting", details: [], boxes: [] },
];

export const courseCategories = [
  "Financial Services",
  "Retail",
  "Manufacturing",
  "Food & Beverage",
  "Healthcare",
  "Automotive",
  "Real Estate",
  "Technology",
  "Energy",
];
