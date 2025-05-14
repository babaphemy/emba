import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export default function LandingPageAccordions() {
  const data = [
    {
      title: "Logistics & Transport",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      prerequisites: ["Excel", "Python"],
      requiredMaterials: ["Jupyter Notebook", "Microsoft Excel", "Computer"],
      outcomes: [
        "Supply Chain Management",
        "Excel Macro Programming",
        "Big Data Analysis",
        "Web Scraping",
      ],
      topics: [
        "Supply Chain",
        "Finance (10k)",
        "Strategy",
        "Marketing",
        "Inventory",
      ],
      buttonText: "Open the Course Demo",
    },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-b border-gray-600"
        >
          <AccordionTrigger className="group hover:no-underline  [&[data-state=open]]:bg-white [&[data-state=open]]:rounded-t-lg [&[data-state=open]]:px-6 [&[data-state=open]]:py-8 transition-all">
            <div className="flex justify-between items-center w-full">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <div className="relative w-6 h-6">
                <Plus className="absolute inset-0 transition-all group-data-[state=open]:opacity-0 group-data-[state=open]:scale-50" />
                <Minus className="absolute inset-0 transition-all group-data-[state=closed]:opacity-0 group-data-[state=closed]:scale-50" />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white rounded-b-lg px-4 pb-4">
            <div className="w-full grid grid-cols-1 gap-6 sm:grid-cols-10">
              <div className="gap-6 col-span-full sm:col-span-4 flex flex-col items-start justify-start">
                <p className="text-gray-600">{item.description}</p>
                <ul className="list-none space-y-2">
                  {item.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 rounded-full"></div>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex col-span-full sm:col-span-6 flex-col flex-wrap gap-4">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-slate-500">
                    Prerequisites
                  </span>
                  <div className="flex gap-2">
                    {item.prerequisites.map((pre, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-700 text-white rounded-md"
                      >
                        {pre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-slate-500">
                    Required Materials
                  </span>
                  <div className="flex gap-2">
                    {item.requiredMaterials.map((mat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-700 text-white rounded-md"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-slate-500">Outcomes</span>
                  <div className="flex gap-2 flex-wrap">
                    {item.outcomes.map((out, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-700 text-white rounded-md"
                      >
                        {out}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-fit mt-6 sm:mt-8 bg-pink-500 text-white hover:bg-pink-600">
              {item.buttonText}
            </Button>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
