import Image from "next/image";
import icon from "@/public/vercel.svg";
const Logo = (props: any) => {
  const { renderDefault, title } = props;
  return (
    <>
      <div className="flex items-center space-x-2">
        <Image
          className="rounded-full object-cover text-white"
          width={50}
          height={50}
          src={icon}
          alt="logo"
        />
        {renderDefault(props)}
      </div>
    </>
  );
};

export default Logo;
