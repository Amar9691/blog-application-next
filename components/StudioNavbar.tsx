import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const StudioNavbar = (props: any) => {
  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <Link href="/" className="text-[#19080b] flex items-center">
          <ArrowUturnLeftIcon className="w-6 h-6 text-[#100507] mr-2" /> Go To
          Website
        </Link>
        <div className="hidden md:flex p-2 rounded-lg shadow-md justify-center border-2 border-[#19080b]">
          <Link href="/" className="cursor-pointer">
            <h1 className="font-bold text-blue-900">Lets Learn with us</h1>
          </Link>
        </div>
      </div>

      <>{props.renderDefault(props)}</>
    </div>
  );
};

export default StudioNavbar;
