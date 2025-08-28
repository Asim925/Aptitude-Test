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
    <div className="max-md:mx-10 md:w-80 h-full xl:w-96 rounded-2xl shadow-md overflow-hidden backdrop-blur-lg bg-white/10 border border-gray-200 dark:border-gray-700">
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
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
          {uni.name[0]} {uni.name[1]}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {uni.text}
        </p>

        {/* Actions */}
        <div className="flex justify-end">
          <Link href={uni.route}>
            <button className="cursor-pointer px-4 py-2 bg-white/80  text-black text-sm font-bold rounded-lg shadow hover:bg-white transition-colors flex justify-center flex-nowrap">
              Goto {uni.name[1]} Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
