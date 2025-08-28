import Image from "next/image";
import Link from "next/link";

interface Props {
  uni: {
    name: string[];
    img: string;
    text: string;
    route: string;
  };
}

export default function UniCard({ uni }: Props) {
  return (
    <div className="max-sm:mx-4 max-md:mx-10 md:w-80 h-full xl:w-96 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xs bg-white/10 border border-amber-600">
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
        <h2 className="text-lg font-bold text-amber-300 mb-2">
          {uni.name[0]} {uni.name[1]}
        </h2>
        <p className="text-sm text-gray-300 mb-4">{uni.text}</p>

        {/* Actions */}
        <div className="flex justify-end">
          <Link href={uni.route}>
            <button className="cursor-pointer px-4 py-2 bg-amber-300  text-black text-sm font-bold rounded-lg shadow hover:bg-amber-400 transition-colors flex justify-center flex-nowrap">
              Goto {uni.name[1]} Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
