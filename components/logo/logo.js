import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center text-3xl text-center py-4 font-heading">
      <Image src="/logo.png" alt="logo" width={50} height={50} />
      <span className="ml-2">Blog Generator</span>
    </div>
  );
};
