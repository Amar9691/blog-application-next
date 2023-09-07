import Link from "next/link";
import icon from "@/public/vercel.svg";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between space-x-2 font-bold px-10 py-5">
      <div className="">
        <Link href="#">
          <Image
            width={50}
            height={50}
            className="rounded-full"
            alt="logo"
            src={icon}
          />
        </Link>
        <h1>Lets Learn with us</h1>
      </div>
      <div>
        <Link
          href="/register"
          className="px-5 py-3 text-sm md:text-base bg-gray-900 text-[#F7ABBA] flex items-center rounded-full text-center"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default Header;
