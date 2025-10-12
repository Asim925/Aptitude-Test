import Image from "next/image";
import Link from "next/link";
import { University } from "../constants/constants";

interface Props {
  uni: University;
}

export default function UniCard({ uni }: Props) {
  return (
    <div className="max-sm:mx-4 max-md:mx-10 md:w-80 h-full xl:w-96 rounded-2xl shadow-[0_2px_10px_rgba(217,119,6,0.45)] overflow-hidden backdrop-blur-md bg-orange-950/5 border border-amber-600">
      {/* Image */}
      <div className="h-52 w-full relative">
        <Image
          src={uni.img}
          alt={uni.name[0]}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-amber-400 mb-2">
          {uni.name[0]} - {uni.name[1]}
        </h2>
        <p className="text-sm text-gray-300 mb-4">{uni.text}</p>

        {/* btn..*/}
        <div className="flex justify-end">
          <Link href={uni.route}>
            <button className="cursor-pointer max-sm:w-fit relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm sm:text-md font-medium rounded-lg group bg-gradient-to-br from-yellow-700 to-orange-800 group-hover:from-amber-700 group-hover:to-orange-800 text-white focus:outline-none">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-amber-950 rounded-md group-hover:bg-transparent">
                Goto &quot;{uni.name[1]}&quot; Page
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
