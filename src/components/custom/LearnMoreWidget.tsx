import { cn } from "@/lib/utils";
import Image from "next/image";

export function LearnMoreWidget({
  image,
  header,
  subHeader,
  title1,
  title2,
  content1,
  content2,
  hasBorder,
  isReversed,
}: {
  image: string;
  header: string;
  subHeader: string;
  title1: string;
  title2: string;
  content1: string;
  content2: string;
  hasBorder?: boolean;
  isReversed?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-full grid grid-cols-1  gap-6 py-6 sm:grid-cols-11",
        hasBorder && "border-b border-dashed border-[#E91C78]"
      )}
    >
      {!isReversed && (
        <Image
          src={image}
          alt={title1}
          width={800}
          height={800}
          className="w-full col-span-full sm:col-span-3 h-[500px]"
        />
      )}
      <div className="col-span-full sm:col-span-8 w-full flex flex-col items-start justify-start gap-6">
        <h3 className="text-white uppercase text-xl sm:text-2xl font-bold mb-2">
          {header}
          <br />
          <span className="text-pink-500 text-2xl sm:text-5xl">
            {subHeader}
          </span>
        </h3>
        <div className="w-full text-white grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="w-full flex flex-col items-center sm:items-start justify-center sm:justify-start gap-4">
            <h2 className="uppercase font-semibold text-lg sm:text-xl text-center sm:text-start max-w-72 ">
              {title1}
            </h2>

            <p className="text-center sm:text-start">
              
              {content1}
            </p>
          </div>
          <div className="w-full flex flex-col items-center sm:items-start justify-center sm:justify-start gap-4">
            <h2 className="uppercase font-semibold text-lg sm:text-xl text-center sm:text-start max-w-72 ">
               {title2}
            </h2>

            <p className="text-center sm:text-start">
              
              {content2}
            </p>
          </div>
        </div>
      </div>
      {isReversed && (
        <Image
          src={image}
          alt={title1}
          width={800}
          height={800}
          className="w-full col-span-full sm:col-span-3 h-[500px]"
        />
      )}
    </div>
  );
}
