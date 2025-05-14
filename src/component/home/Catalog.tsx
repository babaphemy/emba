import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleDot } from "lucide-react";
const financialServicesSubItems = [
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
const courseCategories = [
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
const Catalog = () => {
  return (
    <section className="bg-pink-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">COURSE CATALOG</h2>
        <h3 className="text-4xl font-bold text-pink-500 mb-4">
          OUR COURSE CATALOG WILL
          <br />
          LOVE YOU LONG TIME
        </h3>
        <p className="text-gray-600 mb-12 max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
          veniam.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Financial Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">
              Financial Services <CircleDot className="inline w-4 h-4 ml-2" />
            </h4>
            <Accordion type="single" collapsible className="w-full">
              {financialServicesSubItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-pink-500">
                    <span className="text-lg">{item.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {item.details.map((detail, i) => (
                        <div
                          key={i}
                          className="pl-4 py-2 border-l-2 border-pink-200"
                        >
                          <span className="text-sm font-medium">{detail}</span>
                        </div>
                      ))}
                      {item.boxes.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                          {item.boxes.map((box, i) => (
                            <div
                              key={i}
                              className="bg-gray-200 p-4 rounded text-sm text-center"
                            >
                              {box}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right Column - Other Categories */}
          <div>
            <Accordion type="single" collapsible className="w-full">
              {courseCategories.slice(1).map((category, index) => (
                <AccordionItem key={index} value={`category-${index}`}>
                  <AccordionTrigger className="text-left hover:text-pink-500">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg">{category}</span>
                      <CircleDot className="w-4 h-4" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pl-4">
                      <p className="text-sm text-gray-600">
                        Course details coming soon...
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 italic">...More Coming Soon...</p>
        </div>
      </div>
    </section>
  );
};
export default Catalog;
